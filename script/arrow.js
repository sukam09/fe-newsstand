import pressList from "../asset/data/pressList.js"
import listViewData from "../asset/data/listViewData.js";
import { store } from "../store/store.js";
import { CATEGORY_LIST } from "../asset/data/constants.js";

const leftArrow = document.querySelector(".arrow-left");
const rightArrow = document.querySelector(".arrow-right");

function updateArrow(){
    let crntPage = store.getPage();
    let crntView = store.getView();
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
function listenArrow(){
    leftArrow.addEventListener("click",()=> {
        let crntPage = store.getPage();
        let crntView = store.getView();
        let crntCategory = store.getCategory();
        if (crntView == "list") {
            if (crntPage == 0 && crntCategory == 0) {
                store.setCategory(CATEGORY_LIST.length - 1);
            } else if (crntPage == 0 && crntCategory > 0){
                store.setCategory(crntCategory - 1)
            } else {
                store.setPage(crntPage-1);
            }
        } else {
            store.setPage(crntPage-1);
        }
        
    })
    rightArrow.addEventListener("click",() => {
        let crntPage = store.getPage();
        let crntView = store.getView();
        let crntCategory = store.getCategory();
        if (crntView == "list") {
            const numOfPages = listViewData.filter(data => data.category == CATEGORY_LIST[crntCategory]).length;
            if (crntPage >= numOfPages - 1 && crntCategory >= CATEGORY_LIST.length - 1){ // 마지막 카테고리의 마지막 페이지
                store.setCategory(0); 
                store.setPage(0);
            } else if (crntPage >= numOfPages - 1 && crntCategory < CATEGORY_LIST.length - 1) { // 카테고리(마지막 카테고리 제외)의 마지막 페이지
                store.setCategory(crntCategory + 1);
                store.setPage(0);
            } else {
                store.setPage(crntPage + 1);
            }
        } else {
            store.setPage(crntPage + 1);
        }

    })
    
}

export {updateArrow, listenArrow}