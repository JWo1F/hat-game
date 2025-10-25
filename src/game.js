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
    }, this.timeout);
  }

  answer(success) {
    if (success) {
      this.player.win(this.word);
      this.answered.add(this.wordIndex);
    }

    this.#nextWordIndex();
  }

  get word() {
    return this.words[this.wordIndex];
  }

  get player() {
    return this.players[this.playerIndex];
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
    const players = this.teams.flatMap(team => team.players);
    const a = [], b = [];

    players.forEach((player, index) => {
      if (index % 2 === 0) {
        a.push(player);
      } else {
        b.push(player);
      }
    });

    return [...shuffle(a), ...shuffle(b)];
  }
}