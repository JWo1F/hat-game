import { Game } from "./game.js";

const g = new Game(['a', 'b', 'c', 'd', 'e'], ['red', 'blue'], 2);

const generator = g.start();
let team = null;

while(true) {
  const res = generator.next(team);

  if (res.done) {
    break;
  }

  const word = res.value;
  console.log(`Word: ${word}`);

  // Simulate a team answering
  team = Math.random() > 0.5 ? 'red' : 'blue';
  console.log(`Team ${team} answered`);
}

console.log(g.score);