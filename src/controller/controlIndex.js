import { pageButton } from "./Components/pageButton.js";
import { pressFilterTabs } from "./Components/pressFilterTabs.js";
import { viewButton } from "./Components/viewButton.js";

export function controller() {
  //좌우 버튼
  pageButton();
  //레이아웃 버튼
  viewButton();
  //탭버튼
  pressFilterTabs();
}
