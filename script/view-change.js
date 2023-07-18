import { store } from "../store/store.js";

const viewContainer = document.querySelector(".view-section-content")
const viewChangeBtns = document.querySelectorAll(".nav-right .btn")
const listBtn = document.querySelector(".list-btn");
const gridBtn = document.querySelector(".grid-btn");

function changeViewIcons(nextView) {
    if (nextView === "list"){
        listBtn.src = "../asset/icons/list-view-active.png"
        gridBtn.src = "../asset/icons/grid-view.png"
    } else if (nextView === "grid"){
        listBtn.src = "../asset/icons/list-view.png";
        gridBtn.src = "../asset/icons/grid-view-active.png"
    }
}
function listenViewChange() {
    viewChangeBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            const nextView = btn.getAttribute("type");
            let crntView = store.getView();
            if (crntView !== nextView){
                changeViewIcons(nextView)
                crntView = nextView;
                store.setView(nextView)
                store.setPage(0);
                store.setCategory(0);
                Array.prototype.forEach.call(viewContainer.children, (view) => {
                    if (view.getAttribute("type") == nextView){
                        view.classList.remove("hide");
                    } else {
                        view.classList.add("hide")
                    }      
                })
            }
        })
    })
   
}

export {listenViewChange}