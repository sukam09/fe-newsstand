import { mainBody } from "./mainBody/mainBody.js";

export async function mainSection() {
  return `
    <section id="main_section">
      ${await mainBody()}
    </section>
    `;
}
