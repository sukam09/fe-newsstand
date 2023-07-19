import { VIEW_TYPE } from "../asset/data/constants.js";
import { store } from "../store/store.js";

const viewContainer = document.querySelector(".view-section-content")
const viewChangeBtns = document.querySelectorAll(".nav-right .btn")
const listBtn = document.querySelector(".list-btn");
const gridBtn = document.querySelector(".grid-btn");

function changeViewIcons() {
    const crntView = store.getCrntView();
    if (crntView === VIEW_TYPE.LIST){
        listBtn.src = "../asset/icons/list-view-active.png"
        gridBtn.src = "../asset/icons/grid-view.png"
    } else if (crntView === VIEW_TYPE.GRID){
        listBtn.src = "../asset/icons/list-view.png";
        gridBtn.src = "../asset/icons/grid-view-active.png"
    }
}
function toggleViewVisibility() {
    const nextView = store.getCrntView();
    Array.prototype.forEach.call(viewContainer.children, (view) => {
        if (view.getAttribute("type") == nextView){
            view.classList.remove("hide");
        } else {
            view.classList.add("hide")
        }      
    })
}
function changeView(nextView) {
    store.setCrntView(nextView)
    changeViewIcons()
    toggleViewVisibility();
}
function handleViewChange() {
    viewChangeBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            const nextView = btn.getAttribute("type");
            let crntView = store.getCrntView();
            if (crntView !== nextView){
                changeView(nextView)
            }
        })
    })
   
}

export {handleViewChange, changeView}