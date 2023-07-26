import { FILTER_TYPE, VIEW_TYPE } from "../../asset/data/constants.js";
import { store } from "../../store/store.js";

const filterBtns = document.querySelectorAll(".filter-btn")

function changeFilterBtn(nextFilter) {
    filterBtns.forEach((btn) => {
        if (btn.getAttribute("type") == nextFilter){
            btn.classList.add("selected-filter");
        } else {
            btn.classList.remove("selected-filter");
        }
    })
}
function changeFilter(nextFilter){
    changeFilterBtn(nextFilter)
    let nextView;
    switch (nextFilter){
        case FILTER_TYPE.ALL:
            nextView = VIEW_TYPE.GRID;
            break;
        case FILTER_TYPE.SUBSCRIBED:
            nextView = VIEW_TYPE.LIST;
            break;
    }
    store.setViewState({crntFilter:nextFilter, crntView:nextView, crntPage:0, crntCategory:0})
}
function handleFilterChange(){
    filterBtns.forEach((btn)=> {
        btn.addEventListener("click", () => {
            const nextFilter = btn.getAttribute("type");
            let {crntFilter} = store.getViewState();
            if (crntFilter !== nextFilter){
                changeFilter(nextFilter);
                
            }
        })
    })
}

export {handleFilterChange, changeFilter}