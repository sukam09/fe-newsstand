import State from "../state/Reducer.js";
import newsData from "../state/newsData.js";

export default function clickLeftAsideButton(){
    //페이지 정보 불러오기
    let currentPage = State.getCurrentPage();
    let categoryNum = State.getCategoryNum();
    let maxCategoryNum = newsData.getListCategory().length - 1;
    let minPage = State.getMinPage();
    let isAll = State.getAllState();
    let isGrid = State.getGridState();

    console.group(newsData.getCategoryMaxPage(categoryNum));

    //leftButton 불러오고 초기화
    const leftAsideButton = document.getElementById("aside-left");
    leftAsideButton.innerHTML = '';

    //button 이미지 삽입
    const asideLeft = document.createElement("img");
    asideLeft.src = "./img/LeftButton.png"
    leftAsideButton.appendChild(asideLeft);

    //첫 번째 페이지에서 왼쪽 버튼 숨김
    if(currentPage === minPage){
        leftAsideButton.style.visibility = "hidden";
    }

    //click event 추가
    asideLeft.addEventListener("click",()=>{
        if(currentPage === minPage){
            if(categoryNum === 0){
                categoryNum = maxCategoryNum;
            }
            else{
                categoryNum--;
            }
            State.setCategoryNum(categoryNum);
            currentPage = newsData.getCategoryMaxPage(categoryNum);
            State.setCurrentPage(currentPage);
        }
        else{
            currentPage--;
            State.setCurrentPage(currentPage);
        }
        console.log(State.pageState);
    });
}
