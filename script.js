import rollingList from "./asset/data/rollingList.js";

const gridContainer = document.querySelector(".grid-box");
const dateContainer = document.querySelector(".header-right");
const leftArrow = document.querySelector(".arrow-left");
const rightArrow = document.querySelector(".arrow-right");
const header = document.querySelector(".header-left");
const pressCover = document.querySelector(".press-cover");
const subBtn = document.querySelector(".sub-btn");
const unsubBtn = document.querySelector(".unsub-btn");
const rollingContent = document.querySelectorAll(".rolling-content");

let crntPage = 0;
let pressIdxArray = Array.from(Array(96).keys()); // create array of consecutive numbers [0...95] - to be used in drawPress()
let subscribedPress = Array.from(Array(48).keys());  // array of subscribed press IDs

function listenHeadlineHover(target){
    target.addEventListener("mouseover", () => {
        target.classList.add("paused");
    })
    target.addEventListener("mouseout", () => {
        target.classList.remove("paused")
    })
}
function drawHeadline(target, data){
    target.innerHTML = "";
    data.forEach((item) => {
        target.innerHTML += `<span>${item.title}</span>`
    })
    target.innerHTML += `<span>${data[0].title}</span>` // repeat drawHeadline instantly when rolling-window shows the last headline
}
function rollHeadline(target, data, headlineIdx, sectionIdx, isFirstRoll) {
    if (headlineIdx >= rollingList.length){
        drawHeadline(target, data);
        headlineIdx = 0;
    }
    const crntHeadline = target.children[headlineIdx];

    // add 1 sec gap between left and right rolling sections
    if (isFirstRoll && sectionIdx == 1){ // right rolling section (inital roll)
        setTimeout(() => {
            crntHeadline.classList.add("roll");
        }, 1000);
    } else if (sectionIdx == 0 || (!isFirstRoll && sectionIdx == 1)){ // left rolling section & right rolling section from second round roll
        crntHeadline.classList.add("roll");
    }
    listenHeadlineHover(crntHeadline);
    crntHeadline.addEventListener("animationend", () => {
            headlineIdx++;
            target.children[headlineIdx].classList.add("roll");
            isFirstRoll = false
            rollHeadline(target,data,headlineIdx, sectionIdx, isFirstRoll);
    })
    
}

function shuffleArray(arr){
    for (let i = arr.length - 1; i>0;i--){
        const j = Math.floor(Math.random()*(i+1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function checkSubscription(item){
    if (subscribedPress.includes(parseInt(item.getAttribute("index")))){
        subBtn.classList.add("hide");
        unsubBtn.classList.remove("hide");
    } else {
        subBtn.classList.remove("hide");
        unsubBtn.classList.add("hide");
    }
}
function listenPressHover(){
    const pressItems = document.querySelectorAll(".pressItem");
    pressItems.forEach((item)=>{
        item.addEventListener("mouseover",()=>{
            checkSubscription(item);
            pressCover.classList.remove("hidden");
            item.appendChild(pressCover);
        })
    })
    gridContainer.addEventListener("mouseout", () => {
        pressCover.classList.add("hidden");
    })
}
function listenReload(){
    header.addEventListener("click", () => {
        location.reload();
    })
}
function listenArrow(){
    leftArrow.addEventListener("click",()=> {
        crntPage--;
        updateArrow();
        drawPress(crntPage);
    })
    rightArrow.addEventListener("click",() => {
        crntPage++;
        updateArrow();
        drawPress(crntPage);
    })
    
}
function updateArrow(){
    if (crntPage == 0){
        leftArrow.classList.add("hidden");
    } else if (crntPage == 3){
        rightArrow.classList.add("hidden");
    } else {
        leftArrow.classList.remove("hidden");
        rightArrow.classList.remove("hidden");
    }
  
}
function drawPress(idx){
    gridContainer.innerHTML = "";
    let shuffledArray = shuffleArray(pressIdxArray);

    for (let i=24*idx;i<24*(idx+1);i++){
        gridContainer.innerHTML += `
            <li class="pressItem" index=${shuffledArray[i]+1}>
                <img src="./asset/logo/light/img${shuffledArray[i]+1}.svg" />
            </li>
        `
    }
    listenPressHover();
}
function drawDate() {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const weekDay = ["일요일","월요일","화요일","수요일","목요일","금요일","토요일"]

    const fullDate = `${year}. ${month}. ${day}. ${weekDay[date.getDay()]}`;
    const dateContent = document.createTextNode(fullDate);
    dateContainer.appendChild(dateContent);
}
function init(){
    drawDate();
    drawPress(crntPage);
    rollingContent.forEach((item, index) => {
        const isFirstRoll = true;
        rollHeadline(item,rollingList, rollingList.length, index, isFirstRoll);
    })
    updateArrow();
    listenArrow();
    listenReload();   
}

window.onload = init;