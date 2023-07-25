import { store } from "../../store/store.js";

const viewChangeBtns = document.querySelectorAll(".nav-right .btn")

function handleViewChange() {
    viewChangeBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            const nextView = btn.getAttribute("type");
            let {crntView} = store.getViewState();
            if (crntView !== nextView){
                store.setViewState({crntView:nextView, crntPage: 0, crntCategory:0, isChangeView:true})
            }
        })
    })
   
}

export {handleViewChange}