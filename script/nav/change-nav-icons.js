import { VIEW_TYPE } from "../../asset/data/constants.js";
import { store } from "../../store/store.js";

const listBtn = document.querySelector(".list-btn");
const gridBtn = document.querySelector(".grid-btn");

function changeNavIcons() {
    const {crntView} = store.getViewState();
    if (crntView === VIEW_TYPE.LIST){
        listBtn.src = "../asset/icons/list-view-active.png"
        gridBtn.src = "../asset/icons/grid-view.png"
    } else if (crntView === VIEW_TYPE.GRID){
        listBtn.src = "../asset/icons/list-view.png";
        gridBtn.src = "../asset/icons/grid-view-active.png"
    }
}

export {changeNavIcons}