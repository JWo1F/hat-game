class Store extends EventTarget {
  constructor(prefix) {
    super();

    this.prefix = prefix;

    let current = localStorage.getItem(this.#name);

    if (!current) {
      const defaultValue = JSON.stringify({
        timePerRound: 60,
        rounds: 3
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