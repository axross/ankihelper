const { TextToSpeechClient } = require('@google-cloud/text-to-speech');

enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  NEUTRAL = 'NEUTRAL',
}

const synthesize = async (
  text: string,
  {
    gender = Gender.MALE,
    rate = 1.0,
    volumeGain = 0.0,
  }: {
    gender?: Gender;
    rate?: number;
    volumeGain?: number;
  },
  {
    googleCloudClientEmail,
    googleCloudProjectId,
    googleCloudPrivateKey,
  }: {
    googleCloudClientEmail: string;
    googleCloudProjectId: string;
    googleCloudPrivateKey: string;
  }
): Promise<Buffer> => {
  const client = new TextToSpeechClient({
    credentials: {
      client_email: googleCloudClientEmail,
      private_key: googleCloudPrivateKey,
    },
    email: googleCloudClientEmail,
    googleCloudProjectId,
  });

  return new Promise<Buffer>((resolve, reject) => {
    client.synthesizeSpeech(
      {
        input: {
          text,
        },
        voice: {
          languageCode: 'en-US',
          ssmlGender: gender,
        },
        audioConfig: {
          audioEncoding: 'MP3',
          speakingRate: rate,
          volumeGainDb: volumeGain,
        },
      },
      (err: Error, response: any) => {
        if (err) return reject(err);

        resolve(response.audioContent as Buffer);
      }
    );
  });
};

export default synthesize;
