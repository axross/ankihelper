import fetch from 'node-fetch';

const getIpa = async (word: string, { wordsApiKey }: { wordsApiKey: string }) => {
  const response = await fetch(`https://wordsapiv1.p.mashape.com/words/${encodeURIComponent(word)}`, {
    headers: {
      accept: 'application/json',
      'x-mashape-key': wordsApiKey,
      'x-mashape-host': 'wordsapiv1.p.mashape.com',
    },
  });

  const json = await response.json();

  if (typeof json.pronunciation === 'string') {
    return json.pronunciation;
  } else if (typeof json.pronunciation === 'object') {
    return json.pronunciation.all;
  }

  return '???';
};

export default getIpa;
