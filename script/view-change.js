import { listenArrow, updateArrow } from "./arrow.js";
import { drawPress } from "./grid-view.js";
import { drawList } from "./list-view.js";

const viewContainer = document.querySelector(".view-section-content")

let crntView = "grid";

function listenViewChange(btn, type) {
    btn.addEventListener("click", () => {
        if (crntView !== type){
            crntView = type;
            let crntPage = 0;
            let crntListIdx = 0;
            updateArrow(crntView, crntPage); // initialize current page index, category index (if crntView == "list") and arrow
            listenArrow(crntView, crntPage);
            switch (type){
                case "grid":
                    drawPress(crntPage);
                    break;
                case "list":
                    drawList(crntListIdx);
                    break;
            }
            Array.prototype.forEach.call(viewContainer.children, (view) => {
                if (view.getAttribute("type") == type){
                    view.classList.remove("hide");
                } else {
                    view.classList.add("hide")
                }      
            })
        }
    })
}

export {listenViewChange}