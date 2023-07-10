import { date } from "../utils/date.js";
import { paintRandomNewsstand } from "../newsstand/newsstandSystem.js";
import { paintSubView } from "../newsstand/subView.js";
import { paintSubViewRight } from "../newsstand/subviewRight.js";

const test = document.getElementsByClassName("main__rolling-title-right");

// 기능
renderHeader();
renderMain();
renderSubview();

function renderHeader() {
  date();
}

function renderSubview() {
  paintSubView();
  paintSubViewRight();
}

function renderMain() {
  paintRandomNewsstand();
}
