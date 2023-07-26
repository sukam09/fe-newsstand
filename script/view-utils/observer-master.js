import { store } from "../../store/store.js";
import { drawArrow } from "../arrow/arrow.js";
import { changeNavIcons, toggleViewVisibility } from "../nav/change-view.js";
import { renderView } from "./render-view.js";

function observer() {
    const {isStillList, isChangeView} = store.getViewState();
    if (!isStillList) { // 리스트일 때 화살표 이동 > 화살표 다시 그리지 않음
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
    renderView();
}

export {observer}