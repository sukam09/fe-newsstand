import { getDate } from "../utils/getDate.js";
import { reload } from "../utils/reload.js";

function getDateInterval() {
  setInterval(getDate(), 60000);
}

function Header() {
  reload();
  getDateInterval();
}

export { Header };
