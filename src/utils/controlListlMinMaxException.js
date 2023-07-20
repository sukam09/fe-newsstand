import State from "../state/Reducer.js";
import NewsData from "../state/NewsData.js";

export default function controListlMinMaxException(){
    let currentPage = State.getCurrentPage();
    let categoryNum = State.getCategoryNum();
    let MAX_CATEGORY_NUM = NewsData.getListCategory().length - 1;
    let MAX_PAGE_NUMBER = State.getMaxPage();
    let MIN_PAGE_NUMBER = State.getMinPage();

    if(currentPage< MIN_PAGE_NUMBER){
        categoryNum--;
        if(categoryNum < 0){
           categoryNum = MAX_CATEGORY_NUM;
           State.setCategoryNum(categoryNum);
        }
        else{
           State.setCategoryNum(categoryNum);
        }
        State.setCurrentPage(NewsData.getListNews(categoryNum).length);
     }
     else if(currentPage > MAX_PAGE_NUMBER){
        categoryNum++;
        if(categoryNum > MAX_CATEGORY_NUM){
            categoryNum = categoryNum % 7;
            State.setCategoryNum(categoryNum % 7);
        }
        else{
            State.setCategoryNum(categoryNum);
        }
        State.setCurrentPage(MIN_PAGE_NUMBER);
        State.setMaxPage(NewsData.getListNews(categoryNum).length);
     }
} 
