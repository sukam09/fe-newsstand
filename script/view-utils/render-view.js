import { VIEW_TYPE } from "../../asset/data/constants.js";
import { store } from "../../store/store.js";
import { drawGrid } from "../grid-view/grid.js";
import { drawList } from "../list-view/list.js";

const viewContainer = document.querySelector(".view-section-content")

function toggleView() {
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
    const {crntPage, crntCategory, crntView} = store.getViewState();
    switch (crntView){
        case VIEW_TYPE.GRID:
            drawGrid(crntPage);
            break;
        case VIEW_TYPE.LIST:
            drawList(crntCategory);
            break;
    }
}

export {renderView, toggleView}