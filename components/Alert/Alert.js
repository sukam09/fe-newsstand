import { INITIAL_CATEGORY } from "../../constants/constant.js";
import { dispatcher } from "../../store/dispatcher.js";
import { store } from "../../store/store.js";
import { makeGrid } from "../Grid/gridElement.js";
import { updateSubscribeButton } from "../List/subscribeButton.js";
import { ListComponent } from "../ListComponent.js";

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
    this.modal = document.createElement("div");
    this.modal.className = "alert";

    this.container = document.createElement("div");
    this.container.className = "alert-container";

    this.content = document.createElement("div");
    this.content.className = "alert-content";

    this.topcontent = document.createElement("span");
    this.topcontent.className = "alert-top-content";

    this.botcontent = document.createElement("span");
    this.botcontent.className = "alert-bottom-content";
    this.botcontent.innerHTML = `(을)를 <br/> 구독해지하시겠습니까?`;

    this.action = document.createElement("div");
    this.action.className = "alert-action";

    this.confirmBtn = document.createElement("button");
    this.confirmBtn.innerText = "예, 해지합니다";
    this.confirmBtn.className = "confirmBtn";

    this.confirmBtn.addEventListener("click", () => {
      const subscribe_press = document.querySelector(".subscribe_press");
      const agency_list = document.querySelector(".agency-grid");

      [this.name, this.isSubscribed, this.current_page, this.agencies] =
        this.getState();

      // 내가 구독한 언론사를 보고 있다면 GridComponent 다시 호출해야함.
      if (Boolean(subscribe_press.getAttribute("subscribetype"))) {
        if (agency_list.style.display === "grid") {
          const cancel_elem = document.querySelector(`.${this.getState()[0]}`);
          cancel_elem.remove();
          makeGrid({ name: "", logo: "" });
        } else {
          this.agencies.splice(this.current_page, 1);

          updateSubscribeButton(this.name);
          ListComponent(
            this.current_page,
            this.agencies,
            this.agencies[this.current_page].name,
            INITIAL_CATEGORY
          );
        }
      }

      this.dispatch(this.name, this.isSubscribed);

      this.close();
    });

    this.cancelBtn = document.createElement("button");
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
