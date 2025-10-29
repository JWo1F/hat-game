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

  get bestPlayer() {
    return this.players.reduce((best, player) => {
      return (player.score > best.score) ? player : best;
    }, this.players[0]);
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
    const players = [];
    let maxPlayers = 0;

    for (const team of shuffle(this.teams)) {
      const shuffled = shuffle(team.players);
      maxPlayers = Math.max(maxPlayers, shuffled.length);

      players.push(shuffled);
    }

    const output = [];

    for (let i = 0; i < maxPlayers; i++) {
      for (const teamPlayers of players) {
        if (i < teamPlayers.length) {
          output.push(teamPlayers[i]);
        }
      }
    }

    return output;
  }
}