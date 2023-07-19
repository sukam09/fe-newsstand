import { FILTER_TYPE, VIEW_TYPE } from "../asset/data/constants.js";
import { store } from "../store/store.js";
import { changeView } from "./view-change.js";

const subBtn = document.querySelector(".sub-btn");
const unsubBtn = document.querySelector(".unsub-btn");
const subSnackBar = document.querySelector(".sub-snack-bar");

function drawSubSnack() {
    subSnackBar.classList.remove("hide");
    subSnackBar.classList.add("sub-snack-animation");
    subSnackBar.addEventListener("animationend", () => {
        subSnackBar.classList.remove("sub-snack-animation");
        subSnackBar.classList.add("hide");
        store.setCrntFilter(FILTER_TYPE.SUBSCRIBED);
        changeView(VIEW_TYPE.LIST);
    })
}
function handleSubscribe(){
    subBtn.addEventListener("click",({target}) => {
        const pressIdx = parseInt(target.parentNode.parentNode.getAttribute("index"))
        store.setSubList(pressIdx, "subscribe");
        subBtn.classList.add("hide"); // just for instant btn change
        unsubBtn.classList.remove("hide");
        drawSubSnack();
    })
}

export {handleSubscribe};