const all_images = [
    "데일리안.png","문화일보.png","법률 방송 뉴스.png","서울경제.png", "세계일보.png","스브스비즈.png","스포츠동아.png","스포츠서울.png","시사저널e.png","아시아경제.png","아이뉴스24.png","에너지경제.png","이데일리.png","조선일보.png","조이뉴스.png","파이낸셜뉴스.png","헤럴드경제.png","BUISNESSPOST.png","CEO스코어데일리.png","Insight.png","KBS WORLD.png","KBS한국농어촌방송.png","KNN.png","Korea JoongAng Daily.png","90.png"
];

const subscribe_images=[

];

const newsStatus={
    all:1,
    my:0,
};

const cardStatus={
    grid:1,
    cardList:0,
};

const allNews = document.getElementById("main-left-01");
const subscribeNews = document.getElementById("main-left-02");
const gridImage = document.getElementById("grid-image");
const cardListImage = document.getElementById("card-list-image");
const rightAsideButton = document.getElementById("aside-right");
const leftAsideButton = document.getElementById("aside-left");
let page = 0;
let max_page = 3;

function refresh(images){
    //if (currentStatus.all == 1)
    shuffle(images);
    for(let maxCardCnt = 24*page; maxCardCnt < 24*page+24; maxCardCnt++){
        console.log(maxCardCnt);
        const outer_div = document.createElement("div");
        const news_logo = document.createElement("img");
        news_logo.src = `신문사이름/${all_images[maxCardCnt]}`;
        document.getElementById("main-grid").appendChild(outer_div);
        document.getElementById("main-grid").children[maxCardCnt].appendChild(news_logo);
    }
    // else
    // my == 0
}

function clickNewsStand(){
    const newsStand=document.getElementById("header-div-01");
    newsStand.addEventListener("click",()=>{
        window.location.replace("index.html");
    })
} 

function getDate(){
    let time;
    const weekend=["일","월","화","수","목","금","토"];
    const today = new Date();
    const year = today.getFullYear();
    let month = `0${today.getMonth()+1}`;
    month = month.slice(-2);
    let date = `0${today.getDate()}`;
    date = date.slice(-2);
    const day = weekend[today.getDay()];
    time = `${year}. ${month}. ${date}. ${day}요일`;
    return time;
}

function setDate(){
    let time = getDate();
    const dateDiv = document.getElementById("header-div-02");
    const timeDiv = document.createElement("div");
    timeDiv.innerText = time;
    dateDiv.appendChild(timeDiv);
}

function shuffle(array){
    array.sort(() => Math.random() - 0.5);
}

function clickAllNews(){
    allNews.addEventListener('click',()=>{
        newsStatus.all = 1;
        newsStatus.my = 0;
        subscribeNews.style.fontWeight="normal";
        allNews.style.fontWeight="bold";
        refresh(subscribe_images);
    });
}

function clickMySubscribeNews(){
    subscribeNews.addEventListener('click',()=>{
        newsStatus.all = 0;
        newsStatus.my = 1;
        subscribeNews.style.fontWeight="bold";
        allNews.style.fontWeight="normal";
        refresh(subscribe_images);
    });
}

function clickGridImage(){
    gridImage.addEventListener('click',()=>{
        cardStatus.grid = 1;
        cardStatus.cardList = 0;
        cardListImage.style.border="0px blue solid";
        gridImage.style.border="2px blue solid";
        refresh(subscribe_images);
    });
}

function clickCardListImage(){
    cardListImage.addEventListener('click',()=>{
        cardStatus.grid = 0;
        cardStatus.cardList = 1;
        cardListImage.style.border="2px blue solid";
        gridImage.style.border="0px blue solid";
        refresh(subscribe_images);
    });
}

function clickRightAsideButton(){
    rightAsideButton.addEventListener("click",()=>{
        if (page == max_page){
            rightAsideButton.style.visibility = "hidden";
            refresh(all_images);
            return ;
        }
        page++;
        refresh(all_images);
    });
}

refresh(all_images);
setDate();
clickNewsStand();
clickAllNews();
clickMySubscribeNews();
clickGridImage();
clickCardListImage();
clickRightAsideButton();