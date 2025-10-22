import {Controller} from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ['output'];

  connect() {
    this.num = 0;
    this.#update();
  }

  add() {
    this.num += 1;
    this.#update();
  }

  #update() {
    this.outputTarget.textContent = `Hello! You have clicked ${this.num} times.`;
  }
}
