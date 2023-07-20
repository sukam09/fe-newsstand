import { VIEW_TYPE } from "../../asset/data/constants.js";
import { store } from "../../store/store.js";

const viewContainer = document.querySelector(".view-section-content")
const viewChangeBtns = document.querySelectorAll(".nav-right .btn")
const listBtn = document.querySelector(".list-btn");
const gridBtn = document.querySelector(".grid-btn");

function changeViewIcons(nextView) {
    if (nextView === VIEW_TYPE.LIST){
        listBtn.src = "../asset/icons/list-view-active.png"
        gridBtn.src = "../asset/icons/grid-view.png"
    } else if (nextView === VIEW_TYPE.GRID){
        listBtn.src = "../asset/icons/list-view.png";
        gridBtn.src = "../asset/icons/grid-view-active.png"
    }
}
function toggleViewVisibility(nextView) {
    Array.prototype.forEach.call(viewContainer.children, (view) => {
        if (view.getAttribute("type") == nextView){
            view.classList.remove("hide");
        } else {
            view.classList.add("hide")
        }      
    })
}
function changeView(nextView) {
    toggleViewVisibility(nextView);
    changeViewIcons(nextView)
    store.setViewState({crntView: nextView, crntPage: 0, crntCategory: 0})
}
function handleViewChange() {
    viewChangeBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            const nextView = btn.getAttribute("type");
            let {crntView} = store.getViewState();
            if (crntView !== nextView){
                changeView(nextView);
            }
        })
    })
   
}

export {handleViewChange, changeView}