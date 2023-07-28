const CATEGORY_LIST = ["종합/경제","방송/통신","IT","영자지","스포츠/연예","매거진/전문지","지역"]
const VIEW_TYPE = {
    GRID: "grid",
    LIST: "list"
}
const FILTER_TYPE = {
    ALL: "all",
    SUBSCRIBED: "subscribed",
}
const GRID_ITEMS_PER_PAGE = 24;

const URL = {
    ROLLING_DATA : "/asset/data/rolling-data.json",
    PRESS_DATA : "/asset/data/press-data.json",
}
export {CATEGORY_LIST, VIEW_TYPE, FILTER_TYPE, GRID_ITEMS_PER_PAGE, URL}