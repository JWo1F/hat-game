import {Controller} from "@hotwired/stimulus";
import {getItem} from "../store";

export default class extends Controller {
  static targets = ['score'];

  connect() {
    const score = getItem('score');
    const words = getItem('words').length;

    this.scoreTarget.textContent = `Your score: ${score} of ${words}`;
  }
}
