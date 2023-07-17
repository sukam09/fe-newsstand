import { shuffled_data } from "../../data/shuffled_data.js";

const COUNT_PER_PAGE = 24;

function refreshGrid(currentPageNumber){
    const mainCenter = document.getElementById("main-center");
    const mainGrid = document.createElement("div");
    mainGrid.id = "main-grid"
    mainCenter.innerHTML = '';
    mainCenter.style.border = '0px';
    mainCenter.appendChild(mainGrid);
    mainGrid.innerHTML='';
    mainGrid.style.borderBottom = "1px solid black";
    mainGrid.style.borderRight = "1px solid black";

    const logoAll = shuffled_data;
    for(let PAGE_INDEX = (currentPageNumber-1) * COUNT_PER_PAGE; PAGE_INDEX < COUNT_PER_PAGE * (currentPageNumber-1) + 24 ; PAGE_INDEX++){
        const outerDiv = document.createElement("div");
        const newsLogo = document.createElement("img");
        newsLogo.src = `${logoAll[PAGE_INDEX].logo}`;
        outerDiv.append(newsLogo);
        mainGrid.append(outerDiv);
    }
}
export default function MainGrid(isAll, currentPageNumber){
    refreshGrid(currentPageNumber);
}