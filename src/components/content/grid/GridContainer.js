import { html } from "../../../lib/jsx.js";
import GridItem from "./GridItem.js";
const GridContainer = ({ data }) => {
    const $template = html `
    <div class="grid-view">
      <ul class="company-list">
        ${data.map((item) => GridItem(item))}
      </ul>
    </div>
  `;
    return $template;
};
export default GridContainer;
