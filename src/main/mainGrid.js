import { shuffled_data } from "../../data/shuffled_data.js";
import gridArticle from "../../data/grid_article.json" assert { type: "json"};
import store from "../state/Store.js";

const COUNT_PER_PAGE = 24;
let press;
let allView;
let pressData;
const subscribeBtn = document.createElement("button");
const subscribeData = store.getSubscribe();

function addSubscribeBtn(e){
    subscribeBtn.addEventListener("click", (e) => {
        if(store.findSubscribe(press)){
            e.target.innerText = "+ 구독하기";
            store.removeSubscribe(store.findSubscribe(press));
        }
        else{
            e.target.innerText = "해지하기";
            store.addSubscribe(store.findSubscribe(press));
        }
    });


}

function logoMouseOver(e){
    //마우스 오버한 언론사 선택
    press = e.target.children[0].className; 
    //초기화
    e.target.innerHTML = "";
    e.target.style.backgroundColor = "#F5F7F9";

    subscribeBtn.classList.add("gridSubscribeBtn");

    if(store.findSubscribe(press)){
        subscribeBtn.innerText = "해지하기";
    }
    else{
        subscribeBtn.innerText = "+ 구독하기";
    }
    e.target.appendChild(subscribeBtn);
}

function logoMouseOut(e){
    e.target.innerHTML = "";
    e.target.style.backgroundColor = "white";
    const selectedpress = shuffled_data.find((i) => i.id === parseInt(press));
    console.log(selectedpress);
    const newsLogo = document.createElement("img");
    newsLogo.src = selectedpress.logo;
    newsLogo.classList.add(press);

    e.target.appendChild(newsLogo);
}

function refreshGrid(currentPageNumber){
    allView === "all" ? pressData = shuffled_data : pressData = store.getSubscribe();

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
            newsLogo.src = value.logo;
            newsLogo.classList.add(value.id);
            outerDiv.append(newsLogo);

            //마우스 오버시 구독하기/해지하기 
            outerDiv.addEventListener("mouseenter", (e) => logoMouseOver(e));
            outerDiv.addEventListener("mouseleave", (e) => logoMouseOut(e));

            subscribeBtn.addEventListener("click", (e) => addSubscribeBtn(e));
        }   
    })
}

export default function MainGrid(isAll, currentPageNumber){
    allView = isAll;
    refreshGrid(currentPageNumber);
}