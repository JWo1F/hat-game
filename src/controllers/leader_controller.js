import { Controller } from "@hotwired/stimulus";
import { state } from "../store";

export default class extends Controller {
  static targets = ['score'];

  connect() {
    const score = state.game.score;
    const words = state.words.length;

    this.scoreTarget.textContent = `Your score: ${score} of ${words}`;
  }
}
