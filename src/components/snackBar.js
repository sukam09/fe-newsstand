import { setDisplay } from "../util/utils.js";

function showSnackBar() {
  setDisplay(".snack-bar", "block");
}

function removeSnackBar() {
  setDisplay(".snack-bar", "none");
}

export { showSnackBar, removeSnackBar };
