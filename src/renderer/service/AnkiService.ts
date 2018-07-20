import * as compromise from 'compromise';
import { extension } from 'mime-types';
import fetch from 'node-fetch';
import * as v4 from 'uuid/v4';
import File from '../../common/model/File';

class AnkiService {
  public async createCard({
    keyword,
    keywordPronunciation,
    ipa,
    partOfSpeech,
    definition,
    example,
    examplePronunciation,
    exampleWithBlank,
    picture,
  }: {
    keyword: string;
    keywordPronunciation: File;
    ipa: string;
    partOfSpeech: string;
    definition: string;
    example: string;
    examplePronunciation: File;
    exampleWithBlank: string;
    picture: File;
  }) {
    console.log({
      keyword,
      keywordPronunciation,
      ipa,
      partOfSpeech,
      definition,
      example,
      examplePronunciation,
      exampleWithBlank,
      picture,
    });

    const examplePronunciationFileName = `${v4()}.${extension(examplePronunciation.mimeType)}`;
    const keywordPronunciationFileName = `${v4()}.${extension(keywordPronunciation.mimeType)}`;
    const pictureFileName = `${compromise(example)
      .hyphenate()
      .out()}.${extension(picture.mimeType)}`;

    const response = await fetch(`http://localhost:8765`, {
      method: 'POST',
      body: JSON.stringify({
        version: '6',
        action: 'multi',
        params: {
          actions: [
            {
              action: 'storeMediaFile',
              params: {
                filename: examplePronunciationFileName,
                data: examplePronunciation.base64,
              },
            },
            {
              action: 'storeMediaFile',
              params: {
                filename: keywordPronunciationFileName,
                data: keywordPronunciation.base64,
              },
            },
            {
              action: 'storeMediaFile',
              params: {
                filename: pictureFileName,
                data: picture.base64,
              },
            },
            {
              action: 'addNote',
              params: {
                note: {
                  deckName: 'Default',
                  modelName: 'New English Word',
                  fields: {
                    'ID*': `${compromise(keyword)
                      .hyphenate()
                      .out()}-${v4()}`,
                    'Spelling*': keyword,
                    'IPA*': ipa,
                    'Pronunciation*': `[sound:${examplePronunciationFileName}]`,
                    'Lexical Category*': partOfSpeech,
                    'Definition*': definition,
                    'Example Sentence*': example,
                    'Example Sentence (with Blank)': exampleWithBlank,
                    'Picture*': `<img src="${pictureFileName}">`,
                  },
                  tags: ['ankihelper'],
                },
              },
            },
          ],
        },
      }),
    });

    const json = await response.json();

    if (json.error !== null) {
      throw new NoteCreatingFailed();
    }

    return;
  }
}

class NoteCreatingFailed extends Error {
  public readonly name = 'NoteCreatingFailed';
  public readonly message: string = "It's failed to create a note.";
}

export default AnkiService;
