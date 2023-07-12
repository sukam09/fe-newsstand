import { setDate } from "../../utils/utils.js";

const $headerDate = document.querySelector(".container-header_date");

const setHeaderDate = () => {
  $headerDate.innerText = setDate();
};

export { setHeaderDate };
