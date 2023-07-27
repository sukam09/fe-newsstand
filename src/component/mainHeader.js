import renderMain from "./main/renderMain.js";
import State from "../store/StateStore.js";
import changeImageSrc from "../utils/changeImageSrc.js";
import newsData from "../store/NewsStore.js";
import { setState, subscribe } from "../observer/observer.js";
import Store from "../store/SubscribeStore.js";
import { AllState, GridState } from "../store/viewStore.js";

function initFN(){
    subscribe(GridState, initCurrentPage);
    subscribe(GridState, initCategoryNum);
    subscribe(AllState, initCurrentPage);
    subscribe(AllState, initCategoryNum);
    subscribe(GridState, renderMain);
    subscribe(AllState, renderMain);
}

function initCurrentPage(){
    State.setCurrentPage(1);
}

function initCategoryNum(){ 
    State.setCategoryNum(0);
}

function clickAllNews(){
const allNews = document.getElementById("main-left-radio-01");
    allNews.addEventListener('click',(e)=>{
        setState(AllState, true);
        // State.setAll();
        // State.setCurrentPage(1);
        // State.setCategoryNum(0);
        // renderMain();
    });
}

function clickMySubscribeNews(){
    const subscribeNews = document.getElementById("main-left-radio-02");
    subscribeNews.addEventListener('click',()=>{
        setState(AllState, false)
        // State.setSubscribe();
        // State.setCurrentPage(1);
        // State.setCategoryNum(0);
        // renderMain();
    });
}

function clickGridImage(){
    const gridImage = document.getElementById("grid-image");
    const cardListImage = document.getElementById("card-list-image"); 
        gridImage.addEventListener('click',()=>{
            changeImageSrc(gridImage, "./img/GridViewSelected.png");
            changeImageSrc(cardListImage , "./img/ListView.png");
            setState(GridState, true);
            // State.setMaxPage();
            // State.setGrid();
            // State.setCurrentPage(1);
            // renderMain();
        });
    }
    
function clickCardListImage(){
    const MAX_PAGE_NUMBER = newsData.getCategoryMaxPage(0);
    const gridImage = document.getElementById("grid-image");
    const cardListImage = document.getElementById("card-list-image");     
        cardListImage.addEventListener('click',()=>{
            changeImageSrc(gridImage, "./img/GridView.png");
            changeImageSrc(cardListImage , "./img/ListViewSelected.png");
            setState(GridState, false);
            // State.setList();
            // State.setMaxPage(MAX_PAGE_NUMBER);
            // State.setCurrentPage(1);
            // State.setCategoryNum(0);
            // renderMain();
        });
    }

export default function mainHeader(){
    initFN();
    clickAllNews();
    clickMySubscribeNews();
    clickGridImage();
    clickCardListImage();
}