import {Controller} from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ['score'];

  connect() {
    const scores = this.application.getControllerForElementAndIdentifier(document.body, 'scores');

    this.scoreTarget.textContent = `Your score: ${scores.score}`;
  }
}
