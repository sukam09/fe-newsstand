import { headline } from "./headline/headline.js";

export async function headlineSection() {
  const headlineComponent = await headline();
  return `
    <section id="headline_section" class="flex_row">
      ${headlineComponent}
    </section>
    `;
}
