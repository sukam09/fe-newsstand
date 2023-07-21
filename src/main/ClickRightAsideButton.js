import State from "../store/StateStore.js";
import renderMain from "./renderMain.js";
import controlListlMinMaxException from "../utils/controlListlMinMaxException.js";

export default function clickRightAsideButton(){
   let currentPage = State.getCurrentPage();
   let isAll = State.getAllState();
   let isGrid = State.getGridState();
   const MAX_PAGE_NUMBER = State.getMaxPage();

    const rightAsideButton = document.getElementById("aside-right");
    const asideRight = document.createElement("img");
    asideRight.src = "./img/RightButton.png"
    rightAsideButton.innerHTML = '';
    
    if(isGrid){
        if(currentPage === MAX_PAGE_NUMBER){
            rightAsideButton.style.visibility = "hidden";
        }
        else{
            rightAsideButton.style.visibility = "visible";
        }
    }
    else{
        rightAsideButton.style.visibility = "visible";
    }

    asideRight.addEventListener("click",()=>{
        if(isGrid){
            currentPage++;
            State.setCurrentPage(currentPage);
        }
        else{
            currentPage++;
            State.setCurrentPage(currentPage);
            controlListlMinMaxException();
        }
        mainNews();
    });

    rightAsideButton.appendChild(asideRight);
}