import {Controller} from "@hotwired/stimulus";
import { formatDistanceToNowStrict } from "date-fns";

export default class extends Controller {
  static values = {
    endTime: Number,
  };

  connect() {
    this.ended = false;
    this.#tick();
  }

  #tick() {
    if (this.ended) return;
    this.element.innerText = formatDistanceToNowStrict(new Date(this.endTimeValue));

    setTimeout(this.#tick.bind(this), 1000);
  }
}