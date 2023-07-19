import main from "./main/main.js";
import listArticle from "../data/list_article.json" assert { type: "json" };
import State from "./state/Reducer.js";
import changeImageSrc from "./utils/changeImageSrc.js";

function clickAllNews(){
const allNews = document.getElementById("main-left-radio-01");
    allNews.addEventListener('click',(e)=>{
        State.setAll();
    });
}

function clickMySubscribeNews(){
const subscribeNews = document.getElementById("main-left-radio-02");
    subscribeNews.addEventListener('click',()=>{
       State.setSubscribe();
    });
} 

function clickGridImage(){
    const gridImage = document.getElementById("grid-image");
    const cardListImage = document.getElementById("card-list-image"); 
        gridImage.addEventListener('click',()=>{
            changeImageSrc(gridImage, "./img/GridViewSelected.png");
            changeImageSrc(cardListImage , "./img/ListView.png");
            State.setGrid();
        });
    }
    
function clickCardListImage(){
    const gridImage = document.getElementById("grid-image");
    const cardListImage = document.getElementById("card-list-image");     
        cardListImage.addEventListener('click',()=>{
            changeImageSrc(gridImage, "./img/GridView.png");
            changeImageSrc(cardListImage , "./img/ListViewSelected.png");
            State.setList();
        });
    }

export default function mainHeader(){
    clickAllNews();
    clickMySubscribeNews();
    clickGridImage();
    clickCardListImage();
}