import { store } from "../../store/store.js";
import { checkSubscription } from "../view-utils/check-subscription.js";
import { FILTER_TYPE } from "../../asset/data/constants.js";

const gridContainer = document.querySelector(".grid-box");
const pressCover = document.querySelector(".press-cover");
const emptyView = document.querySelector(".empty-view")

function drawEmptyGrid() {
    gridContainer.classList.add("hide");
    emptyView.classList.remove("hide");
}
function handlePressHover(){
    const pressItems = document.querySelectorAll(".pressItem");
    pressItems.forEach((item)=>{
        if (item.getAttribute("index") !== "undefined") {
            item.addEventListener("mouseover",()=>{
                checkSubscription(item);
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
    gridContainer.innerHTML = "";
    let {crntPage} = store.getViewState()
    let imgIdxList;
    const {crntFilter} = store.getViewState();
    if (crntFilter === FILTER_TYPE.ALL){
        imgIdxList = store.getShuffledList();
    } else if (crntFilter === FILTER_TYPE.SUBSCRIBED){
        imgIdxList = store.getSubList();
        if (store.getSubList().length === 0){
            drawEmptyGrid();
            return;
        }
    }
    if (imgIdxList.length === 0){
        gridContainer.innerHTML += ``
    }
    for (let i=24*crntPage;i<24*(crntPage+1);i++){
        gridContainer.innerHTML += `
            <li class="pressItem" index=${imgIdxList[i]}>
            ${i >= imgIdxList.length ? "" : `<img src="./asset/logo/light/img${imgIdxList[i]}.svg" />` }   
            </li>
        `
        
    }
    handlePressHover();
    
}

export {drawGrid}