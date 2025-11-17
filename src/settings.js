class Store extends EventTarget {
  static version = 1;

  constructor(prefix) {
    super();

    this.prefix = prefix;

    let current = localStorage.getItem(this.#name);

    if (!current || JSON.parse(current)?._version !== this.constructor.version) {
      const defaultValue = JSON.stringify({
        _version: this.constructor.version,
        timePerRound: 60,
        rounds: 3,
        wordsCount: 25,
      });

      localStorage.setItem(this.#name, defaultValue);
      current = defaultValue;
    }

    const parsed = JSON.parse(current);
    for (const [key, value] of Object.entries(parsed)) {
      this[key] = value;
    }
  }

  clear() {
    for (const key of Object.keys(this)) {
      delete this[key];
    }

    this.save();
  }

  *[Symbol.iterator]() {
    for (const key of Object.keys(this)) {
      yield [key, this[key]];
    }
  }

  get #name() {
    return `${this.prefix}:settings`;
  }

  save() {
    const data = { ...this };

    delete data.prefix;

    localStorage.setItem(this.#name, JSON.stringify(data));
    this.dispatchEvent(new CustomEvent('change', { detail: data }));
  }
}

export const settings = new Store('game');