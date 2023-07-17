import { createPressGrid } from "./content/pressGrid/pressGrid.js";
import { createContent } from "./content/content.js";
import {
  createLeftPageButton,
  createRightPageButton,
} from "./pageButtons/pageButtons.js";

export async function createMainBody() {
  return `
    <div class="main_body">
      ${createRightPageButton()}
      ${createContent()}
      ${createLeftPageButton()}
    </div>
  `;
}
