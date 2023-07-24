import main from "./renderMain.js";
import State from "../store/StateStore.js";
import NewsData from "../store/NewsStore.js";
import Store from "../store/SubscribeStore.js"

let subscribedNews = [];
let currentPage;
let categoryNum;
let isAll;
let listArticle;
let pageMAX;
let categoryMAX;

function makeCategory(){
    const mainCenter = document.getElementById("main-center");
    const newCategroy = document.createElement("ul");
    
    newCategroy.classList.add("categoryBar");
    
    mainCenter.appendChild(newCategroy);

    const categoryinfo = document.createElement("span");
    categoryinfo.classList.add("categoryinfo");

    const pageinfo = document.createElement("span");
    pageinfo.classList.add("pageinfo");

    listArticle.forEach((value, index) =>{
        const list = document.createElement("li");
        list.id = value[0];
        
        if(index === categoryNum){
            const progress = document.createElement("div");
            progress.classList.add("selectedprogress");
            newCategroy.appendChild(progress);
            list.classList.add("selected");
            categoryinfo.innerHTML = value[0];
            pageinfo.innerHTML =currentPage + "/" + pageMAX; 
            progress.appendChild(list);
            progress.appendChild(categoryinfo);
            progress.appendChild(pageinfo);
        }
        else{
            list.innerHTML = value[0]; 
            newCategroy.appendChild(list);   
        }
    })
}

function addCategoryOnclick(){
    document.querySelector(`#main-center ul`).childNodes.forEach((value, index)=>{
        value.addEventListener("click", (e) => {
            listArticle.forEach((value, index)=> {
                if(e.target.innerHTML === value[0]){
                    State.setCurrentPage(1);
                    State.setMaxPage(NewsData.getListNews(index % categoryMAX).length - 1);
                    State.setCategoryNum(index);
                    main();
                }   
            })
        });
    })
}

function  makeSubscribeButton(){
    const ListHeader = document.querySelector(`.listHeader`);
    const subscribeBtn = document.createElement("button");
    subscribeBtn.classList.add("subscribebtn");

    if(isAll === true){
        subscribeBtn.innerText = "+ 구독하기";
    }
    else if(isAll === false){
        subscribeBtn.innerText = "x";
    }
    ListHeader.appendChild(subscribeBtn);
    subscribeBtn.addEventListener("click", ()=>{
        subscribedNews.push(listArticle[categoryNum][currentPage].subArticles.title);
        main()
    })
}

function viewArticle(){
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

    mainList.style.paddingLeft = 20 + 'px';
    mainList.style.paddingBottom = 20 + 'px';
    
    ListHeader.classList.add("listHeader");
    
    console.log(currentPage);
    brandmark.src = listArticle[categoryNum][currentPage].logo;
    lastEditDate.innerHTML = listArticle[categoryNum][currentPage].editTime;  
    lastEditDate.style.marginLeft = 20 + 'px';

    article.classList.add("article");
    
    // 기사 추가
    articleMain.classList.add("articleMain");
    articleMain.style.marginRight = 30 + 'px'

    mainImgFrame.classList.add("mainImgFrame");
    mainImg.src = listArticle[categoryNum][currentPage].mainArticle.thumbnail;
    mainImg.classList.add("mainImg");

    mainArticle.innerHTML = listArticle[categoryNum][currentPage].mainArticle.title;
    mainArticle.style.marginTop = 16 + 'px';
    mainArticle.style.fontSize = 16 + 'px';
    
    articleList.classList.add("articleList");

    listArticle[categoryNum][currentPage].subArticles.forEach((value)=>{
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
    // editGuide.innerHTML = listArticle[categoryNum][currentPage].subArticles.editGuide;
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



export default function MainList(){
    const mainCenter = document.getElementById("main-center");
    mainCenter.innerHTML='';
    mainCenter.style.border = 'none';
    currentPage = State.getCurrentPage();
    categoryNum = State.getCategoryNum();
    isAll = State.getAllState();

    if(isAll === true){
        listArticle = NewsData.getListArticle();
        pageMAX = NewsData.getListArticle()[categoryNum].length - 1;
        categoryMAX = NewsData.getListArticle().length;
    }
    else if(isAll === false){
        listArticle = Store.getSubscribe();
    }
    

    makeCategory();
    addCategoryOnclick();
    viewArticle();
    makeSubscribeButton();
}
