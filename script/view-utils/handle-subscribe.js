import { FILTER_TYPE, VIEW_TYPE } from "../../asset/data/constants.js";
import pressList from "../../asset/data/pressList.js";
import { store } from "../../store/store.js";
import { changeFilter } from "./change-filter.js";

const alertContainer = document.querySelector(".unsub-alert-container")
const subBtn = document.querySelector(".sub-btn");
const unsubBtn = document.querySelector(".unsub-btn");
const subSnackBar = document.querySelector(".sub-snack-bar");

function handleAlertAction(id) {
    const alertYes = document.querySelector(".alert-btn-yes");
    const alertNo = document.querySelector(".alert-btn-no");
    alertYes.addEventListener("click", () => {
        store.setSubList(id, "unsubscribe");
        alertContainer.innerHTML = "";
    })
    alertNo.addEventListener("click", () => {
        alertContainer.innerHTML = "";
    })
}
function drawUnsubAlert(id) {
    const unsubAlert = `
    <div class="unsub-alert">
        <div class="alert-content">${pressList[id-1].name}을(를)<br/>구독해지하시겠습니까?</div>
        <div class="alert-btns-container">
            <div class="alert-btn alert-btn-yes">예, 해지합니다</div>
            <div class="alert-btn alert-btn-no">아니오</div>
        </div>
  </div>`
    alertContainer.innerHTML += unsubAlert;
    handleAlertAction(id);
}
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

    unsubBtn.addEventListener("click", ({target}) => {
        const pressIdx = parseInt(target.parentNode.parentNode.getAttribute("index"));
        drawUnsubAlert(pressIdx);
    })
}

export {handleSubscribe};