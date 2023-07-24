import { VIEW_TYPE } from "../../asset/data/constants.js";
import { store } from "../../store/store.js";
import { drawGrid } from "../grid-view/grid.js";
import { drawList } from "../list-view/list.js";
import { drawArrow } from "../arrow/arrow.js";

function renderView(){
    switch (store.getViewState().crntView){
        case VIEW_TYPE.GRID:
            drawGrid(store.getViewState().crntPage);
            break;
        case VIEW_TYPE.LIST:
            drawList(store.getViewState().crntCategory);
            break;
    }
}

export {renderView}