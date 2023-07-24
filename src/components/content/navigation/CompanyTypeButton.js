import { html } from "../../../lib/jsx.js";
import { store } from "../../../store/core.js";
const isActive = (type) => store.filter === type;
const onChangeFilter = (type) => () => {
    store.filter = type;
};
const CompanyTypeButton = ({ type, text }) => {
    const $template = html `
    <button
      class=${`company-type__option--${type} ${isActive(type) ? "active" : ""}`}
      onClick=${onChangeFilter(type)}
    >
      ${text}
    </button>
  `;
    return $template;
};
export default CompanyTypeButton;
