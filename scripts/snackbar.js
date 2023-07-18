import { store, useSelector } from "../store/index.js";
import { closeSnackbar } from "../store/reducer/snackbar.js";

const SNACKBAR_SHOW_DURATION = "5000";

const $snackbar = document.querySelector(".snackbar");
let timer;

export const setSnackbar = () => {
  store.subscribe(() => {
    const open = useSelector((state) => state.snackbar.open);

    if (open) {
      $snackbar.classList.add("snackbar-open");
      clearTimeout(timer);

      timer = setTimeout(() => {
        store.dispatch(closeSnackbar());
      }, SNACKBAR_SHOW_DURATION);

      return;
    }

    $snackbar.classList.remove("snackbar-open");
  });
};
