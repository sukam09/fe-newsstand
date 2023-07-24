import renderMain from "./main/renderMain.js";
import State from "./store/StateStore.js";
import changeImageSrc from "./utils/changeImageSrc.js";
import newsData from "./store/NewsStore.js";

function clickAllNews(){
const allNews = document.getElementById("main-left-radio-01");
    allNews.addEventListener('click',(e)=>{
        State.setAll();
        State.setCurrentPage(1);
        State.setCategoryNum(0);
        renderMain();
    });
}

function clickMySubscribeNews(){
const subscribeNews = document.getElementById("main-left-radio-02");
    subscribeNews.addEventListener('click',()=>{
       State.setSubscribe();
       State.setCurrentPage(1);
       State.setCategoryNum(0);
       renderMain();
    });
} 

function clickGridImage(){
    const gridImage = document.getElementById("grid-image");
    const cardListImage = document.getElementById("card-list-image"); 
        gridImage.addEventListener('click',()=>{
            changeImageSrc(gridImage, "./img/GridViewSelected.png");
            changeImageSrc(cardListImage , "./img/ListView.png");
            State.setMaxPage();
            State.setGrid();
            State.setCurrentPage(1);
            renderMain();
        });
    }
    
function clickCardListImage(){
    const MAX_PAGE_NUMBER = newsData.getCategoryMaxPage(0);
    const gridImage = document.getElementById("grid-image");
    const cardListImage = document.getElementById("card-list-image");     
        cardListImage.addEventListener('click',()=>{
            changeImageSrc(gridImage, "./img/GridView.png");
            changeImageSrc(cardListImage , "./img/ListViewSelected.png");
            State.setList();
            State.setMaxPage(MAX_PAGE_NUMBER);
            State.setCurrentPage(1);
            State.setCategoryNum(0);
            renderMain();
        });
    }

export default function mainHeader(){
    clickAllNews();
    clickMySubscribeNews();
    clickGridImage();
    clickCardListImage();
}