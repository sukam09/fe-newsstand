import { shuffled_data } from "../../data/shuffled_data.js";
import gridArticle from "../../data/grid_article.json" assert { type: "json"};
import NewsData from "../state/NewsData.js";
import State from "../state/Reducer.js";
import Store from "../state/Store.js";

let COUNT_PER_PAGE;
let press;
let isAll;
let currentPage;
let pressData;
const subscribeBtn = document.createElement("button");
let subscribeData;

function addSubscribeBtn(e){
    subscribeBtn.addEventListener("click", (e) => {
        if(Store.findSubscribe(press)){
            e.target.innerText = "+ 구독하기";
            Store.removeSubscribe(Store.findSubscribe(press));
        }
        else{
            e.target.innerText = "해지하기";
            Store.addSubscribe(Store.findSubscribe(press));
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

    if(Store.findSubscribe(press)){
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
    const newsLogo = document.createElement("img");
    newsLogo.src = selectedpress.logo;
    newsLogo.classList.add(press);

    e.target.appendChild(newsLogo);
}

function refreshGrid(){
    isAll === true ? pressData = shuffled_data : pressData = Store.getSubscribe();

    const mainCenter = document.getElementById("main-center");
    const mainGrid = document.createElement("div");
    mainGrid.id = "main-grid"
    mainCenter.innerHTML = '';
    mainCenter.style.border = '0px';
    mainCenter.appendChild(mainGrid);
    mainGrid.innerHTML='';

    for(let PAGE_INDEX = (currentPage-1) * COUNT_PER_PAGE; PAGE_INDEX < COUNT_PER_PAGE * (currentPage-1) + 24 ; PAGE_INDEX++){
        const outerDiv = document.createElement("div");
        outerDiv.classList.add(`outerDiv${PAGE_INDEX}`);
        mainGrid.append(outerDiv);
    }

    pressData.forEach((value, index) => {
        if(index >= (currentPage -1) * COUNT_PER_PAGE && index < (currentPage) * COUNT_PER_PAGE){
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

export default function MainGrid(){
   COUNT_PER_PAGE = State.getCountPerPage();
    isAll = State.getAllState();
    currentPage = State.getCurrentPage();
    subscribeData = Store.getSubscribe();
    refreshGrid();
}