import { mainBody } from "./mainBody/mainBody.js";
import { mainHeader } from "./mainHeader/mainHeader.js";

export async function mainSection() {
  return `
    <section id="main_section">
      ${mainHeader()}
      ${await mainBody()}
    </section>
    `;
}
