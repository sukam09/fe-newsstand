import { store } from "../../store/store.js";
import { FILTER_TYPE, GRID_ITEMS_PER_PAGE, URL } from "../../asset/data/constants.js";
import { shuffleArray } from "../../util/shuffleArray.js";
import { handleSubscribe } from "../view-utils/handle-subscribe.js";

const gridContainer = document.querySelector(".grid-box");
const pressCover = document.querySelector(".press-cover");
const subBtn = document.querySelector(".sub-btn");
const unsubBtn = document.querySelector(".unsub-btn");


function getGridData() {
    let gridData;
    const {crntFilter} = store.getViewState();
    if (crntFilter === FILTER_TYPE.ALL){
        gridData = store.getShuffledList();
    } else if (crntFilter === FILTER_TYPE.SUBSCRIBED){
        gridData = store.getSubList();
    }
    return gridData
}
function showPressCoverBtn(item){
    const subscribedPress = store.getSubList();
    if (subscribedPress.includes(parseInt(item.getAttribute("index")))){
        subBtn.classList.add("hide");
        unsubBtn.classList.remove("hide");
    } else {
        subBtn.classList.remove("hide");
        unsubBtn.classList.add("hide");
    }
}

function handleGridHover(){
    gridContainer.addEventListener("mouseover", ({target}) => {
        if (target.nodeName === "LI" && target.getAttribute("index") !== "undefined"){
            showPressCoverBtn(target);
            pressCover.classList.remove("hidden");
            target.appendChild(pressCover);
        }
    })
    gridContainer.addEventListener("mouseleave", ({target}) => {  
        pressCover.classList.add("hidden");
    })
}

function drawGrid(){
    const {crntPage} = store.getViewState()
    const imgIdxList = getGridData();
    const gridItems = document.querySelectorAll(".pressItem");
    let itemIdx = 0

    // update grid images according to crnt page index
    for (let i=GRID_ITEMS_PER_PAGE*crntPage;i<GRID_ITEMS_PER_PAGE*(crntPage+1);i++){
        gridItems[itemIdx].setAttribute("index", imgIdxList[i]);
        gridItems[itemIdx].innerHTML = i < imgIdxList.length ? `<img src="./asset/logo/light/img${imgIdxList[i]}.svg" />`: "";
        itemIdx++;   
    }

    store.initFlagVar();
}

async function initGrid () {
    const pressData = store.getPressData();
    let pressIdxArray = Array.from({length: pressData.length}, (_,i) => i+1); // create array of consecutive numbers [1...96]
    shuffleArray(pressIdxArray); // shuffle grid only when reloading

    for (let i = 0; i < GRID_ITEMS_PER_PAGE; i++){
        gridContainer.innerHTML += `
            <li class="pressItem"></li>
        `
    }
    drawGrid();
    handleGridHover();  
    handleSubscribe();

}

export {drawGrid, initGrid}