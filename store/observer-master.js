import { FILTER_TYPE, VIEW_TYPE } from "../asset/data/constants.js";
import { store } from "./store.js";
import { drawArrow } from "../script/arrow/arrow.js";
import { changeNavIcons, toggleViewVisibility } from "../script/nav/change-view.js";
import { drawEmptySubView } from "../script/view-utils/empty-sub-view.js";
import { drawGrid } from "../script/grid-view/grid.js";
import { drawList } from "../script/list-view/list.js";

async function observer() {
    const {crntView, crntFilter} = store.getViewState();
    const {isChangeView} = store.getFlagState();

    /*
    * Render arrow  
    */
    if (crntView === VIEW_TYPE.LIST && !isChangeView) { 
        // 리스트일 때 화살표 이동하면 화살표 다시 그리지 않음
    } else {
        drawArrow();
    }


    if (isChangeView) {
        // Possible cases :
        // 1. 전체 언론사 또는 내가 구독한 언론사 클릭
        // 2. 리스트뷰 또는 그리드뷰 버튼 클릭
        // 3. 그리드에서 구독하기 클릭해서 구독한 언론사 페이지로 넘어갈 경우
        toggleViewVisibility();
        changeNavIcons();
    }


    /*
    * Render view 
    */
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

export {observer}