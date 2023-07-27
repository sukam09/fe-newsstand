import { setList } from "../../utils/setList.js";

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
    this.modal = document.createElement("div");
    this.modal.className = "snackbar";

    this.container = document.createElement("div");
    this.container.className = "snackbar-container";

    this.content = document.createElement("div");
    this.content.className = "snackbar-content";

    this.container.appendChild(this.content);

    this.modal.appendChild(this.container);

    this.root.appendChild(this.modal);
  }

  show(message) {
    if (this.timer) {
      clearTimeout(this.timer);
      this.modal.style.display = "none";
      console.log(this.modal);
    }

    this.content.innerText = message;
    this.modal.style.display = "block";

    const subscribe_press = document.querySelector(".subscribe_press");
    const all_press = document.querySelector(".all_press");
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
