import { NEWS_COUNT, TAB_TYPE } from "../constants/index.js";
import { modalStore, appStore, useSelector } from "../store/index.js";
import { closeModal } from "../store/reducer/modal.js";
import { changeTab, prevPage } from "../store/reducer/page.js";
import { cancelSubscribe } from "../store/reducer/subscribe-list.js";
import { activateCurrentTab } from "./tab-button.js";

const $modal = document.querySelector(".modal");
const $confirmButton = $modal.querySelector(".btns_confirm");
const $cancelButton = $modal.querySelector(".btns_cancel");

let handlerOnConfirmButton;

function handleClickOutSideModal(e) {
  const open = useSelector({
    store: modalStore,
    selector: (state) => state.open,
  });

  if (!open) return;
  if (e.target.closest(".modal") || e.target.closest(".subscribe-btn")) return;

  modalStore.dispatch(closeModal());
}

function handleClickModalCancelButton() {
  modalStore.dispatch(closeModal());
}

function replaceEventListenerOnConfirmButton(press) {
  $confirmButton.removeEventListener("click", handlerOnConfirmButton);
  handlerOnConfirmButton = () => {
    appStore.dispatch(cancelSubscribe(press));
    modalStore.dispatch(closeModal());

    const subscribeList = useSelector({
      store: appStore,
      selector: (state) => state.subscribeList,
    });

    if (subscribeList.length === 0) {
      appStore.dispatch(changeTab(TAB_TYPE.ALL));
      activateCurrentTab(TAB_TYPE.ALL);
      alert("구독한 언론사가 존재하지 않아 전체보기로 전환됩니다.");
      return;
    }

    if (subscribeList.length % NEWS_COUNT === 0) {
      appStore.dispatch(prevPage());
    }
  };
  $confirmButton.addEventListener("click", handlerOnConfirmButton);
}

function modalSubscriber() {
  const { open, press } = useSelector({
    store: modalStore,
  });

  if (open) {
    $modal.querySelector(".contents_press-name").innerText = press;
    $modal.classList.remove("hidden");

    replaceEventListenerOnConfirmButton(press);
    return;
  }

  $modal.classList.add("hidden");
}

export function setModal() {
  window.addEventListener("click", handleClickOutSideModal);
  $cancelButton.addEventListener("click", handleClickModalCancelButton);

  modalStore.subscribe(modalSubscriber);
}
