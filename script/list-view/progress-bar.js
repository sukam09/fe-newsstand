import { store } from "../../store/store.js";
import { filterData } from "../view-utils/filter-data.js";

const listNav = document.querySelector(".list-nav");

async function listenProgressBarEnd() {
    const progressBar = document.querySelector(".progress-bar");
    const {crntPage, crntCategory} = store.getViewState();
    const {navData, numOfListPages} = await filterData();
    
    progressBar.addEventListener("animationend", () => {
        if (crntPage < numOfListPages - 1){
            store.setViewState({crntPage: crntPage+1})
        } else if (crntPage == numOfListPages - 1){
            let crntListIdx = crntCategory == navData.length-1 ? 0 : crntCategory+1;
            store.setViewState({crntCategory: crntListIdx, crntPage: 0})
        }
    })
}
function removeProgressBar() {
    const progressBar = document.querySelector(".progress-bar");
    if (progressBar){
        progressBar.remove()
    }
}
function drawProgressBar() {
    removeProgressBar();
    const target = listNav.children[store.getViewState().crntCategory];
    const progressBarElem = document.createElement("div");
    progressBarElem.classList.add("progress-bar", "progressing");
    target.insertBefore(progressBarElem, target.firstChild);
    
    listenProgressBarEnd();
    
}
export {drawProgressBar}