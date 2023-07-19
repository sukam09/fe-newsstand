import listViewData from "../asset/data/listViewData.js";
import { store } from "../store/store.js";
import { drawProgressBar } from "./progress-bar.js";
import { CATEGORY_LIST, FILTER_TYPE } from "../asset/data/constants.js";

const listNav = document.querySelector(".list-nav");
const listContent = document.querySelector(".list-content");

function listenCategoryChange(catBtns){
    Array.prototype.forEach.call(catBtns, (btn, index) => {
        btn.addEventListener("click", () => {        
            let crntCategory = store.getCrntCategory()
            if (crntCategory !== index){ // change to different category
                catBtns[crntCategory].classList.remove("selected")
                catBtns[index].classList.add("selected");
                store.setCrntCategory(index);
            } else { 
                // stay in crnt category
            }
        })
    })
}
function drawListPage() {
    let crntPage = store.getCrntPage();
    let crntCategory = store.getCrntCategory()
    const filteredByCat = listViewData.filter(item => item.category == CATEGORY_LIST[crntCategory]);
    const crntData = filteredByCat[crntPage]
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
function drawListNav(){
    let crntPage = store.getCrntPage();
    let crntCategory = store.getCrntCategory()
    listNav.innerHTML = "";
    CATEGORY_LIST.forEach((category, index) => {
        let numOfPages = listViewData.filter(data => data.category == category).length;
        listNav.innerHTML += `
        <li class="${crntCategory == index ? "selected category" : "category"}">
            <div class="category-title">${category}</div>
            <div class="${crntCategory == index ? "" : "hide"} list-page-info">
                <span class=" display-bold12">
                    ${crntPage+1}<span>/${numOfPages}</span>
                </span>
            </div>
        </li>`
    })
}
function drawList() {
    switch (store.getCrntFilter()){
        case FILTER_TYPE.ALL:
            break;
        case FILTER_TYPE.SUBSCRIBED:
            break;
    }
    drawListNav()
    drawProgressBar()
    drawListPage();
    listenCategoryChange(listNav.children);
}

export {drawList}