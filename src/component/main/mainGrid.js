import { shuffled_data } from "../../../data/shuffled_data.js";
import NewsData from "../../store/NewsStore.js";
import State from "../../store/StateStore.js";
import Store from "../../store/SubscribeStore.js";
import { AllState } from "../../store/viewStore.js";
import { getState, setState } from "../../observer/observer.js";
import { addModalClickEvent, makeModal } from "../common/Alert.js";
import { makeSnackBar } from "../common/snackBar.js";

let COUNT_PER_PAGE;
let isAll;
let currentPage;
let pressData;
let timeout;


function addSubscribeBtn({target}){
    let id = target.previousSibling.className;
    const modal = document.querySelector(".alert-container");
    const snackbar = document.querySelector(".snackbar");
    const pressSpan = document.querySelector(".display-bold16");

    if(Store.getSubscribeByID(id)){
        let selectedPress = Store.getSubscribeByID(id).name;
        modal.style.display = "flex";
        pressSpan.innerHTML = selectedPress;
    }
    
    else{
        clearTimeout(timeout);
        target.innerText = "해지하기";
        Store.addSubscribe(NewsData.getGridArticleByID(id));
        snackbar.style.display = "flex";
        timeout = setTimeout(() =>{
                snackbar.style.display = "none";
                setState(AllState, false);
        },5000);
    }
}

function logoMouseOver({target}){
    //마우스 오버한 언론사 선택
    let id = target.children[0].className; 
    let subscribeBtn = target.children[1];
    //초기화
    target.children[0].style.display = "none";
    subscribeBtn.style.display = "flex";
    target.style.backgroundColor = "#F5F7F9";

    if(Store.getSubscribeByID(id)){
        subscribeBtn.innerText = "해지하기";
    }   
    else{
        subscribeBtn.innerText = "+구독하기";
    } 

}

function logoMouseOut({target}){
    let subscribeBtn = target.children[1];
    //초기화
    target.children[0].style.display = "flex";
    subscribeBtn.style.display = "none";
    target.style.backgroundColor = "white";
}

function refreshGrid(){
    //화면 초기화
    const mainCenter = document.getElementById("main-center");
    const mainGrid = document.createElement("div");
    mainGrid.id = "main-grid"
    mainCenter.innerHTML = '';
    mainCenter.style.border = '0px';
    mainCenter.appendChild(mainGrid);
    mainGrid.innerHTML='';

    //6*4 칸 생성
    for(let PAGE_INDEX = (currentPage-1) * COUNT_PER_PAGE; PAGE_INDEX < COUNT_PER_PAGE * (currentPage-1) + 24 ; PAGE_INDEX++){
        const outerDiv = document.createElement("div");
        outerDiv.classList.add(`outerDiv${PAGE_INDEX}`);
        mainGrid.append(outerDiv);
    }

    //칸 내부에 이벤트 생성
    pressData.forEach((value, index) => {
        if(index >= (currentPage -1) * COUNT_PER_PAGE && index < (currentPage) * COUNT_PER_PAGE){
            const outerDiv = document.querySelector(`.outerDiv${index}`);
            const newsLogo = document.createElement("img");
            const subscribeBtn = document.createElement("button");

            newsLogo.src = value.logo;
            newsLogo.classList.add(value.id);
            outerDiv.append(newsLogo);

            //버튼 속성 정하기
            subscribeBtn.innerText = "+ 구독하기";
            subscribeBtn.classList.add(`subscribebtn`);

            //마우스 오버시 구독하기/해지하기 
            outerDiv.addEventListener("mouseenter", (e) => logoMouseOver(e));
            outerDiv.addEventListener("mouseleave", (e) => logoMouseOut(e));
            outerDiv.appendChild(subscribeBtn);
            
            subscribeBtn.style.display = "none";
            subscribeBtn.addEventListener("click", (e) => addSubscribeBtn(e));
        }   
    })
}

function setMaxpage(){
    let maxPage
    if(pressData.length % COUNT_PER_PAGE === 0){
        maxPage = parseInt(pressData.length / COUNT_PER_PAGE);
    }
    else{
        maxPage = parseInt(pressData.length / COUNT_PER_PAGE) + 1;
    }
    State.setMaxPage(maxPage);
}

function setData(){
    isAll ? pressData = shuffled_data : pressData = Store.getSubscribe();
}

export default function MainGrid(){
    COUNT_PER_PAGE = State.getCountPerPage();
    isAll = getState(AllState);
    currentPage = State.getCurrentPage();
    setData();
    setMaxpage();
    refreshGrid();
    makeModal();
    makeSnackBar();
    addModalClickEvent();
}