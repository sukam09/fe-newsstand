import { CATEGORY_LIST } from "../asset/data/constants.js";
import listViewData from "../asset/data/listViewData.js";
import { store } from "../store/store.js";

const listNav = document.querySelector(".list-nav");

function listenProgressBar() {
    const progressBar = document.querySelector(".progress-bar");
    let crntPage = store.getPage();
    let crntCategory = store.getCategory();
    const numOfPages = listViewData.filter(data => data.category == CATEGORY_LIST[crntCategory]).length
    
    progressBar.addEventListener("animationend", () => {
        if (crntPage < numOfPages - 1){
            store.setPage(crntPage+1);
        } else if (crntPage == numOfPages - 1){
            let crntListIdx = crntCategory == CATEGORY_LIST.length-1 ? 0 : crntCategory+1;
            store.setCategory(crntListIdx)
        }
    })
}
function drawProgressBar() {
    const target = listNav.children[store.getCategory()];
    const progressBarElem = document.createElement("div");
    progressBarElem.classList.add("progress-bar");
    target.insertBefore(progressBarElem, target.firstChild);
    
    listenProgressBar();
    
}
export {drawProgressBar}