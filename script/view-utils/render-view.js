import { VIEW_TYPE } from "../../asset/data/constants.js";
import { store } from "../../store/store.js";
import { drawGrid } from "../grid-view/grid-view.js";
import { drawList } from "../list-view/list-view.js";
import { drawArrow } from "./arrow.js";

function renderView(){
    switch (store.getViewState().crntView){
        case VIEW_TYPE.GRID:
            drawGrid(store.getViewState().crntPage);
            break;
        case VIEW_TYPE.LIST:
            drawList(store.getViewState().crntCategory);
            break;
    }
    drawArrow();
}

export {renderView}