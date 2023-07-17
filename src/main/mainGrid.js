import { shuffled_data } from "../../data/shuffled_data.js";

const COUNT_PER_PAGE = 24;
const logoAll = shuffled_data;
let press;

function logoMouseOver(e){
    press = e.target.children[0].className;
    console.log(press);
    e.target.innerHTML = "";
    e.target.style.backgroundColor = "#F5F7F9";
    const subscribeBtn = document.createElement("button");
    subscribeBtn.innerText = "구독하기";
    subscribeBtn.classList.add("gridSubscribeBtn");
    // subscribeBtn.addEventListener("click", );
    if(press % 24 >= 18 && press % 24 <= 23){
        e.target.style.borderBottom = "1px solid black";
    }
    if(press % 6 === 5){
        e.target.style.borderRight = "1px solid black";
    }
    e.target.appendChild(subscribeBtn);
}

function logoMouseOut(e){
    e.target.innerHTML = "";
    e.target.style.backgroundColor = "white";
    const newsLogo = document.createElement("img");
    newsLogo.src = `${shuffled_data[press].logo}`;
    newsLogo.classList.add(press);
    if(press % 24 >= 18 && press % 24 <= 23){
        e.target.style.borderBottom = "1px solid black";
    }
    if(press % 6 === 5){
        e.target.style.borderRight = "1px solid black";
    }
    e.target.appendChild(newsLogo);
}

function refreshGrid(currentPageNumber){
    const mainCenter = document.getElementById("main-center");
    const mainGrid = document.createElement("div");
    mainGrid.id = "main-grid"
    mainCenter.innerHTML = '';
    mainCenter.style.border = '0px';
    mainCenter.appendChild(mainGrid);
    mainGrid.innerHTML='';
    mainGrid.style.borderBottom = "1px solid black";
    mainGrid.style.borderRight = "1px solid black";

    for(let PAGE_INDEX = (currentPageNumber-1) * COUNT_PER_PAGE; PAGE_INDEX < COUNT_PER_PAGE * (currentPageNumber-1) + 24 ; PAGE_INDEX++){
        const outerDiv = document.createElement("div");
        const newsLogo = document.createElement("img");
        newsLogo.src = `${shuffled_data[PAGE_INDEX].logo}`;
        newsLogo.classList.add(PAGE_INDEX);
        outerDiv.append(newsLogo);
        mainGrid.append(outerDiv);
        
        //마우스 오버시 구독하기/해지하기 
        outerDiv.addEventListener("mouseenter", (e) => logoMouseOver(e));
        outerDiv.addEventListener("mouseleave", (e) => logoMouseOut(e));
    }



}
export default function MainGrid(isAll, currentPageNumber){
    refreshGrid(currentPageNumber);
}