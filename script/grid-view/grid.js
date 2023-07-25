import { store } from "../../store/store.js";
import { FILTER_TYPE, GRID_ITEMS_PER_PAGE } from "../../asset/data/constants.js";
import { drawEmptySubView } from "../view-utils/empty-sub-view.js";

const gridContainer = document.querySelector(".grid-box");
const pressCover = document.querySelector(".press-cover");
const subBtn = document.querySelector(".sub-btn");
const unsubBtn = document.querySelector(".unsub-btn");


function getGridData() {
    let gridData;
    let {crntFilter} = store.getViewState();
    if (crntFilter === FILTER_TYPE.ALL){
        gridData = store.getShuffledList();
    } else if (crntFilter === FILTER_TYPE.SUBSCRIBED){
        gridData = store.getSubList();
    }
    return gridData
}
function showPressCoverBtn(item){
    let subscribedPress = store.getSubList();
    if (subscribedPress.includes(parseInt(item.getAttribute("index")))){
        subBtn.classList.add("hide");
        unsubBtn.classList.remove("hide");
    } else {
        subBtn.classList.remove("hide");
        unsubBtn.classList.add("hide");
    }
}
function handleGridHover(){
    const pressItems = document.querySelectorAll(".pressItem");
    // gridContainer.addEventListener("mouseover",(event)=>{
    //     console.log(event.target);
    // })
    pressItems.forEach((item)=>{
        if (item.getAttribute("index") !== "undefined") {
            item.addEventListener("mouseover",()=>{
                showPressCoverBtn(item);
                pressCover.classList.remove("hidden");
                item.appendChild(pressCover);
            })
        }
    })
    gridContainer.addEventListener("mouseout", () => {
        pressCover.classList.add("hidden");
    })
}
function drawGrid(){
    let {crntPage} = store.getViewState()
    let imgIdxList = getGridData();
    gridContainer.innerHTML = "";
    for (let i=GRID_ITEMS_PER_PAGE*crntPage;i<GRID_ITEMS_PER_PAGE*(crntPage+1);i++){
        gridContainer.innerHTML += `
            <li class="pressItem" index=${imgIdxList[i]}>
            ${i >= imgIdxList.length ? "" : `<img src="./asset/logo/light/img${imgIdxList[i]}.svg" />` }   
            </li>
        `      
    }
    handleGridHover();    
}

export {drawGrid}