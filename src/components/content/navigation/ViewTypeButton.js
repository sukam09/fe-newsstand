import { html } from "../../../lib/jsx.js";
import { store } from "../../../store/state.js";
const onChangeViewType = (type) => ({ currentTarget }) => {
    store.type = currentTarget.dataset.option;
};
const isActive = (type) => store.type === type;
const ViewTypeButton = ({ type, srText }) => html `
  <button
    class=${`view-type__option ${isActive(type) && "active"}`}
    data-option=${type}
    onClick=${onChangeViewType(type)}
  >
    ${srText && html `<span class="screen-reader-only"> ${srText} </span>`}
  </button>
`;
export default ViewTypeButton;
