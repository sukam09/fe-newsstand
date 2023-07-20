import State from "../state/Reducer.js";
import newsData from "../state/NewsData.js";

export default function controlMinMaxPage(){
    let currentPage = State.getCurrentPage();
    let categoryNum = State.getCategoryNum();
    let maxCategoryNum = newsData.getListCategory().length - 1;
    let minPage = State.getMinPage();

    if(currentPage === minPage){
        if(categoryNum === 0){
            categoryNum = maxCategoryNum;
        }
        else{
            categoryNum--;
        }
        State.setCategoryNum(categoryNum);
        currentPage = newsData.getCategoryMaxPage(categoryNum);
        State.setCurrentPage(currentPage);
    }
    else{
        currentPage--;
        State.setCurrentPage(currentPage);
    }
} 
