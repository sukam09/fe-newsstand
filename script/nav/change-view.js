import { store } from "../../store/store.js";
import { VIEW_TYPE } from "../../asset/data/constants.js";

const viewChangeBtns = document.querySelectorAll(".nav-right .btn")
const listBtn = document.querySelector(".list-btn");
const gridBtn = document.querySelector(".grid-btn");
const viewContainer = document.querySelector(".view-section-content")


function toggleViewVisibility() {
    const {crntView} = store.getViewState();
    Array.prototype.forEach.call(viewContainer.children, (view) => {
        if (view.getAttribute("type") == crntView){
            view.classList.remove("hide");
        } else {
            view.classList.add("hide")
        }      
    })
}
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
function handleViewChange() {
    viewChangeBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            const nextView = btn.getAttribute("type");
            let {crntView} = store.getViewState();
            if (crntView !== nextView){
                store.setViewState({crntView:nextView, crntPage: 0, crntCategory:0});
                // observer에서 changeNavIcons, toggleNewVisibility 실행됨
            }
        })
    })
   
}

export {handleViewChange, changeNavIcons, toggleViewVisibility}