import { VIEW_TYPE } from "../../asset/data/constants.js";
import { store } from "../../store/store.js";
import { drawGrid } from "../grid-view/grid.js";
import { drawList } from "../list-view/list.js";
import { drawArrow } from "../arrow/arrow.js";

const viewContainer = document.querySelector(".view-section-content")
const listBtn = document.querySelector(".list-btn");
const gridBtn = document.querySelector(".grid-btn");

function changeViewIcons(nextView) {
    if (nextView === VIEW_TYPE.LIST){
        listBtn.src = "../asset/icons/list-view-active.png"
        gridBtn.src = "../asset/icons/grid-view.png"
    } else if (nextView === VIEW_TYPE.GRID){
        listBtn.src = "../asset/icons/list-view.png";
        gridBtn.src = "../asset/icons/grid-view-active.png"
    }
}
function toggleViewVisibility(nextView) {
    Array.prototype.forEach.call(viewContainer.children, (view) => {
        if (view.getAttribute("type") == nextView){
            view.classList.remove("hide");
        } else {
            view.classList.add("hide")
        }      
    })
}

function renderView(){
    const {crntPage, crntCategory, crntView, isChangeView} = store.getViewState();
    if (isChangeView){
        // Possible cases :
        // 1. 전체 언론사 또는 내가 구독한 언론사 클릭
        // 2. 리스트뷰 또는 그리드뷰 버튼 클릭
        // 3. 그리드에서 구독하기 클릭해서 구독한 언론사 페이지로 넘어갈 경우
        toggleViewVisibility(crntView);
        changeViewIcons(crntView);
    }
    switch (crntView){
        case VIEW_TYPE.GRID:
            drawGrid(crntPage);
            break;
        case VIEW_TYPE.LIST:
            drawList(crntCategory);
            break;
    }
}

export {renderView}