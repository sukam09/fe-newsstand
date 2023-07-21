import { qs } from "../utils.js";
import { createHeadlineSection } from "./headlineSection/headlineSection.js";
import { createMainSection } from "./mainSection/mainSection.js";
import { createAlert } from "./modal/alert.js";
import { createSnackbar } from "./modal/snackbar.js";
import { createTitleSection } from "./titleSection/titleSection.js";

export async function initComponents() {
  const $root = qs("#root");
  let components = "";
  components += createTitleSection();
  components += await createHeadlineSection();
  components += await createMainSection();
  components += await createAlert();
  components += await createSnackbar();

  $root.innerHTML += components;
}
