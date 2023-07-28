import State from "../../store/StateStore.js";
import renderMain from "./renderMain.js";
import controlListlMinMaxException from "../../utils/controlListlMinMaxException.js";
import { getState } from "../../observer/observer.js";
import { GridState } from "../../store/viewStore.js";

export default function clickLeftAsideButton(){
    //페이지 정보 불러오기
    let currentPage = State.getCurrentPage();
    const MIN_PAGE_NUMBER = State.getMinPage();
    
    //leftButton 불러오고 초기화
    const leftAsideButton = document.getElementById("aside-left");
    leftAsideButton.innerHTML = '';

    //button 이미지 삽입
    const asideLeft = document.createElement("img");
    asideLeft.src = "./img/LeftButton.png"
    leftAsideButton.appendChild(asideLeft);

    if(getState(GridState)){
        currentPage <= MIN_PAGE_NUMBER ? leftAsideButton.style.visibility = "hidden" : leftAsideButton.style.visibility = "visible";
    }
    else{ 
        leftAsideButton.style.visibility = "visible";
    }

    //click event 추가
    asideLeft.addEventListener("click",()=>{
        if(getState(GridState)){
            State.setCurrentPage(--currentPage);
        } 
        else{
            State.setCurrentPage(--currentPage);
            controlListlMinMaxException();
        }
        renderMain();
    });
}
