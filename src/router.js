import { render } from "./templates";

export class Router {
  constructor() {
    this.routes = new Map();

    document.body.addEventListener('click', (e) => {
      const target = e.target.closest('a[href]');

      if (target) {
        const href = target.getAttribute('href');

        e.preventDefault();

        this.visit(href.slice(1));
      }
    });
  }

  addRoute(path, handler) {
    this.routes.set(path, handler);
  }

  async visit(path) {
    const handler = this.routes.get(path);
    const content = await handler();

    document.body.innerHTML = await render('layout', { yield: content });
  }
}