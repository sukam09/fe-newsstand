import { DATE_UPDATE_TIME } from "../constants/constants.js";
import { getDate } from "../utils/getDate.js";
import { reload } from "../utils/reload.js";

function getDateInterval() {
  setInterval(getDate(), DATE_UPDATE_TIME);
}

function Header() {
  reload();
  getDateInterval();
}

export { Header };
