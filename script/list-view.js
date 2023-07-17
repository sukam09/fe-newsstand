import listViewData from "../asset/data/listViewData.js";
import { listenArrow } from "./arrow.js";

const listNav = document.querySelector(".list-nav");
const listContent = document.querySelector(".list-content");

const categoryList = ["종합/경제","방송/통신","IT","영자지","스포츠/연예","매거진/전문지","지역"]

function listenCategoryChange(catBtns, crntListIdx, crntPage){
    Array.prototype.forEach.call(catBtns, (btn, index) => {
        btn.addEventListener("click", () => {        
            if (crntListIdx !== index){
                crntPage = 0;
            }
            catBtns[crntListIdx].classList.remove("selected")
            crntListIdx = index;
            catBtns[crntListIdx].classList.add("selected");
            drawList(crntListIdx); // empty list content section, draw again
            listenArrow("list", crntPage, crntListIdx);
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
function drawListNav(crntListIdx, crntPage){
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
function drawList(crntListIdx, crntPage = 0) {
    drawListNav(crntListIdx, crntPage)
    drawListPage(crntListIdx, crntPage);
    listenCategoryChange(listNav.children, crntListIdx, crntPage);
}

export {drawList}