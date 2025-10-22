import { Router } from "./router";
import { render } from "./templates";

export const routes = new Router();

routes.addRoute('', () => {
  const name = 'Alex (#' + Math.floor(Math.random() * 1000) + ')';

  return render('home', { name });
});

routes.addRoute('second', () => {
  return render('second');
});
