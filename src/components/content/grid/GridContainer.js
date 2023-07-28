import { html } from "../../../lib/jsx.js";
import GridItem from "./GridItem.js";
const GridContainer = ({ data }) => html `
  <div class="grid-view">
    <ul class="company-list">
      ${data.map((item) => GridItem(item))}
    </ul>
  </div>
`;
export default GridContainer;
