import { makeSubscribeBtn } from "./subscribeButton.js";

export const makePressInfo = (current_page, agencies) => {
  const $press_info = document.createElement("div");
  $press_info.className = "press-info";

  const $press_brandmark = document.createElement("img");
  $press_brandmark.className = "press-brandmark";
  $press_brandmark.src = agencies[current_page].logo;
  $press_brandmark.alt = `${agencies[current_page]}`;

  const $press_edit_date = document.createElement("div");
  $press_edit_date.className = "press-edit-date";
  $press_edit_date.innerText = `${agencies[current_page].editTime} 편집`;

  $press_info.appendChild($press_brandmark);
  $press_info.appendChild($press_edit_date);
  $press_info.appendChild(makeSubscribeBtn(current_page, agencies));

  return $press_info;
};
