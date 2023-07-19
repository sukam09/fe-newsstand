
import { VIEW_TYPE } from "../asset/data/constants.js";
import { updateArrow } from "../script/arrow.js";
import { drawPress } from "../script/grid-view.js";
import { drawList } from "../script/list-view.js";

class Store {
    constructor () {
        this.view = VIEW_TYPE.GRID;
        this.page = 0; // page index (grid, list view)
        this.category = 0; // category index (list view)
        this.observers = new Set();
    }
    
    getView(){
        return this.view;
    }
    getPage(){
        return this.page;
    }
    getCategory(){
        return this.category;
    }

    
    setPage(page){
        this.page = page;
        this.renderView();
        this.renderArrow();
    }
    setCategory(category){
        this.category = category;
        this.page = 0;
        this.renderView();
        this.renderArrow();
    }
    setView(view){ 
        this.view = view;
        this.page = 0;
        this.category = 0;
        this.renderView();
        this.renderArrow();
    }


    addSubscriber(subscriber) {
        this.observers.add(subscriber)
    }
    notifySubscribers(){
        this.observers.forEach(func => func());
    }




    renderView(){
        switch (this.view){
            case VIEW_TYPE.GRID:
                drawPress(this.page);
                break;
            case VIEW_TYPE.LIST:
                drawList(this.category);
                break;
        }
    }

    renderArrow() {
        updateArrow();
        // switch (this.view){
        //     case VIEW_TYPE.GRID:
        //         updateArrow();
        //         break;
        //     case VIEW_TYPE.LIST:
        //         // no need to update arrow when crntview == list
        //         break;
        // }
    }
}


const store = new Store();

export {store};