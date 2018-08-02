import fetch from 'node-fetch';

const getPictures = async (text: string, { bingImageSearchApiKey }: { bingImageSearchApiKey: string }) => {
  const response = await fetch(
    `https://api.cognitive.microsoft.com/bing/v7.0/images/search?q=${encodeURIComponent(
      text
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
