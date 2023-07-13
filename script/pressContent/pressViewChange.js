import { getElemId, getElemClass } from "../../utils/js/getElements.js";

function pressViewChange() {
    const pressListView = getElemId(document, 'pressbar-icon-list-view');
    const pressGridView = getElemId(document, 'pressbar-icon-grid-view');

    pressListView.addEventListener('click', () => {
        pressListView.childNodes[1].setAttribute("fill", "#4362D0");
        pressGridView.childNodes[1].setAttribute("fill", "#879298");
        showPressView("list");
    });

    pressGridView.addEventListener('click', () => {
        pressListView.childNodes[1].setAttribute("fill", "#879298");
        pressGridView.childNodes[1].setAttribute("fill", "#4362D0");
        showPressView("grid");
    });
}

function showPressView(status) {
    const pressContentContainer = getElemClass(document, "press-content-view");
    const pressContentListView = getElemClass(document, "press-content-list-view");

    pressContentContainer[0].style.display = (status=="grid") ? "grid" : "none";
    pressContentListView[0].style.display = (status=="list") ? "block" : "none";
    
}
export {pressViewChange};
