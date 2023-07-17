import main from "./main.js";
export default function clickLeftAsideButton(isAll, view, currentPageNum, categoryNum){
    const leftAsideButton = document.getElementById("aside-left");
    const rightAsideButton = document.getElementById("aside-right");

    const asideLeft = document.createElement("img");
    asideLeft.src = "./img/LeftButton.png"
    leftAsideButton.innerHTML = '';
    
    asideLeft.addEventListener("click",()=>{
        currentPageNum--;
        rightAsideButton.style.visibility="visible";
        main(isAll, view, currentPageNum, categoryNum);
    });

    leftAsideButton.appendChild(asideLeft);
}
