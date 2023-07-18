import { setDisplay } from "./utils.js";

function showSnackBar() {
  setDisplay(".snack-bar", "block");
}

function removeSnackBar() {
  setDisplay(".snack-bar", "none");
}

export { showSnackBar, removeSnackBar };
