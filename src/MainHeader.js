import mainNews from "./main/mainNews.js";
import State from "./state/Reducer.js";
import changeImageSrc from "./utils/changeImageSrc.js";
import newsData from "./state/NewsData.js";

function clickAllNews(){
const allNews = document.getElementById("main-left-radio-01");
    allNews.addEventListener('click',(e)=>{
        State.setAll();
        State.setCurrentPage(1);
        mainNews();
    });
}

function clickMySubscribeNews(){
const subscribeNews = document.getElementById("main-left-radio-02");
    subscribeNews.addEventListener('click',()=>{
       State.setSubscribe();
       State.setCurrentPage(1);
       mainNews();
    });
} 

function clickGridImage(){
    const gridImage = document.getElementById("grid-image");
    const cardListImage = document.getElementById("card-list-image"); 
        gridImage.addEventListener('click',()=>{
            changeImageSrc(gridImage, "./img/GridViewSelected.png");
            changeImageSrc(cardListImage , "./img/ListView.png");
            State.setGrid();
            State.setCurrentPage(1);
            mainNews();
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
            mainNews();
        });
    }

export default function mainHeader(){
    clickAllNews();
    clickMySubscribeNews();
    clickGridImage();
    clickCardListImage();
}