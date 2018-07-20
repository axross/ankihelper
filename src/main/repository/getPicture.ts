import fetch from 'node-fetch';
import File from '../../common/model/File';

const getPicture = async (url: string): Promise<File> => {
  const response = await fetch(url);
  const mimeType = response.headers.get('content-type');
  const buffer = await response.buffer();

  if (mimeType === null) {
    throw new Error();
  }

  return new File(buffer.toString('base64'), mimeType);
};

export default getPicture;
