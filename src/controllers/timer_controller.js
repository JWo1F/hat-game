import {Controller} from "@hotwired/stimulus";
import { formatDistanceToNowStrict } from "date-fns";
import {duration} from "../utils.js";

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
    this.element.innerText = duration(new Date(), new Date(this.endTimeValue));

    setTimeout(this.#tick.bind(this), 1000);
  }
}