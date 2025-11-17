import { Router } from "./router";
import { render } from "./templates";
import {state} from "./store.js";
import {getWordsByCategories} from "./words.js";
import {Game} from "./game.js";
import {Player, Team} from "./team.js";
import {settings} from "./settings.js";

export const routes = new Router();

routes.addRoute('', () => {
  return render('home');
});

routes.addRoute('teams', ({ method, body }) => {
  if (method === 'POST') {
    if (!settings.teams) {
      settings.teams = [];
    }

    for (const teamName of body.getAll('team')) {
      if (settings.teams.some((team) => team.name === teamName)) {
        continue;
      }

      settings.teams.push({ name: teamName, players: [] });
    }

    for (const team of settings.teams) {
      if (!body.getAll('team').includes(team.name)) {
        settings.teams = settings.teams.filter((t) => t.name !== team.name);
      }
    }

    settings.save();
    state.teamIndex = 0;
    return routes.redirect('players');
  }

  return render('teams', { settings });
});

routes.addRoute('game', () => {
  const game = state.game;

  game.round();

  return render('game', { game });
});

routes.addRoute('update', () => {
  const game = state.game;

  return render('update', { game });
});

routes.addRoute('settings', ({ method, body }) => {
  if (method === 'POST') {
    settings.timePerRound = parseInt(body.get('timePerRound'), 10);
    settings.wordsCount = parseInt(body.get('wordsCount'), 10);
    settings.rounds = parseInt(body.get('rounds'), 10);
    settings.save();
    return routes.redirect('');
  }

  return render('settings', { settings });
});

routes.addRoute('players', ({ method, body }) => {
  const team = settings.teams[state.teamIndex];

  if (method === 'POST') {
    team.players = body.getAll('player');
    settings.save();

    state.teamIndex += 1;

    if (state.teamIndex >= settings.teams.length) {
      return routes.redirect('start');
    }

    return routes.redirect('players');
  }

  return render('players', {
    settings,
    index: state.teamIndex,
    team: settings.teams[state.teamIndex],
    last: state.teamIndex >= settings.teams.length - 1,
  });
});

routes.addRoute('start', () => {
  const teams = settings.teams.map(({ name, players }) => {
    return new Team(name, players.map(playerName => new Player(playerName)));
  });

  const words = getWordsByCategories(['general'], settings.wordsCount);
  state.game = new Game(words, teams, settings.timePerRound * 1000, settings.rounds);

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
