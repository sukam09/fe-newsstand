import { GRID } from "../../../constant.js";
import { html } from "../../../lib/jsx.js";
import { store } from "../../../store/state.js";
import SubscribeButton from "../../subscribe/SubscribeButton.js";
const LIGHT_LOGO_PATH = (id) => `/public/asset/images/light/${id}.png`;
const DARK_LOGO_PATH = (id) => `/public/asset/images/dark/${id}.png`;
const onMouseHover = (type, company) => {
    const $template = html ` <div class="company-list__item--hover">
    ${SubscribeButton({
        type: GRID,
        company,
    })}
  </div>`;
    if (type === "mouseenter")
        return ({ currentTarget }) => currentTarget.appendChild($template);
    else if (type === "mouseleave")
        return ({ currentTarget }) => currentTarget
            .querySelector(".company-list__item--hover")
            .remove();
};
const GridItem = (data) => html `
  <li
    class="company-list__item"
    onMouseEnter=${onMouseHover("mouseenter", data)}
    onMouseLeave=${onMouseHover("mouseleave", data)}
  >
    <img
      class="logo"
      src=${!store.dark ? LIGHT_LOGO_PATH(data.id) : DARK_LOGO_PATH(data.id)}
      alt=${data.name}
    />
  </li>
`;
export default GridItem;
