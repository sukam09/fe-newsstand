import listViewData from "../asset/data/listViewData.js";
import { store } from "../store/store.js";
const categoryList = ["종합/경제","방송/통신","IT","영자지","스포츠/연예","매거진/전문지","지역"]

const listNav = document.querySelector(".list-nav");

function listenProgressBar() {
    const progressBar = document.querySelector(".progress-bar");
    let crntPage = store.getPage();
    let crntCategory = store.getCategory();
    const numOfPages = listViewData.filter(data => data.category == categoryList[crntCategory]).length
    
    progressBar.addEventListener("animationend", () => {
        
        if (crntPage < numOfPages - 1){
            store.setPage(crntPage+1);
        } else if (crntPage == numOfPages - 1){
            store.setPage(0);
            let crntListIdx = crntCategory == categoryList.length-1 ? 0 : crntCategory+1;
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