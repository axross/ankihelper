import * as compromise from 'compromise';
import fetch from 'node-fetch';
import { Response } from 'node-fetch';
import Entry from '../../common/model/Entry';

const getEntriesFromOxford = async (
  text: string,
  {
    oxfordDictionaryApiAppId,
    oxfordDictionaryApiAppKey,
    wordsApiKey,
  }: { oxfordDictionaryApiAppId: string; oxfordDictionaryApiAppKey: string; wordsApiKey: string }
): Promise<Entry[]> => {
  const [responseFromWordsApi, responseFromOxford] = await Promise.all([
    fetch(`https://wordsapiv1.p.mashape.com/words/${encodeURIComponent(text)}`, {
      headers: {
        accept: 'application/json',
        'x-mashape-key': wordsApiKey,
        'x-mashape-host': 'wordsapiv1.p.mashape.com',
      },
    }),
    fetch(`https://od-api.oxforddictionaries.com/api/v1/entries/en/${encodeURIComponent(text)}`, {
      headers: {
        accept: 'application/json',
        app_id: oxfordDictionaryApiAppId,
        app_key: oxfordDictionaryApiAppKey,
      },
    }),
  ]);

  const [entriesFromWordsApi, entriesFromOxford] = await Promise.all([
    parseResponseFromWordsApi(responseFromWordsApi),
    parseResponseFromOxford(responseFromOxford),
  ]);

  const entries = [...entriesFromWordsApi, ...entriesFromOxford];

  if (entries.length === 0) {
    throw new EntriesNotFound(text);
  }

  return entries;
};

const parseResponseFromOxford = async (response: Response): Promise<Entry[]> => {
  if (response.status !== 200) {
    return [];
  }

  const json = await response.json();

  return (json.results[0].lexicalEntries as any[]).reduce<Entry[]>((whole, lexicalEntry: any) => {
    const partOfSpeech = lexicalEntry.lexicalCategory;

    return [
      ...whole,
      ...(lexicalEntry.entries as any[]).reduce((_whole, entry: any) => {
        const _entries = entry.senses.map((sense: any) => {
          const definition = sense.definitions ? sense.definitions[0] || '' : '';
          const examples = sense.examples
            ? sense.examples.map((example: any) =>
                compromise(example.text)
                  .normalize()
                  .sentences()
                  .toStatement()
                  .out()
              )
            : [];
          const subExamples = sense.subsenses
            ? (sense.subsenses as any[]).reduce<string[]>(
                (examples, subsense) => [
                  ...examples,
                  ...(subsense.examples
                    ? subsense.examples.map((example: any) =>
                        compromise(example.text)
                          .normalize()
                          .sentences()
                          .toStatement()
                          .out()
                      )
                    : []),
                ],
                []
              )
            : [];

          return Entry.fromJSON({
            partOfSpeech,
            definition,
            examples: [...examples, ...subExamples],
          });
        });

        return [..._whole, ..._entries];
      }, []),
    ];
  }, []);
};

const parseResponseFromWordsApi = async (response: Response): Promise<Entry[]> => {
  if (response.status !== 200) {
    return [];
  }

  const json = await response.json();

  return json.results.map((result: any) => ({
    partOfSpeech: compromise(result.partOfSpeech)
      .toTitleCase()
      .out(),
    definition: result.definition,
    examples: result.examples || [],
  }));
};

export class EntriesNotFound extends Error {
  public readonly name = 'EntriesNotFound';
  public readonly message: string;

  constructor(text: string) {
    super();

    this.message = `The entires for "${text}" are not found.`;
  }
}

export default getEntriesFromOxford;
