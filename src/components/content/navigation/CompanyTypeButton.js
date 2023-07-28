import { GRID } from "../../../constant.js";
import { html } from "../../../lib/jsx.js";
import { store } from "../../../store/state.js";
const isActive = (type) => store.filter === type;
const onChangeFilter = (type) => () => {
    store.filter = type;
    store.filter === "all" ? (store.type = GRID) : (store.type = "list");
};
const CompanyTypeButton = ({ type, text }) => html `
  <button
    class=${`company-type__option--${type} ${isActive(type) ? "active" : ""}`}
    onClick=${onChangeFilter(type)}
  >
    ${text}
  </button>
`;
export default CompanyTypeButton;
