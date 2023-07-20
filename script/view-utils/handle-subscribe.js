import { FILTER_TYPE, VIEW_TYPE } from "../../asset/data/constants.js";
import { store } from "../../store/store.js";
import { changeFilter } from "./change-filter.js";

const subBtn = document.querySelector(".sub-btn");
const unsubBtn = document.querySelector(".unsub-btn");
const subSnackBar = document.querySelector(".sub-snack-bar");

function drawSubSnack() {
    subSnackBar.classList.remove("hide");
    subSnackBar.classList.add("sub-snack-animation");
    subSnackBar.addEventListener("animationend", () => {
        subSnackBar.classList.remove("sub-snack-animation");
        subSnackBar.classList.add("hide");
        changeFilter(FILTER_TYPE.SUBSCRIBED)
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