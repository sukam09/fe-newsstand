import { LIST_PAGE, VIEW } from "../../model/global.js";
import { actionCreator, store } from "../../model/store.js";
import { renderGrid } from "../../view/grid.js";
import { news, renderList } from "../../view/list.js";
import { snackBarForceDisappear } from "../../view/snackBar.js";
import { timerId } from "../timer.js";

function createAlert(pressName) {
  const alertElement = document.createElement("div");
  alertElement.className = "unsubscribe-alert";
  alertElement.innerHTML = `
              <div class="alert-contents">
                <span class="alert-contents-text display-bold16">${pressName}<span class="display-medium16"> 을(를)</span> </span>
                <span class="alert-contents-text display-medium16">구독해지하시겠습니까?</span>
              </div>
              <div class="alert-buttons">
                  <div class="each-button confirm-unsubscribe available-medium16">예, 해지합니다</div>
                  <div class="each-button reject available-medium16">아니오</div>
              </div>
          `;

  const main = VIEW.layout === "grid" ? document.querySelector(".grid") : document.querySelector(".list");
  main.appendChild(alertElement);

  return alertElement;
}

export function AlertHandler({ pressName, pressData }) {
  snackBarForceDisappear();
  const alertElement = createAlert(pressName);
  const confirmBtn = alertElement.querySelector(".confirm-unsubscribe");
  const rejectBtn = alertElement.querySelector(".reject");

  confirmBtn.addEventListener("click", async () => {
    timerId && clearInterval(timerId);

    store.dispatch(actionCreator("unsubscribe", { press: pressData }));

    const main = VIEW.layout === "grid" ? document.querySelector(".grid") : document.querySelector(".list");
    main.removeChild(alertElement);

    if (VIEW.layout === "grid") {
      //그리드뷰 구독 해지 후 리렌더
      //   renderGrid();
    } else {
      //리스트뷰 구독 해지 후
      //전체언론사일 경우 - 버튼상태 변경(??)
      //구독언론사일 경우 - 전체 변경(renderList)
      if (VIEW.tab === "subscribe") {
        //렌더
        // if (news.length - 1 === LIST_PAGE.category) {
        //   LIST_PAGE.setCategory(0);
        // }
      } else {
        // const listBtn = document.querySelector(".press-news-wrap .press-info .subscribe-btn");
        // listBtn.querySelector(".subscribe-text").innerHTML = "구독하기";
        // listBtn.querySelector(".plus-btn").setAttribute("src", "../../../../asset/button/plus.png");
      }
      //   renderList();
    }
  });

  rejectBtn.addEventListener("click", () => {
    const main = VIEW.layout === "grid" ? document.querySelector(".grid") : document.querySelector(".list");
    main.removeChild(alertElement);
  });
}
