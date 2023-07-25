// 전체 언론사 보기인지 구독한 언론사 보기인지에 따라 그릴 데이터 골라내기

import { CATEGORY_LIST, FILTER_TYPE } from "../../asset/data/constants.js";
import listViewData from "../../asset/data/listViewData.js";
import { store } from "../../store/store.js";

function filterData() {
    let listData;
    let navData;
    let numOfListPages;
    const {crntFilter, crntCategory} = store.getViewState();
    switch (crntFilter){
        case FILTER_TYPE.ALL:
            listData = listViewData;
            navData = CATEGORY_LIST;
            numOfListPages = listViewData.filter(data => data.category == CATEGORY_LIST[crntCategory]).length;
            break;
        case FILTER_TYPE.SUBSCRIBED:
            const subList = store.getSubList();
            listData = listViewData.filter(data => subList.includes(data.id));
            navData = listData.map(data => data.name);
            numOfListPages = 1;
            break;
    }
    return {listData, navData, numOfListPages};
    
}

export {filterData}
