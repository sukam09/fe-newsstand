import { setList } from "../../utils/setList.js";

export class SnackBar {
  constructor() {
    this.modal = null;
    this.container = null;
    this.content = null;

    this.root = document.getElementById("root");
    this.initializeElement();
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
    this.content.innerText = message;
    this.modal.style.display = "block";

    this.modal.classList.add("fadeout-animation");

    const subscribe_press = document.querySelector(".subscribe_press");
    const all_press = document.querySelector(".all_press");
    setTimeout(() => {
      this.close();

      // 내가 구독한 언론사 리스트 보기로 전환.
      if (Boolean(all_press.getAttribute("subscribetype"))) {
        all_press.removeAttribute("subscribetype");
        subscribe_press.setAttribute("subscribetype", true);
      }
      setList();
    }, 5000);
  }

  close() {
    this.modal.classList.remove("fadeout-animation");
    this.modal.style.display = "none";
  }
}

const snackbar = new SnackBar();

export default snackbar;
