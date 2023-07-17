import rollingList from "./asset/data/rollingList.js";
import listViewData from "./asset/data/listViewData.js";


const listContainer = document.querySelector(".list-box");
const listNav = document.querySelector(".list-nav");
const listContent = document.querySelector(".list-content");
const leftArrow = document.querySelector(".arrow-left");
const rightArrow = document.querySelector(".arrow-right");
const header = document.querySelector(".header-left");

const rollingContent = document.querySelectorAll(".rolling-content");
const viewChangeBtns = document.querySelectorAll(".nav-right .btn")
const viewContainer = document.querySelector(".view-section-content")

let crntPage = 0;
let crntListIdx = 0;

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
            drawList(crntListIdx); // empty list content section, draw again
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
function drawListNav(crntListIdx){
    listNav.innerHTML = "";
    categoryList.forEach((category, index) => {
        let numOfPages = listViewData.filter(data => data.category == category).length;
        listNav.innerHTML += `
        <li class="${crntListIdx == index ? "selected category" : "category"}">
            <div>${category}</div>
            <div class="${crntListIdx == index ? "" : "hide"} ">
                <span class="list-page-info display-bold12">
                    ${crntPage+1}<span>/${numOfPages}</span>
                </span>
            </div>
        </li>`
    })
}
function drawList(crntListIdx) {
    drawListNav(crntListIdx)
    drawListPage(crntListIdx, crntPage);
    listenCategoryChange(listNav.children);
}
function listenViewChange(btn, type) {
    btn.addEventListener("click", () => {
        if (crntView !== type){
            crntView = type;
            crntPage = 0;
            crntListIdx = 0;
            updateArrow(); // initialize current page index, category index (if crntView == "list") and arrow
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


function listenReload(){
    header.addEventListener("click", () => {
        location.reload();
    })
}




function init(){
    rollingContent.forEach((item, index) => {
        const isFirstRoll = true;
        rollHeadline(item,rollingList, rollingList.length, index, isFirstRoll);
    })
    listenReload();
    viewChangeBtns.forEach((btn) => {
        listenViewChange(btn, btn.getAttribute("type"));
    })
    
}

window.onload = init;
