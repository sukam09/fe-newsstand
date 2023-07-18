export class SnackBar {
  constructor() {
    this.modal = document.createElement("div");
    this.modal.className = "snackbar";

    this.container = document.createElement("div");
    this.container.className = "snackbar-container";

    this.content = document.createElement("div");
    this.content.className = "snackbar-content";

    this.container.appendChild(this.content);

    this.modal.appendChild(this.container);

    const root = document.getElementById("root");
    root.appendChild(this.modal);
  }

  show(message) {
    this.content.innerText = message;
    this.modal.style.display = "block";

    this.modal.classList.add("fadeout-animation");

    setTimeout(() => {
      this.close();
    }, 5000);
  }

  close() {
    this.modal.classList.remove("fadeout-animation");

    this.modal.style.display = "none";
  }
}
