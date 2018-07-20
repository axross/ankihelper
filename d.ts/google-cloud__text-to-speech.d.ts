/// <reference path="../node_modules/@types/node/index.d.ts" />

declare module 'google-cloud__text-to-speech' {
  type TextToSpeechRequest = {
    input: {
      text: string;
    };
    voice: {
      languageCode: string;
      ssmlGender: string;
    };
    audioConfig: {
      audioEncoding: string;
      speakingRate: number;
      volumeGainDb: number;
    };
  };

  type TextToSpeechResponse = {
    audioContent: Buffer;
  };

  export class TextToSpeechClient {
    public synthesizeSpeech(
      request: TextToSpeechRequest,
      callback: (err: Error, response: TextToSpeechResponse) => void
    ): void;

    public constructor(init: {
      credentials: {
        client_email: string;
        private_key: string;
      };
      email: string;
      projectId: string;
    });
  }
}
