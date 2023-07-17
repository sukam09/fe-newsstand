import rollingList from "./asset/data/rollingList.js";
import listViewData from "./asset/data/listViewData.js";
import pressList from "./asset/data/pressList.js";

const gridContainer = document.querySelector(".grid-box");
const listContainer = document.querySelector(".list-box");
const listNav = document.querySelector(".list-nav");
const listContent = document.querySelector(".list-content");
const dateContainer = document.querySelector(".header-right");
const leftArrow = document.querySelector(".arrow-left");
const rightArrow = document.querySelector(".arrow-right");
const header = document.querySelector(".header-left");
const pressCover = document.querySelector(".press-cover");
const subBtn = document.querySelector(".sub-btn");
const unsubBtn = document.querySelector(".unsub-btn");
const rollingContent = document.querySelectorAll(".rolling-content");
const viewChangeBtns = document.querySelectorAll(".nav-right .btn")
const viewContainer = document.querySelector(".view-section-content")

let crntPage = 0;
let crntListIdx = 0;
let pressIdxArray = Array.from(Array(96).keys()); // create array of consecutive numbers [0...95] - to be used in drawPress()
let subscribedPress = Array.from(Array(48).keys());  // array of subscribed press IDs
let crntView = "grid";
const categoryList = ["종합/경제","방송/통신","IT","영자지","스포츠/연예","매거진/전문지","지역"]


function listenCategoryChange(catBtns){
    Array.prototype.forEach.call(catBtns, (btn, index) => {
        btn.addEventListener("click", () => {        
            if (crntListIdx !== index){
                crntPage = 0;
            }
            catBtns[crntListIdx].classList.remove("selected")
            crntListIdx = index;
            catBtns[crntListIdx].classList.add("selected");
            drawListPage(crntListIdx,crntPage); // empty list content section, draw again
            updateArrow();
        })
    })
}
function drawListPage(crntListIdx, crntPageIdx) {
    const filteredByCat = listViewData.filter(item => item.category == categoryList[crntListIdx]);
    const crntData = filteredByCat[crntPageIdx]
    listContent.innerHTML = `
    <div class="list-page" index=${crntPageIdx}>
        <header class="list-page-header display-medium12 light-text-default">
            <img src=${crntData.path}></img>
            <span>${crntData.edit_date} 편집</span>
        </header>
        <section class="list-page-section">
            <section class="list-page-left available-medium16 light-text-strong">
                <img></img>
                <span>${crntData.main_title}</span>
            </section>
            <section class="list-page-right">
                ${crntData.sub_title.map((title) => `<span class="list-right-title available-medium16 light-text-bold">${title}</span>`).join('')}
            </section>
        </section>
    </div>`

    
}
function drawList(crntListIdx) {
    listNav.innerHTML = "";
    categoryList.forEach((category, index) => {
        listNav.innerHTML += `<li class="${crntListIdx == index ? "selected category" : "category"}">${category}</li>`
    })
    drawListPage(crntListIdx, crntPage);
    listenCategoryChange(listNav.children);
}
function listenViewChange(btn, type) {
    btn.addEventListener("click", () => {
        if (crntView !== type){
            crntView = type;
            crntPage = 0;
            crntListIdx = 0;
            updateArrow(); // initialize current page index and arrow
            switch (type){
                case "grid":
                    drawPress(crntPage);
                    break;
                case "list":
                    drawList(crntListIdx);
                    break;
            }
            Array.prototype.forEach.call(viewContainer.children, (view) => {
                if (view.getAttribute("type") == type){
                    view.classList.remove("hide");
                } else {
                    view.classList.add("hide")
                }      
            })
        }
    })
}
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
        switch (crntView){
            case "grid":
                drawPress(crntPage);
                updateArrow();
                break;
            case "list":
                if (crntPage == -1){
                    crntListIdx = crntListIdx == 0 ? categoryList.length-1 : crntListIdx-1;
                    crntPage = 0;
                }
                drawList(crntListIdx);
                updateArrow()
                break;
        }
        
    })
    rightArrow.addEventListener("click",() => {
        crntPage++;
        switch (crntView){
            case "grid":
                drawPress(crntPage);
                updateArrow();
                break;
            case "list":
                if (crntPage >= listViewData.filter(data => data.category == categoryList[crntListIdx]).length){
                    crntListIdx = crntListIdx == categoryList.length-1 ? 0 : crntListIdx+1;
                    crntPage = 0;
                }
                drawList(crntListIdx);
                updateArrow()
                break;
        }
    })
    
}
function updateArrow(){
    let maxPage;
    leftArrow.classList.remove("hidden");
    rightArrow.classList.remove("hidden");
    switch (crntView){
        case "grid":
            maxPage = pressList.length/24;
            if (crntPage == 0){
                leftArrow.classList.add("hidden");
            } else if (crntPage == maxPage-1){
                rightArrow.classList.add("hidden");
            }
            break;
        case "list":
            break;
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
    viewChangeBtns.forEach((btn) => {
        listenViewChange(btn, btn.getAttribute("type"));
    })
    
}

window.onload = init;
