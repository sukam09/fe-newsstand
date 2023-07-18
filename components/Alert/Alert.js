export class Alert {
  constructor() {
    this.modal = document.createElement("div");
    this.modal.className = "alert";

    this.container = document.createElement("div");
    this.container.className = "alert-container";

    this.content = document.createElement("div");
    this.content.className = "alert-content";

    this.action = document.createElement("div");
    this.action.className = "alert-action";

    this.confirmBtn = document.createElement("button");
    this.confirmBtn.innerText = "확인";
    this.confirmBtn.addEventListener("click", () => {
      this.close();
    });

    this.cancelBtn = document.createElement("button");
    this.cancelBtn.innerText = "취소";
    this.cancelBtn.addEventListener("click", () => {
      this.close();
    });

    this.action.appendChild(this.confirmBtn);
    this.action.appendChild(this.cancelBtn);

    this.container.appendChild(this.content);
    this.container.appendChild(this.action);

    this.modal.appendChild(this.container);

    const root = document.getElementById("root");
    root.appendChild(this.modal);
  }

  show(message) {
    this.content.innerText = message;
    this.modal.style.display = "block";
  }

  close() {
    this.modal.style.display = "none";
  }
}
