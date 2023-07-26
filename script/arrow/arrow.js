import pressList from "../../asset/data/pressList.js"
import { store } from "../../store/store.js";
import { FILTER_TYPE, GRID_ITEMS_PER_PAGE, VIEW_TYPE } from "../../asset/data/constants.js";
import { filterData } from "../view-utils/filter-data.js";

const leftArrow = document.querySelector(".arrow-left");
const rightArrow = document.querySelector(".arrow-right");

function getArrowData(crntFilter) {
    let data;
    if (crntFilter === FILTER_TYPE.ALL){
        data = pressList;
    } else if (crntFilter === FILTER_TYPE.SUBSCRIBED){
        data = store.getSubList();
    }
    return data;
}

function drawArrow(){
    let {crntPage, crntView, crntFilter} = store.getViewState();
    let dataInfo = getArrowData(crntFilter);
    
    // subscription list empty > hide all arrows
    leftArrow.classList.add("hidden");
    if (crntFilter === FILTER_TYPE.SUBSCRIBED && dataInfo.length === 0){ 
        rightArrow.classList.add("hidden");
        return;
    }

    let maxPage;
    leftArrow.classList.remove("hidden");
    rightArrow.classList.remove("hidden");

    switch (crntView){
        case VIEW_TYPE.GRID:
            maxPage = Math.ceil(dataInfo.length/GRID_ITEMS_PER_PAGE);
            if (crntPage == 0){
                leftArrow.classList.add("hidden");
            } 
            if (crntPage == maxPage-1){
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
        let {crntPage, crntView, crntCategory} = store.getViewState();
        if (crntView == VIEW_TYPE.LIST) {
            const {navData} = filterData();
            if (crntPage == 0 && crntCategory == 0) { 
                // first page of first category
                store.setViewState({crntCategory: navData.length - 1, crntPage : 0});
            } else if (crntPage == 0 && crntCategory > 0){ 
                // first page of category
                store.setViewState({crntCategory: crntCategory - 1, crntPage: 0})
            } else {
                store.setViewState({crntPage: crntPage-1});
            }
        } else { // crntView == VIEW_TYPE.GRID
            store.setViewState({crntPage: crntPage-1});
        }
        
    })
    rightArrow.addEventListener("click",() => {
        let {crntPage, crntView, crntCategory} = store.getViewState();
        if (crntView == VIEW_TYPE.LIST) {
            const {navData, numOfListPages} = filterData();
            if (crntPage >= numOfListPages - 1 && crntCategory >= navData.length - 1){ 
                // last page of the last category
                store.setViewState({crntCategory: 0, crntPage : 0});
            } else if (crntPage >= numOfListPages - 1 && crntCategory < navData.length - 1) { 
                // last page of category
                store.setViewState({crntCategory: crntCategory + 1, crntPage : 0});
            } else {
                store.setViewState({crntPage: crntPage + 1});
            }
        } else { // crntView == VIEW_TYPE.GRID
            store.setViewState({crntPage: crntPage + 1});
        }
    })
}

function initArrow() {
    drawArrow();
    handleArrowClick();
}

export {drawArrow, initArrow}