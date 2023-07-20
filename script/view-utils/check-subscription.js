import { store } from "../../store/store.js";
const subBtn = document.querySelector(".sub-btn");
const unsubBtn = document.querySelector(".unsub-btn");

function checkSubscription(item){
    let subscribedPress = store.getSubList();
    if (subscribedPress.includes(parseInt(item.getAttribute("index")))){
        subBtn.classList.add("hide");
        unsubBtn.classList.remove("hide");
    } else {
        subBtn.classList.remove("hide");
        unsubBtn.classList.add("hide");
    }
}

export {checkSubscription}