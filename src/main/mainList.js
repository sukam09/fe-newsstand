import listArticle from "../../data/list_article.json" assert { type: "json" };
import main from "./Main.js";

let subscribedNews = [];

function makeCategory(currentPageNum, categoryNum, data){
    const categoryMAX = data[categoryNum].news.length;
    const mainCenter = document.getElementById("main-center");
    const newCategroy = document.createElement("ul");
    
    newCategroy.classList.add("categoryBar");
    
    mainCenter.appendChild(newCategroy);

    const categoryinfo = document.createElement("span");
    categoryinfo.classList.add("categoryinfo");

    const pageinfo = document.createElement("span");
    pageinfo.classList.add("pageinfo");

    data.forEach((value, index) =>{
        const list = document.createElement("li");
        list.id = value.category;
        
        if(index === categoryNum){
            const progress = document.createElement("div");
            progress.classList.add("selectedprogress");
            newCategroy.appendChild(progress);
            list.classList.add("selected");
            categoryinfo.innerHTML = value.category;
            pageinfo.innerHTML =currentPageNum + "/" + categoryMAX; 
            progress.appendChild(list);
            progress.appendChild(categoryinfo);
            progress.appendChild(pageinfo);
        }
        else{
            list.innerHTML = value.category; 
            newCategroy.appendChild(list);   
        }
    })
}

function addCategoryOnclick(isAll, view, data){
    document.querySelector(`#main-center ul`).childNodes.forEach((value, index)=>{
        value.addEventListener("click", (e) => {
            data.forEach((value, index) => {
                if(e.target.innerHTML  === value.category){
                    main(isAll, view, 1, index);
                }
            })
        });
    })
}

function  makeSubscribeButton(isAll, view, currentPageNum, categoryNum, data){
    const ListHeader = document.querySelector(`.listHeader`);
    const subscribeBtn = document.createElement("button");
    subscribeBtn.classList.add("subscribebtn");

    if(isAll === "all"){
        subscribeBtn.innerText = "+ 구독하기";
    }
    else if(isAll === "subscribe"){
        subscribeBtn.innerText = "x";
    }
    ListHeader.appendChild(subscribeBtn);
    subscribeBtn.addEventListener("click", ()=>{
        subscribedNews.push(data[categoryNum].news[currentPageNum]);
        main()
    })
}

function viewArticle(currentPageNum, categoryNum, data){
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

    brandmark.src = data[categoryNum].news[currentPageNum % 2].logo;
    lastEditDate.innerHTML = data[categoryNum].news[currentPageNum% 2].lastEdit;  
    lastEditDate.style.marginLeft = 20 + 'px';

    article.classList.add("article");
    
    // 기사 추가
    articleMain.classList.add("articleMain");
    articleMain.style.marginRight = 30 + 'px'

    mainImgFrame.classList.add("mainImgFrame");
    mainImg.src = data[categoryNum].news[currentPageNum % 2].mainImg;
    mainImg.classList.add("mainImg");

    mainArticle.innerHTML = data[categoryNum].news[currentPageNum % 2].mainArticle;
    mainArticle.style.marginTop = 16 + 'px';
    mainArticle.style.fontSize = 16 + 'px';
    
    articleList.classList.add("articleList");

    data[categoryNum].news[currentPageNum % 2].article.forEach((value)=>{
        const articleText = document.createElement("div");
        articleText.classList.add("articleText");
        articleText.innerHTML = value;
        articleText.style.marginBottom = 18 + 'px';
        articleText.style.fontSize = 17 + 'px';
        //overflow 관리 필요
        articleList.appendChild(articleText);
    })


    //편집 가이드 추가
    const editGuide = document.createElement("div");
    editGuide.innerHTML = data[categoryNum].news[currentPageNum % 2].editGuide;
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



export default function MainList(isAll, view, currentPageNum, categoryNum){
    const mainCenter = document.getElementById("main-center");
    mainCenter.innerHTML='';
    mainCenter.style.border = 'none';
    let data;

    if(isAll === "all" ){
        data = listArticle;
    }
    else if(isAll === "subscribe"){
        data = subscribedNews;
    }

    makeCategory(currentPageNum, categoryNum, data);
    addCategoryOnclick(isAll, view ,data);
    viewArticle(currentPageNum, categoryNum, data);
    makeSubscribeButton(isAll, view, currentPageNum, categoryNum, data);
}
