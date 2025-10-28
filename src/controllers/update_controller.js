import {Controller} from "@hotwired/stimulus";
import {state} from "../store.js";

export default class extends Controller {
  static values = { word: String };
  static targets = ["word", "check", "uncheck"];

  connect() {
    const has = state.game.answered.has(state.game.words.indexOf(this.wordValue));

    if (has) {
      this.checkTarget.classList.remove('hidden');
      this.uncheckTarget.classList.add('hidden');
      this.element.classList.add('bg-blue-500');
    } else {
      this.checkTarget.classList.add('hidden');
      this.uncheckTarget.classList.remove('hidden');
      this.element.classList.add('bg-blue-300');
    }
  }

  change() {
    const index = state.game.words.indexOf(this.wordValue);

    if (this.checkTarget.classList.contains('hidden')) {
      state.game.answered.add(index);
      state.game.prevPlayer.win(this.wordValue);
    } else {
      state.game.answered.delete(index);
      state.game.prevPlayer.delete(this.wordValue);
    }

    this.element.classList.toggle('bg-blue-500');
    this.element.classList.toggle('bg-blue-300');

    this.checkTarget.classList.toggle('hidden');
    this.uncheckTarget.classList.toggle('hidden');
  }
}