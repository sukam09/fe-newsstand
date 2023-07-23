
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
        this.renderView();
    }
    setSubList(idx, type){
        switch(type){
            case "subscribe":
                this.subList.push(idx);
                break;
            case "unsubscribe":
                this.subList.pop(idx);
                break;
        }
    }  
    setShuffledList(arr){
        this.shuffledList = arr;
    }




    addSubscriber(subscriber) {
        this.observers.add(subscriber)
    }
    notifySubscribers(){
        this.observers.forEach(func => func());
    }

    renderView(){
        switch (this.viewState.crntView){
            case VIEW_TYPE.GRID:
                drawGrid(this.viewState.crntPage);
                break;
            case VIEW_TYPE.LIST:
                drawList(this.viewState.crntCategory);
                break;
        }
        drawArrow();
    }
}


const store = new Store();

export {store};