import { listenArrow, updateArrow } from "./script/arrow.js";
import { drawDate } from "./script/date.js";
import { drawPress } from "./script/grid-view.js";
import rollingList from "./asset/data/rollingList.js";
import { rollHeadline } from "./script/rolling-view.js";
import { listenViewChange } from "./script/view-change.js";

const header = document.querySelector(".header-left");
const rollingContent = document.querySelectorAll(".rolling-content");
const viewChangeBtns = document.querySelectorAll(".nav-right .btn")


let crntPage = 0;
let crntView = "grid"

function listenReload(){
    header.addEventListener("click", () => {
        location.reload();
    })
}

function init () {
    drawDate();
    drawPress(crntPage);
    updateArrow(crntView, crntPage);
    listenArrow(crntView, crntPage);
    listenReload();
    rollingContent.forEach((item, index) => {
        const isFirstRoll = true;
        rollHeadline(item,rollingList, rollingList.length, index, isFirstRoll);
    })
    viewChangeBtns.forEach((btn) => {
        listenViewChange(btn,  btn.getAttribute("type"));
    })
}
window.onload = init;