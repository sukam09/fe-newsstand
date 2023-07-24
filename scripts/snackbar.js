import { TAB_TYPE, VIEW_TYPE } from "../constants/index.js";
import { store, useSelector } from "../store/index.js";
import { changeTab } from "../store/reducer/page.js";
import { closeSnackbar } from "../store/reducer/snackbar.js";

const SNACKBAR_SHOW_DURATION = "5000";

const $snackbar = document.querySelector(".snackbar");
let timer;

function snackbarSubscriber() {
  const open = useSelector((state) => state.snackbar.open);
  const viewType = useSelector((state) => state.page.viewType);

  if (open) {
    $snackbar.classList.add("snackbar-open");
    clearTimeout(timer);

    timer = setTimeout(() => {
      store.dispatch(closeSnackbar());

      if (viewType === VIEW_TYPE.LIST) {
        store.dispatch(changeTab(TAB_TYPE.SUBSCRIBE));
      }
    }, SNACKBAR_SHOW_DURATION);

    return;
  }

  $snackbar.classList.remove("snackbar-open");
}

export function setSnackbar() {
  store.subscribe(snackbarSubscriber);
}
