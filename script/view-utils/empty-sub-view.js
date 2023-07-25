import { VIEW_TYPE } from "../../asset/data/constants.js";
import { store } from "../../store/store.js";

const gridContainer = document.querySelector(".grid-box");
const listContainer = document.querySelector(".list-box")
const emptyView = document.querySelector(".empty-view");

function drawEmptySubView() {
    const {crntView} = store.getViewState();
    switch (crntView){
        case VIEW_TYPE.GRID:
            gridContainer.classList.add("hide");
            break;
        case VIEW_TYPE.LIST:
            listContainer.classList.add("hide");
            break;
    }
    emptyView.classList.remove("hide");
}

export {drawEmptySubView}