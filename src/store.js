class Store extends EventTarget {
  constructor() {
    super();
  }

  setItem(key, value) {
    this[key] = value;
    this.dispatchEvent(new CustomEvent('change', { detail: { key, value } }));
  }

  getItem(key) {
    return this[key];
  }

  updateItem(key, fn) {
    const currentValue = this[key];
    const newValue = fn(currentValue);
    this.setItem(key, newValue);
  }

  clear() {
    for (const key of Object.keys(this)) {
      delete this[key];
    }
  }
}

export const state = new Proxy(new Store(), {
  set(obj, prop, value) {
    obj.setItem(prop, value);
    return true;
  },
  get(obj, prop) {
    return obj.getItem(prop);
  }
});
