type Configuration = {
  googleCloud: {
    clientEmail: string;
    privateKey: string;
    projectId: string;
  };
  oxfordDictionaryApi: {
    appId: string;
    appKey: string;
  };
  wordsApi: {
    key: string;
  };
  bingImageSearchApi: {
    apiKey: string;
  };
};

export default Configuration;
