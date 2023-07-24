import State from "../store/StateStore.js";
import NewsData from "../store/NewsStore.js";
import Store from "../store/SubscribeStore.js"

export default function controListlMinMaxException(){
    let isAll = State.getAllState();
    let currentPage = State.getCurrentPage();
    let categoryNum = State.getCategoryNum();
    let MAX_CATEGORY_NUM = State.getMaxCategoryNum();
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
        isAll ? State.setCurrentPage(NewsData.getListNews(categoryNum).length-1): State.setCurrentPage(1);
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
        isAll ? State.setMaxPage(NewsData.getListNews(categoryNum).length - 1): State.setMaxPage(1);  
     }
} 
