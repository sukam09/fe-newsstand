import { shuffled_data } from "../../data/shuffled_data.js";
import articleState from "../state/articleState.js";

const COUNT_PER_PAGE = 24;
let press;

function addSubscribeBtn(e){
    const subscribedData = articleState.getSubscribe();
    const subscribeBtn = document.createElement("button");

    if(subscribedData.indexOf(shuffled_data[press]) >= 0){
        subscribeBtn.innerText = "해지하기";
    }
    else{
        subscribeBtn.innerText = "+ 구독하기";
    }

    subscribeBtn.classList.add("gridSubscribeBtn");

    subscribeBtn.addEventListener("click", (e) => {
        if(subscribedData.indexOf(shuffled_data[press]) >= 0){
            e.target.innerText = "+ 구독하기";
            articleState.removeSubscribe(shuffled_data[press]);
        }
        else{
            e.target.innerText = "해지하기";
            articleState.addSubscribe(shuffled_data[press]);
        }
    });
    e.target.appendChild(subscribeBtn);
}

function logoMouseOver(e){
    //마우스 오버한 언론사 선택
    press = e.target.children[0].className;

    //초기화
    e.target.innerHTML = "";
    e.target.style.backgroundColor = "#F5F7F9";

    addSubscribeBtn(e);
}

function logoMouseOut(e){
    e.target.innerHTML = "";
    e.target.style.backgroundColor = "white";

    const newsLogo = document.createElement("img");
    newsLogo.src = `${shuffled_data[press].logo}`;
    newsLogo.classList.add(press);

    e.target.appendChild(newsLogo);
}

function refreshGrid(isAll, currentPageNumber){
    let pressData;
    isAll === "all" ? pressData = shuffled_data : pressData = articleState.getSubscribe();

    const mainCenter = document.getElementById("main-center");
    const mainGrid = document.createElement("div");
    mainGrid.id = "main-grid"
    mainCenter.innerHTML = '';
    mainCenter.style.border = '0px';
    mainCenter.appendChild(mainGrid);
    mainGrid.innerHTML='';

    for(let PAGE_INDEX = (currentPageNumber-1) * COUNT_PER_PAGE; PAGE_INDEX < COUNT_PER_PAGE * (currentPageNumber-1) + 24 ; PAGE_INDEX++){
        const outerDiv = document.createElement("div");
        outerDiv.classList.add(`outerDiv${PAGE_INDEX}`);
        mainGrid.append(outerDiv);
    }

    pressData.forEach((value, index) => {
        if(index >= (currentPageNumber -1) * COUNT_PER_PAGE && index < (currentPageNumber) * COUNT_PER_PAGE){
            const outerDiv = document.querySelector(`.outerDiv${index}`);
            const newsLogo = document.createElement("img");
            newsLogo.src = `${value.logo}`;
            newsLogo.classList.add(index);
            outerDiv.append(newsLogo);

            //마우스 오버시 구독하기/해지하기 
            outerDiv.addEventListener("mouseenter", (e) => logoMouseOver(e));
            outerDiv.addEventListener("mouseleave", (e) => logoMouseOut(e));
        }   
    })
}

export default function MainGrid(isAll, currentPageNumber){
    refreshGrid(isAll, currentPageNumber);
}