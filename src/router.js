import { render } from "./templates";

export class Router {
  constructor() {
    this.routes = new Map();

    document.body.addEventListener('click', (e) => {
      const target = e.target.closest('a[href]');

      if (target) {
        const href = target.getAttribute('href');

        e.preventDefault();

        this.visit(href.slice(1), {
          method: 'GET',
          body: null
        });
      }
    });

    document.body.addEventListener('submit', (e) => {
      const form = e.target.closest('form[action]');

      if (form) {
        const action = form.getAttribute('action');

        e.preventDefault();

        this.visit(action.slice(1), {
          method: (form.method || 'GET').toUpperCase(),
          body: new FormData(form),
        });
      }
    });
  }

  redirect(location) {
    return {
      type: 'redirect',
      location,
    };
  }

  addRoute(path, handler) {
    this.routes.set(path, handler);
  }

  async visit(path, options) {
    const handler = this.routes.get(path);
    console.log(handler);
    const content = await handler(options);

    if (content.type === 'redirect') {
      return this.visit(content.location, { method: 'GET', body: null });
    }

    const next = await render('layout', {}, content);

    this.#replace(next);

    const elems = document.body.querySelectorAll('[autofocus]');
    const last = elems[elems.length - 1];

    if (last) {
      last.focus();
    }
  }

  #replace(html) {
    if (!this.visitting) {
      document.body.innerHTML = html;
      this.visitting = true;
      return;
    }

    if (!document.startViewTransition) {
      document.body.innerHTML = html;
      return;
    }

    document.startViewTransition(() => {
      document.body.innerHTML = html;
    });
  }
}