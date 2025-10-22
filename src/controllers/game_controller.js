import { Controller } from "@hotwired/stimulus";
import { routes } from "../routes";

export default class extends Controller {
  static targets = ['word'];
  static values = {
    words: Array,
  };

  connect() {
    this.index = 0;
    this.wordTarget.textContent = this.wordsValue[this.index];
  }

  success() {
    this.dispatch('record');
    this.next();
  }

  fail() {
    this.next();
  }

  next() {
    if (this.index < this.wordsValue.length - 1) {
      this.index += 1;
      this.wordTarget.textContent = this.wordsValue[this.index];
    } else {
      routes.visit('score');
    }
  }
}