import State from "../state/Reducer.js";
import newsData from "../state/newsData.js";
import main from "../main/main.js";
import controlMinMaxPage from "../utils/controlMinMaxPage.js";

export default function clickLeftAsideButton(){
    //페이지 정보 불러오기
    let currentPage = State.getCurrentPage();
    let categoryNum = State.getCategoryNum();
    let maxCategoryNum = newsData.getListCategory().length - 1;
    let minPage = State.getMinPage();
    let isAll = State.getAllState();
    let isGrid = State.getGridState();

    //leftButton 불러오고 초기화
    const leftAsideButton = document.getElementById("aside-left");
    leftAsideButton.innerHTML = '';

    //button 이미지 삽입
    const asideLeft = document.createElement("img");
    asideLeft.src = "./img/LeftButton.png"
    leftAsideButton.appendChild(asideLeft);

    if(isGrid){
        if(currentPage === minPage){
            leftAsideButton.style.visibility = "hidden";
        }
    }
    else{
        leftAsideButton.style.visibility = "visible";
    }

    //click event 추가
    asideLeft.addEventListener("click",()=>{
        if(!isGrid){
            controlMinMaxPage();
        } 
        else{
            currentPage--;
            State.setCurrentPage(currentPage);
        }
        main();
    });
}
