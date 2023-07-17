import main from "./main.js";

export default function clickRightAsideButton(isAll, view, currentPageNum, categoryNum){
    const rightAsideButton = document.getElementById("aside-right");
    const leftAsideButton = document.getElementById("aside-left");

    const asideRight = document.createElement("img");
    asideRight.src = "./img/RightButton.png"
    rightAsideButton.innerHTML = '';
    
    asideRight.addEventListener("click",()=>{
        currentPageNum++;
        leftAsideButton.style.visibility="visible";
        main(isAll, view, currentPageNum, categoryNum);
    });

    rightAsideButton.appendChild(asideRight);
}