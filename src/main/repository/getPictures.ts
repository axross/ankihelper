import * as compromise from 'compromise';
import fetch from 'node-fetch';

const getPictures = async (text: string, { bingImageSearchApiKey }: { bingImageSearchApiKey: string }) => {
  const people = compromise(text)
    .people()
    .data()
    .map((data: any) => data.normal);
  const nouns = compromise(text)
    .nouns()
    .data()
    .map((data: any) => data.normal)
    .filter((word: string) => people.indexOf(word) !== 1);
  const adjectives = compromise(text)
    .adjectives()
    .data()
    .map((data: any) => data.normal);
  const adverbs = compromise(text)
    .adverbs()
    .data()
    .map((data: any) => data.normal);
  const query = [...nouns, ...adjectives, ...adverbs].slice(0, 3).join(' ');

  const response = await fetch(
    `https://api.cognitive.microsoft.com/bing/v7.0/images/search?q=${encodeURIComponent(
      query
    )}&count=100&safeSearch=Moderate`,
    {
      headers: {
        'ocp-apim-subscription-key': bingImageSearchApiKey,
      },
    }
  );

  const json = await response.json();

  const imageUrls = json.value.map((item: any) => item.thumbnailUrl);

  return imageUrls;
};

export default getPictures;
