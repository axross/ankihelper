class Entry {
  public static fromJSON(json: any) {
    const obj = { ...json };
    const { partOfSpeech, definition, examples } = obj;

    if (typeof partOfSpeech !== 'string') {
      throw new Error();
    }

    if (typeof definition !== 'string') {
      throw new Error();
    }

    if (!Array.isArray(examples) || examples.some(example => typeof example !== 'string')) {
      throw new Error();
    }

    return new Entry({
      partOfSpeech,
      definition,
      examples,
    });
  }

  public readonly partOfSpeech: string;
  public readonly definition: string;
  public readonly examples: string[];

  public toJSON() {
    return {
      partOfSpeech: this.partOfSpeech,
      definition: this.definition,
      examples: this.examples,
    };
  }

  private constructor({
    partOfSpeech,
    definition,
    examples,
  }: {
    partOfSpeech: string;
    definition: string;
    examples: string[];
  }) {
    this.partOfSpeech = partOfSpeech;
    this.definition = definition;
    this.examples = examples;
  }
}

export default Entry;
