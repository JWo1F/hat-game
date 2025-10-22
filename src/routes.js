import { Router } from "./router";
import { render } from "./templates";

export const routes = new Router();

routes.addRoute('', () => {
  return render('home');
});

routes.addRoute('game', () => {
  return render('game');
});

routes.addRoute('score', () => {
  return render('score');
});
