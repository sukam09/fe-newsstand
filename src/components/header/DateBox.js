import { setDate } from "../../utils/utils.js";

const $headerDate = document.querySelector(".container-header_date");

export const setHeaderDate = () => {
  $headerDate.innerText = setDate();
};
