export class Team {
  name; players;

  constructor(name, players = []) {
    this.name = name;
    this.players = players;
  }
}

export class Player {
  name;
  #score;

  constructor(name) {
    this.name = name;
    this.#score = [];
  }

  nextRound() {
    this.#score.push(new Set());
  }

  win(word) {
    this.#score.at(-1).add(word);
  }

  totalScore() {
    return this.#score.reduce((total, round) => total + round.size, 0);
  }

  get words() {
    return this.#score.flatMap(round => Array.from(round));
  }
}