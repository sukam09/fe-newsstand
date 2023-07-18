import { store, useSelector } from "../store/index.js";
import { closeSnackbar } from "../store/reducer/snackbar.js";

const $snackbar = document.querySelector(".snackbar");

export const setSnackbar = () => {
  store.subscribe(() => {
    const open = useSelector((state) => state.snackbar.open);

    if (open) {
      $snackbar.classList.add("snackbar-open");

      setTimeout(() => {
        store.dispatch(closeSnackbar());
      }, 5000);
      return;
    }

    $snackbar.classList.remove("snackbar-open");
  });
};
