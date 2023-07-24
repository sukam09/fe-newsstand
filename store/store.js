
import { FILTER_TYPE, VIEW_TYPE } from "../asset/data/constants.js";
import { drawArrow } from "../script/view-utils/arrow.js";
import { drawGrid } from "../script/grid-view/grid-view.js";
import { drawList } from "../script/list-view/list-view.js";

class Store {
    constructor () {
        this.viewState = {
            crntView : VIEW_TYPE.GRID, // this.crntView = VIEW_TYPE.GRID;
            crntPage : 0,  // page index (grid, list view)
            crntCategory : 0,  // category index (list view)
            crntFilter : FILTER_TYPE.ALL
        }
        this.subList = [];
        this.shuffledList = [];
        this.observers = new Set();
    }

    getViewState() {
        return {...this.viewState}
    }
    getSubList() {
        return this.subList;
    }
    getShuffledList() {
        return this.shuffledList;
    }
    

    setViewState(newState){
        this.viewState = {...this.viewState,  ...newState};
        // this.renderView();
        this.notify();
    }
    setSubList(id, type){
        switch(type){
            case "subscribe":
                this.subList.push(id);
                break;
            case "unsubscribe":
                const idx = this.subList.findIndex(item => item === id);
                this.subList.splice(idx,1)
                break;
        }
        // this.renderView();
        this.notify();
    }  
    setShuffledList(arr){
        this.shuffledList = arr;
    }


    subscribe(observer) {
        this.observers.add(observer)
    }
    notify(){
        this.observers.forEach(func => func());
    }
}


const store = new Store();

export {store};