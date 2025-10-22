import { Controller } from "@hotwired/stimulus";

export default class ScoresController extends Controller {
  score = 0;

  record() {
    this.score += 1;
  }
}
