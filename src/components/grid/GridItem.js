import { html } from "../../lib/jsx.js";
import SubscribeButton from "../subscribe/SubscribeButton.js";
const LIGHT_LOGO_PATH = (id) => `/public/asset/images/light/${id}.png`;
const DARK_LOGO_PATH = (id) => `/public/asset/images/dark/${id}.png`;
const GridItem = (data) => {
    return html `
    <li class="company-list__item">
      <img class="logo" src=${LIGHT_LOGO_PATH(data.id)} alt=${data.name} />
      <div class="company-list__item--hover">
        ${SubscribeButton("grid", false, () => {
        console.log("구독하기");
    })}
      </div>
    </li>
  `;
};
export default GridItem;
