import { setList } from "../../utils/setList.js";
import { ce, qs } from "../../utils/utils.js";

export class SnackBar {
  constructor() {
    this.modal = null;
    this.container = null;
    this.content = null;

    this.root = document.getElementById("root");
    this.initializeElement();

    this.timer = null;
  }

  initializeElement() {
    this.modal = ce("div");
    this.modal.className = "snackbar";

    this.container = ce("div");
    this.container.className = "snackbar-container";

    this.content = ce("div");
    this.content.className = "snackbar-content";

    this.container.appendChild(this.content);

    this.modal.appendChild(this.container);

    this.root.appendChild(this.modal);
  }

  show(message) {
    if (this.timer) {
      clearTimeout(this.timer);
      this.modal.style.display = "none";
    }

    this.content.innerText = message;
    this.modal.style.display = "block";

    const subscribe_press = qs(".subscribe_press");
    const all_press = qs(".all_press");
    this.timer = setTimeout(() => {
      this.close();
      if (Boolean(all_press.getAttribute("subscribetype"))) {
        all_press.removeAttribute("subscribetype");
        subscribe_press.setAttribute("subscribetype", true);
      }
      setList();
    }, 5000);
  }

  close() {
    this.modal.style.display = "none";
    this.timer = null;
  }

  cancelTimer() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }
}

const snackbar = new SnackBar();

export default snackbar;
