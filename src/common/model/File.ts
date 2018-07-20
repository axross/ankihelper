class File {
  public static fromJSON(json: any): File {
    const obj = { ...json };
    const { base64, mimeType } = obj;

    if (typeof base64 !== 'string') {
      throw new TypeError();
    }

    if (typeof mimeType !== 'string') {
      throw new TypeError();
    }

    return new File(base64, mimeType);
  }

  public readonly base64: string;
  public readonly mimeType: string;

  public toURL(): URL {
    return new URL(`data:${this.mimeType};base64,${this.base64}`);
  }

  public toJSON(): Record<string, any> {
    return {
      base64: this.base64,
      mimeType: this.mimeType,
    };
  }

  constructor(base64: string, mimeType: string) {
    this.base64 = base64;
    this.mimeType = mimeType;
  }
}

export default File;
