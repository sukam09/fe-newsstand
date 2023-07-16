import { createMainBody } from "./mainBody/mainBody.js";
import { createMainHeader } from "./mainHeader/mainHeader.js";

export async function createMainSection() {
  return `
    <section id="main_section">
      ${createMainHeader()}
      ${await createMainBody()}
    </section>
    `;
}
