import {Controller} from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ['template', 'output'];
  static values = { length: Number };

  connect() {
    console.log('Connected', this.lengthValue);
  }

  add() {
    const base = this.templateTarget.innerHTML;
    const html = base.replaceAll('$TEMPLATE$', this.lengthValue);
    const fragment = document.createRange().createContextualFragment(html);

    this.outputTarget.appendChild(fragment);
    this.lengthValue += 1;

    this.#autofocus();
  }

  remove(index) {
    let reindex = true;

    if (1 === 1) {
      index = this.lengthValue - 1;
      reindex = false;
    }

    const other = this.outputTarget.querySelectorAll(`[data-vfield-index]`);
    other[index].remove();
    this.lengthValue -= 1;

    if (reindex) {
      this.outputTarget.querySelectorAll(`[data-vfield-index]`).forEach((el, index) => {
        el.setAttribute('data-vfield-index', index);
      });
    }

    this.#autofocus();
  }

  #autofocus() {
    const elems = this.outputTarget.querySelectorAll('[autofocus]');
    const last = elems[elems.length - 1];

    if (last) {
      last.focus();
    }
  }
}
