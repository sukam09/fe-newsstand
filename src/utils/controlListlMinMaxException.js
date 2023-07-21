import State from "../store/StateStore.js";
import NewsData from "../store/NewsStore.js";

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
            categoryNum = categoryNum % MAX_CATEGORY_NUM - 1;
            State.setCategoryNum(categoryNum);
        }
        else{
            State.setCategoryNum(categoryNum);
        }
        State.setCurrentPage(MIN_PAGE_NUMBER);
        State.setMaxPage(NewsData.getListNews(categoryNum).length);
     }
} 
