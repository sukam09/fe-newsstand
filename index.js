const save_images=[
    "1.png","2.png","3.png","4.png","5.png","6.png","7.png","8.png","9.png","10.png","11.png","12.png","13.png","14.png","15.png","16.png","17.png","18.png","19.png","20.png","21.png","22.png","23.png","24.png","25.png","26.png","27.png","28.png","29.png","30.png","31.png","32.png","33.png","34.png","35.png","36.png","37.png","38.png","39.png","40.png","41.png","42.png","43.png","44.png","45.png","46.png","47.png","48.png","49.png","50.png","51.png","52.png","53.png","54.png","55.png","56.png","57.png","58.png","59.png","60.png","61.png","62.png","63.png","64.png","65.png","66.png","67.png","68.png","69.png","70.png","71.png","72.png","73.png","74.png","75.png","76.png","77.png","78.png","79.png","80.png","81.png","82.png","83.png","84.png","85.png","86.png","87.png","88.png","89.png","90.png","91.png","92.png","93.png","94.png","95.png","96.png",
];

let all_images = [
];

let subscribe_images=[

];

const cardStatus={
    grid:1,
    cardList:0,
};

let MAX_PAGE_NUMBER = 3;
let MIN_PAGE_NUMBER = 0;
let currentPageNumber = 0;
const COUNT_PER_PAGE = 24;
const allNews = document.getElementById("main-left-01");
const subscribeNews = document.getElementById("main-left-02");
const gridImage = document.getElementById("grid-image");
const cardListImage = document.getElementById("card-list-image");
const rightAsideButton = document.getElementById("aside-right");
const leftAsideButton = document.getElementById("aside-left");
const mainGrid = document.getElementById("main-grid");


function refresh(images){
    //if (currentStatus.all == 1)
    all_images = save_images;
    mainGrid.innerHTML='';
    for(let PAGE_INDEX = currentPageNumber * COUNT_PER_PAGE; PAGE_INDEX < COUNT_PER_PAGE * currentPageNumber + 24 ; PAGE_INDEX++){
        const outer_div = document.createElement("div");
        const news_logo = document.createElement("img");
        news_logo.src = `icons/light/${all_images[PAGE_INDEX]}`;
        outer_div.append(news_logo);
        mainGrid.append(outer_div);
    }
    // else
    // my == 0
}

function renderRandom(){

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

// function clickAllNews(){
//     allNews.addEventListener('click',()=>{
//         refresh(subscribe_images);
//     });
// }

// function clickMySubscribeNews(){
//     subscribeNews.addEventListener('click',()=>{
//         refresh(subscribe_images);
//     });
// }

// function clickGridImage(){
//     gridImage.addEventListener('click',()=>{
//         cardStatus.grid = 1;
//         cardStatus.cardList = 0;
//         cardListImage.style.border="0px blue solid";
//         gridImage.style.border="2px blue solid";
//         refresh(subscribe_images);
//     });
// }

// function clickCardListImage(){
//     cardListImage.addEventListener('click',()=>{
//         cardStatus.grid = 0;
//         cardStatus.cardList = 1;
//         cardListImage.style.border="2px blue solid";
//         gridImage.style.border="0px blue solid";
//         refresh(subscribe_images);
//     });
//}

function clickRightAsideButton(){
    rightAsideButton.addEventListener("click",()=>{
        if (currentPageNumber == MAX_PAGE_NUMBER - 1){
            currentPageNumber++;
            refresh(all_images);
            rightAsideButton.style.visibility = "hidden";
            return ;
        }
        currentPageNumber++;
        leftAsideButton.style.visibility="visible";
        refresh(all_images);
    });
}

function clickLeftAsideButton(){
    leftAsideButton.addEventListener("click",()=>{
        if (currentPageNumber == MIN_PAGE_NUMBER + 1){
            leftAsideButton.style.visibility = "hidden";
            currentPageNumber--;
            refresh(all_images);
            return ;
        }
        currentPageNumber--;
        console.log(currentPageNumber);
        rightAsideButton.style.visibility="visible"
        refresh(all_images);
    });
}

shuffle(save_images);
refresh(save_images);
setDate();
clickNewsStand();
// clickAllNews();
//clickMySubscribeNews();
// clickGridImage();
// clickCardListImage();
clickRightAsideButton();
clickLeftAsideButton();