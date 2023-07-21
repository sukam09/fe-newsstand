import { NEWS_COUNT } from "../constants/index.js";
import { store, useSelector } from "../store/index.js";
import { closeModal } from "../store/reducer/modal.js";
import { prevPage } from "../store/reducer/page.js";
import { cancelSubscribe } from "../store/reducer/subscribe-list.js";

const $modal = document.querySelector(".modal");
const $confirmButton = $modal.querySelector(".btns_confirm");
const $cancelButton = $modal.querySelector(".btns_cancel");

let handlerOnConfirmButton;

const handleClickOutSideModal = (e) => {
  const open = useSelector((state) => state.modal.open);
  if (!open) return;
  if (e.target.closest(".modal") || e.target.closest(".subscribe-btn")) return;

  store.dispatch(closeModal());
};

const handleClickModalCancelButton = () => {
  store.dispatch(closeModal());
};

const replaceEventListenerOnConfirmButton = (press) => {
  $confirmButton.removeEventListener("click", handlerOnConfirmButton);
  handlerOnConfirmButton = () => {
    store.dispatch(cancelSubscribe(press));
    store.dispatch(closeModal());

    const subscribeList = useSelector((state) => state.subscribeList);
    if (subscribeList.length % NEWS_COUNT === 0) {
      store.dispatch(prevPage());
    }
  };
  $confirmButton.addEventListener("click", handlerOnConfirmButton);
};

export const setModal = () => {
  window.addEventListener("click", handleClickOutSideModal);
  $cancelButton.addEventListener("click", handleClickModalCancelButton);

  store.subscribe(() => {
    const { open, press } = useSelector((state) => state.modal);

    if (open) {
      $modal.querySelector(".contents_press-name").innerText = press;
      $modal.classList.remove("hidden");

      replaceEventListenerOnConfirmButton(press);
      return;
    }

    $modal.classList.add("hidden");
  });
};
