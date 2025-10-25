import { Controller } from "@hotwired/stimulus";
import { routes } from "../routes";
import { state } from "../store";
import {Player, Team} from "../team.js";

export default class extends Controller {
  static targets = ['word', 'num', 'total', 'player'];

  connect() {
    this.abortController = new AbortController();

    state.game.addEventListener(
      'timeout',
      () => routes.visit('round'),
      { signal: this.abortController.signal }
    );

    state.game.addEventListener(
      'finish',
      () => routes.visit('score'),
      { signal: this.abortController.signal }
    );

    this.wordTarget.textContent = state.game.word;
    this.numTarget.textContent = state.game.answered.size;
    this.totalTarget.textContent = state.game.words.length;
    this.playerTarget.textContent = state.game.player.name;
  }

  disconnect() {
    this.abortController.abort();
  }

  success() {
    this.next(true);
  }

  fail() {
    this.next(false);
  }

  next(success) {
    state.game.answer(success);
    this.numTarget.textContent = state.game.answered.size;
    this.wordTarget.textContent = state.game.word;
  }

  get teams() {
    return [
      new Team('Red', [
        new Player('John'),
        new Player('Jane'),
      ]),
      new Team('Blue', [
        new Player('Alice'),
        new Player('Bob'),
      ]),
    ];
  }
}