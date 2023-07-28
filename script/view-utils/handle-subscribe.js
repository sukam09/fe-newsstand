import { FILTER_TYPE, VIEW_TYPE } from "../../asset/data/constants.js";
import { store } from "../../store/store.js";
import { changeFilter } from "../nav/change-filter.js";

const alertContainer = document.querySelector(".unsub-alert-container")
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
    const pressData = store.getPressData();
    const unsubAlert = `
    <div class="unsub-alert">
        <div class="alert-content">${pressData[id-1].name}을(를)<br/>구독해지하시겠습니까?</div>
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
    const {crntView} = store.getViewState();
    let subBtn;
    let unsubBtn;

    switch (crntView){
        case VIEW_TYPE.GRID:
            subBtn = document.querySelector(".sub-btn");
            unsubBtn = document.querySelector(".unsub-btn")
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
            break;
        
        case VIEW_TYPE.LIST:
            // subBtn = document.querySelector(".list-sub-btn");
            // unsubBtn = document.querySelector(".list-unsub-btn")
            // subBtn?.addEventListener("click", ({target}) => {
            //     const pressIdx = parseInt(target.getAttribute("index"));
            //     store.setSubList(pressIdx, "subscribe");
            //     drawSubSnack();
            // }, )
            // unsubBtn?.addEventListener("click", ({target}) => {
            //     const pressIdx = parseInt(target.getAttribute("index"));
            //     drawUnsubAlert(pressIdx);
            // })
            break;
        }
}

export {handleSubscribe};