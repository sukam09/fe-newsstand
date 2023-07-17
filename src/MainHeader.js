import main from "./main/main.js";
import listArticle from "../data/list_article.json" assert { type: "json" };
import changeImageSrc from "./utils/changeImageSrc.js";

let isAll = "all";
let view = "grid";

function clickAllNews(){
const allNews = document.getElementById("main-left-radio-01");
    allNews.addEventListener('click',(e)=>{
        isAll = "all";
        main(isAll, view, 1, 0);
    });
}

function clickMySubscribeNews(){
const subscribeNews = document.getElementById("main-left-radio-02");
    subscribeNews.addEventListener('click',()=>{
        isAll = "subscribe";
        main(isAll, view, 1, 0);
    });
} 

function clickGridImage(){
    const gridImage = document.getElementById("grid-image");
        gridImage.addEventListener('click',()=>{
            changeImageSrc(document.getElementById("grid-image"), "./img/GridViewSelected.png");
            changeImageSrc(document.getElementById("card-list-image"), "./img/ListView.png");
            view = "grid";
            main(isAll, view, 1, 0);
        });
    }
    
function clickCardListImage(){
    const cardListImage = document.getElementById("card-list-image");     
        cardListImage.addEventListener('click',()=>{
            changeImageSrc(document.getElementById("grid-image"), "./img/GridView.png");
            changeImageSrc(document.getElementById("card-list-image"), "./img/ListViewSelected.png");
            view = "list";
            main(isAll, view, 1, 0);
        });
    }

export default function mainHeader(){
    clickAllNews();
    clickMySubscribeNews();
    clickGridImage();
    clickCardListImage();
}