import { CATEGORY_LIST } from "../../asset/data/constants.js";
import listViewData from "../../asset/data/listViewData.js";
import { store } from "../../store/store.js";

const listNav = document.querySelector(".list-nav");

function listenProgressBar() {
    const progressBar = document.querySelector(".progress-bar");
    let {crntPage, crntCategory} = store.getViewState();
    const numOfPages = listViewData.filter(data => data.category == CATEGORY_LIST[crntCategory]).length
    
    progressBar.addEventListener("animationend", () => {
        if (crntPage < numOfPages - 1){
            store.setViewState({crntPage: crntPage+1})
        } else if (crntPage == numOfPages - 1){
            let crntListIdx = crntCategory == CATEGORY_LIST.length-1 ? 0 : crntCategory+1;
            store.setViewState({crntCategory: crntListIdx, crntPage: 0})
        }
    })
}
function removeProgressBar() {
    const progressBar = document.querySelector(".progress-bar")
    progressBar.classList.remove("progressing");
}
function drawProgressBar() {
    const target = listNav.children[store.getViewState().crntCategory];
    const progressBarElem = document.createElement("div");
    progressBarElem.classList.add("progress-bar", "progressing");
    target.insertBefore(progressBarElem, target.firstChild);
    
    listenProgressBar();
    
}
export {drawProgressBar, removeProgressBar}