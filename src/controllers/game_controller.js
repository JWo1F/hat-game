import { Controller } from "@hotwired/stimulus";
import { routes } from "../routes";
import { state } from "../store";
import { getWordsByCategories } from "../words";

export default class extends Controller {
  static targets = ['word'];

  connect() {
    state.clear();

    this.index = 0;
    this.words = getWordsByCategories(['general'], 10);

    this.wordTarget.textContent = this.words[this.index];
  }

  success() {
    this.score += 1;
    this.next();
  }

  fail() {
    this.next();
  }

  next() {
    if (this.index < this.words.length - 1) {
      this.index += 1;
      this.wordTarget.textContent = this.words[this.index];
    } else {
      routes.visit('score');
    }
  }

  get words() {
    return state.words;
  }

  set words(value) {
    state.words = value;
  }

  get score() {
    const all = state.score;
    const fields = {};

    for (const team of this.teams) {
      fields[team] = {
        get() {
          return all?.[team] ?? 0;
        },
        set(v) {
          const updated = { ...(all ?? {}) };
          updated[team] = v;
          state.score = updated;
        }
      };
    }

    return Object.create(Object.prototype, fields);
  }

  get teams() {
    return ['Team A', 'Team B'];
  }
}