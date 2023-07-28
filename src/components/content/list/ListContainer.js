import { html } from "../../../lib/jsx.js";
import ListContent from "./ListContent.js";
import ListNavigation from "./ListNavigation.js";
const ListContainer = ({ data }) => html `
  <div class="list__container">${ListNavigation()} ${ListContent(data)}</div>
`;
export default ListContainer;
