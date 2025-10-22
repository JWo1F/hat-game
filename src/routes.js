import { Router } from "./router";
import { render } from "./templates";
import { getWordsByCategories } from "./words";

export const routes = new Router();

routes.addRoute('', () => {
  return render('home');
});

routes.addRoute('game', () => {
  const words = getWordsByCategories(['general'], 10);

  return render('game', { words });
});

routes.addRoute('score', () => {
  return render('score');
});
