import { listenArrow, updateArrow } from "./arrow.js";
import { drawPress } from "./grid-view.js";
import { drawList } from "./list-view.js";

const viewContainer = document.querySelector(".view-section-content")
const viewChangeBtns = document.querySelectorAll(".nav-right .btn")

function listenViewChange(crntView) {
    viewChangeBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            const nextView = btn.getAttribute("type");
            if (crntView !== nextView){
                crntView = nextView;
                let crntPage = 0;
                let crntListIdx = 0;
                updateArrow(crntView, crntPage); // initialize current page index, category index (if crntView == "list") and arrow
                listenArrow(crntView, crntPage);
                switch (nextView){
                    case "grid":
                        drawPress(crntPage);
                        break;
                    case "list":
                        drawList(crntListIdx);
                        break;
                }
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