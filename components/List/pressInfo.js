import { DARK_MODE, LIGHT_MODE, LOGO_PATH } from "../../constants/constant.js";
import { store } from "../../store/store.js";
import { ce } from "../../utils/utils.js";
import { makeSubscribeBtn } from "./subscribeButton.js";

export const makePressInfo = (current_page, agencies) => {
  const $press_info = ce("div");
  $press_info.className = "press-info";

  const $press_brandmark = ce("img");
  $press_brandmark.className = "press-brandmark";
  $press_brandmark.src = store.isDarkMode
    ? `${LOGO_PATH}/${DARK_MODE}/${agencies[current_page].logo}`
    : `${LOGO_PATH}/${LIGHT_MODE}/${agencies[current_page].logo}`;
  $press_brandmark.alt = `${agencies[current_page]}`;

  const $press_edit_date = ce("div");
  $press_edit_date.className = "press-edit-date";
  $press_edit_date.innerText = `${agencies[current_page].editTime} 편집`;

  $press_info.appendChild($press_brandmark);
  $press_info.appendChild($press_edit_date);
  $press_info.appendChild(makeSubscribeBtn(current_page, agencies));

  return $press_info;
};
