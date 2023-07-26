import { FILTER_TYPE, VIEW_TYPE } from "../../asset/data/constants.js";
import { store } from "../../store/store.js";
import { drawGrid } from "../grid-view/grid.js";
import { drawList } from "../list-view/list.js";
import { drawEmptySubView } from "./empty-sub-view.js";

function renderView(){
    const {crntView, crntFilter} = store.getViewState();
    if (crntFilter === FILTER_TYPE.SUBSCRIBED && store.getSubList().length === 0){ 
        // 구독한 언론사 없음 페이지
        drawEmptySubView();
        return;
    }
    switch (crntView){
        case VIEW_TYPE.GRID:
            drawGrid();
            break;
        case VIEW_TYPE.LIST:
            drawList();
            break;
    }
}

export {renderView}