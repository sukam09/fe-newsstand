import { store } from "../../store/store.js";
import { drawProgressBar } from "./progress-bar.js";
import { FILTER_TYPE } from "../../asset/data/constants.js";
import { filterData } from "../view-utils/filter-data.js";

const listNav = document.querySelector(".list-nav");
const listContent = document.querySelector(".list-content");
const listBox = document.querySelector(".list-box")
const emptyListView = document.querySelector(".empty-list-view");

function handleCategoryChange(catBtns){
    Array.prototype.forEach.call(catBtns, (btn, index) => {
        btn.addEventListener("click", () => {        
            let {crntCategory} = store.getViewState()
            if (crntCategory !== index){ // change to different category
                catBtns[crntCategory].classList.remove("selected")
                catBtns[index].classList.add("selected");
                store.setViewState({crntCategory: index, crntPage: 0})
            } else { 
                // stay in crnt category
            }
        })
    })
}
function drawEmptyList() {
    listBox.classList.add("hide");
    emptyListView.classList.remove("hide");
}
function drawListPage({listData, navData, filterType}) {
    let {crntPage, crntCategory} = store.getViewState();
    let crntData;
    if (filterType === FILTER_TYPE.ALL){
        const filteredByCat = listData.filter(item => item.category == navData[crntCategory]);
        crntData = filteredByCat[crntPage]
    } else if (filterType === FILTER_TYPE.SUBSCRIBED){
        crntData = listData[crntCategory];
    }
    
    listContent.innerHTML = `
    <div class="list-page" index=${crntCategory}>
        <header class="list-page-header display-medium12 light-text-default">
            <img class="list-main-img" src=${crntData.path}></img>
            <span>${crntData.edit_date} 편집</span>
            <img src="/asset/icons/${crntData.is_subscribe ? "unsubscribe-button.png":"subscribe-button.png"}" class="list-sub-btn"/>
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
function drawListNav({listData, navData, filterType}){
    let {crntPage, crntCategory} = store.getViewState();
    listNav.innerHTML = "";
    navData.forEach((category, index) => {
        let numOfPages;
        if (filterType === FILTER_TYPE.ALL){
            numOfPages = listData.filter(data => data.category == category).length;
        } else if (filterType === FILTER_TYPE.SUBSCRIBED){
            numOfPages = 1;
        }
        
        listNav.innerHTML += `
        <li class="${crntCategory == index ? "selected category" : "category"}">
            <div class="category-title">${category}</div>
            <div class="${crntCategory == index ? "" : "hide"} list-page-info">
                <span class=" display-bold12">
                ${filterType === FILTER_TYPE.ALL ? `${crntPage+1}<span>/${numOfPages}</span>` : `<img src="../asset/icons/chevron-right.png"/>`}
                </span>
            </div>
        </li>`
    })
}
function drawList() {
    const viewData = filterData(); // filter data to show according to crnt filter type
    const filterType = store.getViewState().crntFilter;
    if (viewData.listData.length === 0){
        // no data to draw < in the case of filterType = "subscribed"
        drawEmptyList();
    } else {
        drawListNav({...viewData, filterType})
        drawProgressBar()
        drawListPage({...viewData, filterType});
        handleCategoryChange(listNav.children);
    }
    
}

export {drawList}