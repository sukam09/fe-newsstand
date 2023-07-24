import { NEWS_COUNT } from "../constants/index.js";
import { modalStore, store, useSelector } from "../store/index.js";
import { closeModal } from "../store/reducer/modal.js";
import { prevPage } from "../store/reducer/page.js";
import { cancelSubscribe } from "../store/reducer/subscribe-list.js";

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
    store.dispatch(cancelSubscribe(press));
    modalStore.dispatch(closeModal());

    const subscribeList = useSelector({
      store,
      selector: (state) => state.subscribeList,
    });
    if (subscribeList.length % NEWS_COUNT === 0) {
      store.dispatch(prevPage());
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
