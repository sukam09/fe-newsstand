// 전체 언론사 보기인지 구독한 언론사 보기인지에 따라 그릴 데이터 골라내기

import { CATEGORY_LIST, FILTER_TYPE, URL } from "../../asset/data/constants.js";
import { store } from "../../store/store.js";

async function filterData() {
    return new Promise((resolve) => {
        let listData;
        let navData;
        let numOfListPages;
        const {crntFilter, crntCategory} = store.getViewState();
        const pressData = store.getPressData();
        switch (crntFilter){
            case FILTER_TYPE.ALL:
                listData = pressData;
                navData = CATEGORY_LIST;
                numOfListPages = pressData.filter(data => data.category == CATEGORY_LIST[crntCategory]).length;
                break;
            case FILTER_TYPE.SUBSCRIBED:
                const subList = store.getSubList();
                listData = subList.map((id) => pressData.find(data => data.id === id))
                navData = listData.map(data => data.name);
                numOfListPages = 1;
                break;
        }
        resolve({listData, navData, numOfListPages});
    })    
}

export {filterData}
