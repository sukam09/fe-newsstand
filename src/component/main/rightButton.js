import State from "../../store/StateStore.js";
import renderMain from "./renderMain.js";
import controlListlMinMaxException from "../../utils/controlListlMinMaxException.js";

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
        currentPage === MAX_PAGE_NUMBER ? rightAsideButton.style.visibility = "hidden" : rightAsideButton.style.visibility = "visible";
    }
    else{
        rightAsideButton.style.visibility = "visible";
    }

    asideRight.addEventListener("click",()=>{
        if(isGrid){
            State.setCurrentPage(++currentPage);
        }
        else{
            State.setCurrentPage(++currentPage);
            controlListlMinMaxException();
        }
        renderMain();
    });

    rightAsideButton.appendChild(asideRight);
}