import { FILTER_TYPE, VIEW_TYPE } from "../../asset/data/constants.js";
import { store } from "../../store/store.js";
import { drawGrid } from "../grid-view/grid.js";
import { drawList } from "../list-view/list.js";
import { drawEmptySubView } from "./empty-sub-view.js";

const viewContainer = document.querySelector(".view-section-content")

function toggleViewVisibility() {
    const {crntView} = store.getViewState();
    Array.prototype.forEach.call(viewContainer.children, (view) => {
        if (view.getAttribute("type") == crntView){
            view.classList.remove("hide");
        } else {
            view.classList.add("hide")
        }      
    })
}

function renderView(){
    const {crntPage, crntCategory, crntView, crntFilter} = store.getViewState();
    if (crntFilter === FILTER_TYPE.SUBSCRIBED && store.getSubList().length === 0){ 
        // 구독한 언론사 없음 페이지
        drawEmptySubView();
        return;
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

export {renderView, toggleViewVisibility}