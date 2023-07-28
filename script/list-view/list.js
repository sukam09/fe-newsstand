import { store } from "../../store/store.js";
import { drawProgressBar } from "./progress-bar.js";
import { CATEGORY_LIST, FILTER_TYPE } from "../../asset/data/constants.js";
import { filterData } from "../view-utils/filter-data.js";
import { handleSubscribe } from "../view-utils/handle-subscribe.js";

const listNav = document.querySelector(".list-nav");
const listContent = document.querySelector(".list-content");

function handleCategoryChange(catBtns){
    Array.prototype.forEach.call(catBtns, (btn, index) => {
        btn.addEventListener("click", () => {        
            let {crntCategory} = store.getViewState()
            if (crntCategory !== index){ // change to different category
                store.setViewState({crntCategory: index, crntPage: 0})
            } else { 
                // stay in crnt category
            }
        })
    })
}

function drawListPage({listData, navData}) {
    const {crntPage, crntCategory, crntFilter} = store.getViewState();
    let crntData;
    if (crntFilter === FILTER_TYPE.ALL){
        const filteredByCat = listData.filter(item => item.category == navData[crntCategory]);
        crntData = filteredByCat[crntPage]
    } else if (crntFilter === FILTER_TYPE.SUBSCRIBED){
        crntData = listData[crntCategory];
    }
    
    listContent.innerHTML = `
    <div class="list-page" index=${crntCategory}>
        <header class="list-page-header display-medium12 light-text-default">
            <img class="list-main-img" src=${crntData.path}></img>
            <span>${crntData.edit_date} 편집</span>
            <img src="/asset/icons/${store.getSubList().includes(crntData.id) ? "list-unsub-btn.png":"subscribe-button.png"}" class="${store.getSubList().includes(crntData.id) ? "list-unsub-btn" : "list-sub-btn"}" index=${crntData.id} />
        </header>
        <section class="list-page-section">
            <section class="list-page-left available-medium16 light-text-strong">
                <img src='https://picsum.photos/320/200'></img>
                <span>${crntData.main_title}</span>
            </section>
            <section class="list-page-right">
                ${crntData.sub_title.map((title) => `<span class="list-right-title available-medium16 light-text-bold">${title}</span>`).join('')}
                <span class="list-right-sub display-medium14">${crntData.name} 언론사에서 직접 편집한 뉴스입니다.</span>
            </section>
        </section>
    </div>`
}
async function drawListNav({navData}){
   
        const {crntCategory} = store.getViewState();
        listNav.innerHTML = "";
        navData.forEach((category, index) => {
            listNav.innerHTML += `
            <li class="${crntCategory == index ? "category" : "category"}">
                <div class="category-title">${category}</div>
                <div class="${crntCategory == index ? "" : "hide"} list-page-info">
                </div>
            </li>`
        })
   
}
function drawSelectedCategory() {
    const {crntCategory} = store.getViewState();
    const listCategories = document.querySelectorAll(".category");
    const listPageInfos= document.querySelectorAll(".list-page-info");
    listCategories.forEach((category, index) => {
        if (category.classList.contains("selected")){
            category.classList.remove("selected");
            listPageInfos[index].classList.add("hide");
        } 
        if (crntCategory === index){
            category.classList.add("selected");
            listPageInfos[index].classList.remove("hide")
        }
    })
}
function drawPageInfo({listData}) {
    const {crntPage, crntCategory, crntFilter} = store.getViewState();
    let numOfPages;
    if (crntFilter === FILTER_TYPE.ALL){
        numOfPages = listData.filter(data => data.category == CATEGORY_LIST[crntCategory]).length;
    }
    const listPageInfo = document.querySelectorAll(".list-page-info")[crntCategory];
    listPageInfo.innerHTML = `
        <span class="display-bold12">
            ${crntFilter === FILTER_TYPE.ALL ? `${crntPage+1}<span>/${numOfPages}</span>` : `<img src="../asset/icons/chevron-right.png"/>`}
        </span>`
}

async function drawList() {
    const viewData = await filterData(); // filter data to show according to crnt filter type
    const {isChangeView, isChangeCategory} = store.getFlagState();
    if (isChangeView){
        // 그리드뷰 -> 리스트뷰로 바뀔 때 실행
        // 구독 언론사 보기 + 리스트뷰 + 구독해지할 때도 실행
        drawListNav({...viewData});
        handleCategoryChange(listNav.children);
    }
    if (isChangeCategory){
        // 카테고리가 바뀔 때 실행
        drawSelectedCategory();
    }
    // 항상 실행 (페이지가 바뀔 때)
    drawPageInfo({...viewData}); 
    drawProgressBar() 
    drawListPage({...viewData}); 
    handleSubscribe();

    store.initFlagVar();
}

export {drawList}