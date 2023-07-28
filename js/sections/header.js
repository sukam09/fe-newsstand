import { DATE_UPDATE_TIME } from "../constants/constants.js";
import { getDate } from "../utils/commonUtils/getDate.js";
import { reload } from "../utils/commonUtils/reload.js";

function getDateInterval() {
  setInterval(getDate(), DATE_UPDATE_TIME);
}

function Header() {
  reload();
  getDateInterval();
}

export { Header };
