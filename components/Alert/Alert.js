import { INITIAL_CATEGORY } from "../../constants/constant.js";
import { dispatcher } from "../../store/dispatcher.js";
import { store } from "../../store/store.js";

import { makeGrid } from "../Grid/gridElement.js";
import { updateSubscribeButton } from "../List/subscribeButton.js";
import { ListComponent } from "../List/ListComponent.js";
import { setGrid } from "../../utils/setGrid.js";
import { setList } from "../../utils/setList.js";
import { ce, qs } from "../../utils/utils.js";

export class Alert {
  constructor() {
    this.modal = null;
    this.container = null;
    this.content = null;
    this.topcontent = null;
    this.botcontent = null;
    this.action = null;
    this.confirmBtn = null;
    this.cancelBtn = null;

    this.root = document.getElementById("root");
    this.initializeElement();
  }

  initializeElement() {
    this.modal = ce("div");
    this.modal.className = "alert";

    this.container = ce("div");
    this.container.className = "alert-container";

    this.content = ce("div");
    this.content.className = "alert-content";

    this.topcontent = ce("span");
    this.topcontent.className = "alert-top-content";

    this.botcontent = ce("span");
    this.botcontent.className = "alert-bottom-content";
    this.botcontent.innerHTML = `(을)를 <br/> 구독해지하시겠습니까?`;

    this.action = ce("div");
    this.action.className = "alert-action";

    this.confirmBtn = ce("button");
    this.confirmBtn.innerText = "예, 해지합니다";
    this.confirmBtn.className = "confirmBtn";

    this.confirmBtn.addEventListener("click", () => {
      const subscribe_press = qs(".subscribe_press");
      const all_press = qs(".all_press");

      const agency_list = qs(".agency-grid");

      [this.name, this.isSubscribed, this.current_page, this.agencies] =
        this.getState();

      // 내가 구독한 언론사
      if (Boolean(subscribe_press.getAttribute("subscribetype"))) {
        // Grid View in 내가 구독한 언론사
        if (agency_list.style.display === "grid") {
          const cancel_elem = qs(`.${this.getState()[0]}`);
          cancel_elem.remove();
          makeGrid({ name: "", logo: "" });

          // 구독한 언론사가 하나도 없으면 전체 언론사로 이동
          const $ul = qs(".agency-grid");
          const first_child = $ul.querySelector("li:first-child").className;
          if (first_child === "") {
            all_press.setAttribute("subscribetype", true);
            subscribe_press.removeAttribute("subscribetype");
            setGrid();
          }
        }
        // List View in 내가 구독한 언론사
        else {
          this.agencies.splice(this.current_page, 1);

          updateSubscribeButton(this.name);
          // 구독한 언론사가 존재하는 경우
          if (this.agencies.length > 0) {
            ListComponent(
              this.current_page,
              this.agencies,
              this.agencies[this.current_page].name,
              INITIAL_CATEGORY
            );
          }
          // 구독한 언론사가 존재하지 않는 경우
          else {
            all_press.setAttribute("subscribetype", true);
            subscribe_press.removeAttribute("subscribetype");
            setList();
          }
        }
      }

      this.dispatch(this.name, this.isSubscribed);
      this.close();
    });

    this.cancelBtn = ce("button");
    this.cancelBtn.innerText = "아니오";
    this.cancelBtn.className = "cancelBtn";

    this.cancelBtn.addEventListener("click", () => {
      this.close();
    });

    this.content.appendChild(this.topcontent);
    this.content.appendChild(this.botcontent);

    this.action.appendChild(this.confirmBtn);
    this.action.appendChild(this.cancelBtn);

    this.container.appendChild(this.content);
    this.container.appendChild(this.action);

    this.modal.appendChild(this.container);

    this.root.appendChild(this.modal);
  }

  show(message) {
    this.topcontent.innerText = message;
    this.modal.style.display = "block";
  }

  close() {
    this.modal.style.display = "none";
  }

  setState(name, isSubscribed, current_page, agencies) {
    this.name = name;
    this.isSubscribed = isSubscribed;
    this.current_page = current_page;
    this.agencies = agencies;
  }

  getState() {
    return [this.name, this.isSubscribed, this.current_page, this.agencies];
  }

  dispatch(name, isSubscribed) {
    dispatcher({
      type: "TOGGLE_SUBSCRIPTIONS",
      name,
      value: !isSubscribed,
    });
    console.log(store);
  }
}

const alert = new Alert();
export default alert;
