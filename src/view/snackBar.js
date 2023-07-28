import { GRID, LIST, SUBSCRIBE } from "../constant.js";
import { timerId } from "../controller/timer.js";
import { LIST_PAGE, VIEW } from "../model/global.js";
import { store } from "../model/store.js";

function snackBarForceDisappear() {
  const main = document.querySelector("main");
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
    const main = document.querySelector("main");
    main.appendChild(snackBarElement);

    setTimeout(() => {
      if (snackBarElement && snackBarElement.parentElement === main) {
        main.removeChild(snackBarElement);
      }
      resolve();
    }, 5000);
  });
}

function subscriber() {
  store.subscribe(snackBar, SUBSCRIBE, GRID);
  store.subscribe(
    () => {
      snackBar().then(() => {
        timerId && clearInterval(timerId);

        if (VIEW.layout === LIST) {
          LIST_PAGE.category = store.getSubscribe().length - 1;

          const autoMoveSubscribePage = true;
          VIEW.setTab(SUBSCRIBE, autoMoveSubscribePage);
        }
      });
    },
    SUBSCRIBE,
    LIST
  );
}
subscriber();

export { snackBar, snackBarForceDisappear };
