import { createHeadline } from "./headline/headline.js";

export async function createHeadlineSection() {
  return `
    <section id="headline_section" class="flex_row">
      ${await createHeadline()}
    </section>
    `;
}
