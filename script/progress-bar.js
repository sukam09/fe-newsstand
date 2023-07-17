import listViewData from "../asset/data/listViewData.js";
import { drawList } from "./list-view.js";
const categoryList = ["종합/경제","방송/통신","IT","영자지","스포츠/연예","매거진/전문지","지역"]


function listenProgressBar(crntPage, crntListIdx) {
    const progressBar = document.querySelector(".progress-bar");
    const numOfPages = listViewData.filter(data => data.category == categoryList[crntListIdx]).length
    progressBar.addEventListener("animationend", () => {
        if (crntPage < numOfPages - 1){
            crntPage++;
            drawList(crntListIdx, crntPage)
        } else if (crntPage == numOfPages - 1){
            crntPage = 0;
            crntListIdx = crntListIdx == categoryList.length-1 ? 0 : crntListIdx+1;
            drawList(crntListIdx, crntPage);
        }
    })
}
function drawProgressBar(target, crntPage, crntListIdx) {
    const progressBarElem = document.createElement("div");
    progressBarElem.classList.add("progress-bar");
    target.insertBefore(progressBarElem, target.firstChild);
    
    listenProgressBar(crntPage, crntListIdx);
    
}
export {drawProgressBar, listenProgressBar}