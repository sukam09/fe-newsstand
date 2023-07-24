import State from "../store/StateStore.js";
import renderMain from "./renderMain.js";
import controlListlMinMaxException from "../utils/controlListlMinMaxException.js";

export default function clickLeftAsideButton(){
    //페이지 정보 불러오기
    let currentPage = State.getCurrentPage();
    let isAll = State.getAllState();
    let isGrid = State.getGridState();
    const MIN_PAGE_NUMBER = State.getMinPage();

    //leftButton 불러오고 초기화
    const leftAsideButton = document.getElementById("aside-left");
    leftAsideButton.innerHTML = '';

    //button 이미지 삽입
    const asideLeft = document.createElement("img");
    asideLeft.src = "./img/LeftButton.png"
    leftAsideButton.appendChild(asideLeft);

    if(isGrid){
        if(currentPage === MIN_PAGE_NUMBER){
            leftAsideButton.style.visibility = "hidden";
        }
        else{
            leftAsideButton.style.visibility = "visible";
        }
    }
    else{
        leftAsideButton.style.visibility = "visible";
    }

    //click event 추가
    asideLeft.addEventListener("click",()=>{
        if(isGrid){
            currentPage--;
            State.setCurrentPage(currentPage);
        } 
        else{
            currentPage--;
            State.setCurrentPage(currentPage);
            controlListlMinMaxException();
        }
        renderMain();
    });
}
