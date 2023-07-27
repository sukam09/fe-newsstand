import renderMain from "./renderMain.js";
import State from "../../store/StateStore.js";
import NewsData from "../../store/NewsStore.js";
import Store from "../../store/SubscribeStore.js"
import { AllState } from "../../store/viewStore.js";
import { getState, setState } from "../../observer/observer.js";
import controListlMinMaxException from "../../utils/controlListlMinMaxException.js";
import { addModalClickEvent, makeModal } from "../common/Alert.js";
import { makeSnackBar } from "../common/snackBar.js";

const PROGRESS_DURATION = 20000;
const COLOR_IN_PROGRESS = "#4362d0";
const COLOR_PROGRESS_BACKGROUND = "#7890e7";
let currentPage;
let categoryNum;
let isAll;
let listArticle;
let pageMAX;
let categoryMAX;
let interval;

function makeCategory(){
    const mainCenter = document.getElementById("main-center");
    const categoryBarNav = document.createElement("nav");
    const newCategroy = document.createElement("ul");
    
    categoryBarNav.style.width = 930 + 'px';
    newCategroy.classList.add("categoryBar");
    
    mainCenter.appendChild(categoryBarNav);
    categoryBarNav.appendChild(newCategroy);

    if(isAll){
        listArticle.forEach((value, index) =>{
            const list = document.createElement("li");
            list.id = value[0];
            
            if(index === categoryNum){
                const progress = document.createElement("div");
                const pageinfo = document.createElement("div");
                progress.classList.add("selectedprogress");
                pageinfo.classList.add("pageinfo");
                newCategroy.appendChild(progress);
                list.classList.add("selected");
                list.innerHTML = value[0];
                if(isAll){
                    pageinfo.innerHTML += currentPage + "/" + pageMAX; 
                }
                else{
                    pageinfo.innerHTML = ">"
                }
                progress.appendChild(list);
                progress.appendChild(pageinfo);
            }
            else{
                list.innerHTML = value[0]; 
                newCategroy.appendChild(list);   
            }
        })
    }

   else{
    listArticle.forEach((value, index) => {
        const list = document.createElement("li");
        list.id = setID(value);
        let id = setID(value);
        if(index === categoryNum){
            const progress = document.createElement("div");
            const pageinfo = document.createElement("div");
            progress.classList.add("selectedprogress");
            pageinfo.classList.add("pageinfo");
            newCategroy.appendChild(progress);
            list.classList.add("selected");
            list.innerHTML = id;
            if(isAll){
                pageinfo.innerHTML += currentPage + "/" + pageMAX; 
            }
            else{
                let arrowimg = document.createElement("img");
                arrowimg.src = "./img/smallArrow.svg";
                pageinfo.appendChild(arrowimg);
            }
            progress.appendChild(list);
            progress.appendChild(pageinfo);
        }
        else{
            list.innerHTML = id; 
            newCategroy.appendChild(list);   
        }
    })
   }
}

function addCategoryOnclick(){
    document.querySelector(`#main-center ul`).childNodes.forEach((value, index)=>{
        value.addEventListener("click", ({target}) => {
            listArticle.forEach((value, index)=> {
                let id = setID(value);
                if(target.innerHTML === id){
                    State.setCurrentPage(1);
                    State.setMaxPage(listArticle[index % categoryMAX].length - 1);
                    State.setCategoryNum(index);
                    renderMain();
                }   
            })
        });
    })
}

function  makeSubscribeButton(){
    const ListHeader = document.querySelector(`.listHeader`);
    const subscribeBtn = document.createElement("button");
    subscribeBtn.classList.add("subscribebtn");
    const modal = document.querySelector(".alert-container");
    const pressSpan = document.querySelector(".display-bold16");
    const snackbar = document.querySelector(".snackbar");
    
    let categoryNum = State.getCategoryNum();
    let articleInfo;
    let timeout;

    if(isAll){
        articleInfo = listArticle[categoryNum][currentPage];
    }
    else{
        articleInfo = listArticle[categoryNum];
    }

    if(isAll){
        if(Store.getSubscribeByID(articleInfo.id)){
            subscribeBtn.innerText = "해지하기";
        }
        else{
            subscribeBtn.innerText = "+ 구독하기";
        } 
    }
    else{
        subscribeBtn.innerText = "x";
    }
    ListHeader.appendChild(subscribeBtn);

    subscribeBtn.addEventListener("click", ()=>{
        if(Store.getSubscribeByID(articleInfo.id)){
            let selectedPress = Store.getSubscribeByID(articleInfo.id).name;
            modal.style.display = "flex";
            pressSpan.innerHTML = selectedPress;
        }
        else{
            clearTimeout(timeout);
            snackbar.style.display = "flex";
            timeout = setTimeout(() =>{
                    snackbar.style.display = "none";
                    Store.addSubscribe(articleInfo);
                    setState(AllState, false);
            },5000);
        } 
    })
}

function viewArticle(){
    let articleInfo;
    if(isAll){
        articleInfo = listArticle[categoryNum][currentPage];
    }
    else{
        articleInfo = listArticle[categoryNum];
    }

    const mainCenter = document.getElementById("main-center");
    const mainList   = document.createElement("div");
    const ListHeader = document.createElement("div"); 
    const brandmark = document.createElement("img"); 
    const lastEditDate = document.createElement("div"); 
    const article = document.createElement("div");
    const articleMain = document.createElement("div");
    const mainImgFrame = document.createElement("div");
    const mainImg = document.createElement("img");
    const mainArticle = document.createElement("div");
    const articleList = document.createElement("div");

    mainCenter.style.border = "1px solid #D2DAE0";
    mainCenter.style.width = 930 + 'px';

    mainList.style.paddingLeft = 20 + 'px';
    mainList.style.paddingBottom = 20 + 'px';
    
    ListHeader.classList.add("listHeader");

    brandmark.src = articleInfo.logo;
    lastEditDate.innerHTML = articleInfo.editTime;  
    lastEditDate.style.marginLeft = 20 + 'px';

    article.classList.add("article");
    
    // 기사 추가
    articleMain.classList.add("articleMain");
    articleMain.style.marginRight = 30 + 'px'

    mainImgFrame.classList.add("mainImgFrame");
    mainImg.src = articleInfo.mainArticle.thumbnail;
    mainImg.classList.add("mainImg");

    mainArticle.innerHTML = articleInfo.mainArticle.title;
    mainArticle.style.marginTop = 16 + 'px';
    mainArticle.style.fontSize = 16 + 'px';
    
    articleList.classList.add("articleList");

    articleInfo.subArticles.forEach((value)=>{
        const articleText = document.createElement("div");
        articleText.classList.add("articleText");
        articleText.innerHTML = value.title;
        articleText.style.marginBottom = 18 + 'px';
        articleText.style.fontSize = 17 + 'px';
        //overflow 관리 필요
        articleList.appendChild(articleText);
    })


    //편집 가이드 추가
    const editGuide = document.createElement("div");
    // editGuide.innerHTML = articleInfo.subArticles.editGuide;
    editGuide.style.fontSize = 14 + 'px';
    editGuide.style.color = "#879298";

    articleList.appendChild(editGuide); 

    mainCenter.appendChild(mainList);

    mainList.appendChild(ListHeader);
    mainList.appendChild(article);  

    ListHeader.appendChild(brandmark);
    ListHeader.appendChild(lastEditDate);

    article.appendChild(articleMain);
    article.appendChild(articleList);

    articleMain.appendChild(mainImgFrame);
    mainImgFrame.appendChild(mainImg);
    articleMain.appendChild(mainArticle);
}

function progress(){
    clearInterval(interval);

    const activeCategory = document.querySelector(".selectedprogress");
    let progress = 0;
    const increment = 100 / (PROGRESS_DURATION / 16);

    interval = setInterval(() => {
        if (progress < 100) {
            activeCategory.style.background = `linear-gradient(to right, 
                                                ${COLOR_IN_PROGRESS} ${progress}%, 
                                                ${COLOR_PROGRESS_BACKGROUND} 0%)`;
            progress += increment;
        } else {
            State.setCurrentPage(++currentPage);
            controListlMinMaxException();
            clearInterval(interval);
            renderMain();
        }
    }, 5);
}

function setData(){
    if(isAll){
        listArticle = NewsData.getListArticle();
        pageMAX = NewsData.getListArticle()[categoryNum].length - 1;
        categoryMAX = NewsData.getListArticle().length;
        State.setMaxCategoryNum(categoryMAX - 1);
    }
    else{
        Store.makeSubscribeCategory();
        listArticle = Store.getSubscribe();
        pageMAX = 1;
        categoryMAX = listArticle.length;
        State.setMaxPage(1);    
        State.setMaxCategoryNum(categoryMAX - 1);
    }
}

function showList(){
    if(listArticle.length <= 0 ){
        alert("구독한 언론사가 없습니다.");
    }  
    else{
        makeCategory();
        progress();
        addCategoryOnclick();
        viewArticle();
        makeSubscribeButton();
    } 
}

function setID(value){
    let id;
    if(isAll){
        id = value[0];
    }
    else{
        id = value.name;
    }
    return id;
}

export default function MainList(){
    const mainCenter = document.getElementById("main-center");
    mainCenter.innerHTML='';
    mainCenter.style.border = 'none';
    currentPage = State.getCurrentPage();
    categoryNum = State.getCategoryNum();
    isAll = getState(AllState);    

    setData();
    makeModal();
    makeSnackBar();
    showList();
    addModalClickEvent();
}
