import { setDate } from "../../utils/utils.js";
import { _querySelector } from "../../utils/my-query-selector.js";

const $headerDate = _querySelector(".container-header_date");

const setHeaderDate = () => {
  $headerDate.innerText = setDate();
};

export { setHeaderDate };
