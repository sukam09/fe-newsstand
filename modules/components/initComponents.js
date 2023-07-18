import { qs } from "../utils.js";
import { createHeadlineSection } from "./headlineSection/headlineSection.js";
import { createMainSection } from "./mainSection/mainSection.js";
import { createTitleSection } from "./titleSection/titleSection.js";

export async function initComponents() {
  const $root = qs("#root");
  $root.innerHTML += createTitleSection();
  $root.innerHTML += await createHeadlineSection();
  $root.innerHTML += await createMainSection();
}
