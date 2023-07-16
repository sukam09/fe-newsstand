import { makeSubscribeBtn } from "./subscribeButton.js";

export const makePressInfo = (agency) => {
  const $press_info = document.createElement("div");
  $press_info.className = "press-info";

  const $press_brandmark = document.createElement("img");
  $press_brandmark.className = "press-brandmark";
  $press_brandmark.src = agency.logo;
  $press_brandmark.alt = `${agency.name}`;

  const $press_edit_date = document.createElement("div");
  $press_edit_date.className = "press-edit-date";
  $press_edit_date.innerText = `${agency.editTime} 편집`;

  $press_info.appendChild($press_brandmark);
  $press_info.appendChild($press_edit_date);
  $press_info.appendChild(makeSubscribeBtn(agency));

  return $press_info;
};
