import { html } from "../../../lib/jsx.js";
import ListContent from "./ListContent.js";
import ListNavigation from "./ListNavigation.js";
const ListContainer = ({ data, categories, }) => {
    const $template = html `
      <div class="list__container">
        ${ListNavigation(categories)} ${ListContent(data)}
      </div>
    `;
    return $template;
};
export default ListContainer;
