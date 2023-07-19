import { CATEGORY_LIST, FILTER_TYPE } from "../asset/data/constants.js";
import listViewData from "../asset/data/listViewData.js";
import { store } from "../store/store.js";

function filterData() {
    let listData;
    let navData;
    switch (store.getCrntFilter()){
        case FILTER_TYPE.ALL:
            listData = listViewData;
            navData = CATEGORY_LIST;
            break;
        case FILTER_TYPE.SUBSCRIBED:
            const subList = store.getSubList();
            listData = listViewData.filter(data => subList.includes(data.id));
            navData = listData.map(data => data.name);
            break;
    }
    return {listData, navData};
}

export {filterData}