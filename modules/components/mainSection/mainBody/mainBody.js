import { createContent } from "./content/content.js";

export async function createMainBody() {
  return `
    <div class="main_body">
      ${createRightPageButton()}
      ${createContent()}
      ${createLeftPageButton()}
    </div>
  `;
}

function createRightPageButton() {
  return `
    <img
      src="/assets/icons/rightbutton.png"
      class="right_button"
      alt=""
    />
    `;
}

function createLeftPageButton() {
  return `
        <img
          src="/assets/icons/leftbutton.png"
          class="left_button"
          alt=""
        />
        `;
}
