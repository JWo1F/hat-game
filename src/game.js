import { shuffle } from "fast-shuffle";

export class Game extends EventTarget {
  constructor(words, teams, timeout, rounds) {
    super();

    this.answered = new Set();
    this.words = shuffle(words);
    this.wordIndex = 0;
    this.teams = teams;
    this.timeout = timeout;
    this.players = this.#preparePlayers();
    this.playerIndex = 0;
    this.showedIndexes = new Set([this.wordIndex]);

    this.players.forEach((player) => player.nextRound());
  }

  round() {
    this.endTime = new Date(Date.now() + this.timeout);

    setTimeout(() => {
      this.prevPlayer = this.player;
      this.playerIndex = (this.playerIndex + 1) % this.players.length;
      const finished = !this.#nextWordIndex();

      if (!finished) {
        this.dispatchEvent(new CustomEvent('timeout'));
      }

      this.showedIndexes = new Set([this.wordIndex]);
    }, this.timeout);
  }

  answer(success) {
    if (success) {
      this.player.win(this.word);
      this.answered.add(this.wordIndex);
    }

    this.#nextWordIndex();
    this.showedIndexes.add(this.wordIndex);
  }

  get word() {
    return this.words[this.wordIndex];
  }

  get player() {
    return this.players[this.playerIndex];
  }

  get team() {
    return this.teams.find(t => t.players.includes(this.player));
  }

  get teammate() {
    return this.team.players.find(p => p !== this.player);
  }

  #nextWordIndex() {
    if (this.words.length <= this.answered.size) {
      this.dispatchEvent(new CustomEvent('finish'));
      return false;
    }

    let nextIndex = (this.wordIndex + 1) % this.words.length;

    while (true) {
      if (!this.answered.has(nextIndex)) break;

      nextIndex = (nextIndex + 1) % this.words.length;
    }

    this.wordIndex = nextIndex;

    return true;
  }

  #preparePlayers() {
    const a = []
    const b = [];

    shuffle(this.teams).forEach(team => {
      a.push(team.players[0]);
      b.push(team.players[1]);
    });

    return [...a, ...b];
  }
}