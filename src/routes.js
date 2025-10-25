import { Router } from "./router";
import { render } from "./templates";
import {state} from "./store.js";
import {getWordsByCategories} from "./words.js";
import {Game} from "./game.js";
import {Player, Team} from "./team.js";

export const routes = new Router();

routes.addRoute('', () => {
  return render('home');
});

routes.addRoute('game', () => {
  const game = state.game;

  game.round();

  return render('game', { game });
});

routes.addRoute('start', () => {
  const teams = [
    // new Team('Red', [
    //   new Player('John'),
    //   new Player('Jane'),
    // ]),
    // new Team('Blue', [
    //   new Player('Alice'),
    //   new Player('Bob'),
    // ]),
    new Team('Тестовики', [
      new Player('Юлиус'),
      new Player('Санчоус'),
    ])
  ];

  const words = getWordsByCategories(['general'], 10);
  state.game = new Game(words, teams, 10000, 1);

  return render('round', { game: state.game });
});

routes.addRoute('round', () => {
  const game = state.game;

  return render('round', { game });
});

routes.addRoute('score', () => {
  const game = state.game;

  return render('score', { game });
});
