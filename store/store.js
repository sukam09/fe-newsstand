
import { FILTER_TYPE, VIEW_TYPE } from "../asset/data/constants.js";
import { drawArrow } from "../script/arrow.js";
import { drawPress } from "../script/grid-view.js";
import { drawList } from "../script/list-view.js";

class Store {
    constructor () {
        this.crntview = VIEW_TYPE.GRID;
        this.crntPage = 0; // page index (grid, list view)
        this.crntCategory = 0; // category index (list view)
        this.crntFilter = FILTER_TYPE.ALL;
        this.subPressList = [];

        this.observers = new Set();
    }
    
    getCrntView(){
        return this.crntview;
    }
    getCrntPage(){
        return this.crntPage;
    }
    getCrntCategory(){
        return this.crntCategory;
    }
    getCrntFilter(){
        return this.crntFilter;
    }

    
    setCrntPage(page){
        this.crntPage = page;
        this.renderView();
    }
    setCrntCategory(category){
        this.crntCategory = category;
        this.crntPage = 0;
        this.renderView();
    }
    setCrntView(view){ 
        this.crntview = view;
        this.crntPage = 0;
        this.crntCategory = 0;
        this.renderView();
    }
    setCrntFilter(type){
        this.crntFilter = type;
    }

    addSubscriber(subscriber) {
        this.observers.add(subscriber)
    }
    notifySubscribers(){
        this.observers.forEach(func => func());
    }

    renderView(){
        switch (this.crntview){
            case VIEW_TYPE.GRID:
                drawPress(this.crntPage);
                break;
            case VIEW_TYPE.LIST:
                drawList(this.crntCategory);
                break;
        }
        drawArrow();
    }
}


const store = new Store();

export {store};