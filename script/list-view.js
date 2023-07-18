import listViewData from "../asset/data/listViewData.js";
import { store } from "../store/store.js";
import { drawProgressBar } from "./progress-bar.js";

const listNav = document.querySelector(".list-nav");
const listContent = document.querySelector(".list-content");

const categoryList = ["종합/경제","방송/통신","IT","영자지","스포츠/연예","매거진/전문지","지역"]


function listenCategoryChange(catBtns){
    Array.prototype.forEach.call(catBtns, (btn, index) => {
        btn.addEventListener("click", () => {        
            let crntCategory = store.getCategory()
            if (crntCategory !== index){
                store.setPage(0);
            }
            catBtns[crntCategory].classList.remove("selected")
            catBtns[index].classList.add("selected");
            store.setCategory(index);
        })
    })
}
function drawListPage() {
    let crntPage = store.getPage();
    let crntCategory = store.getCategory()
    const filteredByCat = listViewData.filter(item => item.category == categoryList[crntCategory]);
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
            </section>
        </section>
    </div>`

    
}
function drawListNav(){
    let crntPage = store.getPage();
    let crntCategory = store.getCategory()
    listNav.innerHTML = "";
    categoryList.forEach((category, index) => {
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
    drawListNav()
    drawProgressBar()
    drawListPage();
    listenCategoryChange(listNav.children);
}

export {drawList}