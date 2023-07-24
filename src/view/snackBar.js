import { VIEW } from "../model/global.js";

function snackBarForceDisappear() {
  const main = VIEW.layout === "grid" ? document.querySelector(".grid") : document.querySelector(".list");
  const snackBarElement = main.querySelector(".snack-bar");
  if (snackBarElement) {
    main.removeChild(snackBarElement);
  }
}

function snackBar() {
  return new Promise((resolve) => {
    const snackBarElement = document.createElement("div");
    snackBarElement.className = "snack-bar";
    snackBarElement.innerHTML = `<span class="snack-bar-text display-medium16">내가 구독한 언론사에 추가되었습니다.</span>`;
    const main = VIEW.layout === "grid" ? document.querySelector(".grid") : document.querySelector(".list");
    main.appendChild(snackBarElement);

    setTimeout(() => {
      if (snackBarElement) {
        main.removeChild(snackBarElement);
      }
      resolve();
    }, 5000);
  });
}

export { snackBar, snackBarForceDisappear };
