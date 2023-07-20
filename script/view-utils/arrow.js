import pressList from "../../asset/data/pressList.js"
import listViewData from "../../asset/data/listViewData.js";
import { store } from "../../store/store.js";
import { CATEGORY_LIST, VIEW_TYPE } from "../../asset/data/constants.js";

const leftArrow = document.querySelector(".arrow-left");
const rightArrow = document.querySelector(".arrow-right");

function removeArrow(){
    leftArrow.classList.remove("hidden");
    rightArrow.classList.remove("hidden");
}
function drawArrow(){
    let crntPage = store.getCrntPage();
    let crntView = store.getCrntView();
    let maxPage;
    removeArrow();
    switch (crntView){
        case VIEW_TYPE.GRID:
            maxPage = pressList.length/24;
            if (crntPage == 0){
                leftArrow.classList.add("hidden");
            } else if (crntPage == maxPage-1){
                rightArrow.classList.add("hidden");
            }
            break;
        case VIEW_TYPE.LIST:
            // arrows are always visible when crntview is list
            break;
    }
    
}
function handleArrowClick(){
    leftArrow.addEventListener("click",()=> {
        let crntPage = store.getCrntPage();
        let crntView = store.getCrntView();
        let crntCategory = store.getCrntCategory();
        if (crntView == VIEW_TYPE.LIST) {
            if (crntPage == 0 && crntCategory == 0) { 
                store.setCrntCategory(CATEGORY_LIST.length - 1);
            } else if (crntPage == 0 && crntCategory > 0){ 
                store.setCrntCategory(crntCategory - 1)
            } else {
                store.setCrntPage(crntPage-1);
            }
        } else {
            store.setCrntPage(crntPage-1);
        }
        
    })
    rightArrow.addEventListener("click",() => {
        let crntPage = store.getCrntPage();
        let crntView = store.getCrntView();
        let crntCategory = store.getCrntCategory();
        if (crntView == VIEW_TYPE.LIST) {
            const numOfPages = listViewData.filter(data => data.category == CATEGORY_LIST[crntCategory]).length;
            if (crntPage >= numOfPages - 1 && crntCategory >= CATEGORY_LIST.length - 1){ // last page of the last category
                store.setCrntCategory(0); 
            } else if (crntPage >= numOfPages - 1 && crntCategory < CATEGORY_LIST.length - 1) { // last page of a category
                store.setCrntCategory(crntCategory + 1);
            } else {
                store.setCrntPage(crntPage + 1);
            }
        } else {
            store.setCrntPage(crntPage + 1);
        }

    })
    
}

export {removeArrow,drawArrow, handleArrowClick}