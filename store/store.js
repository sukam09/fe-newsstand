
import { FILTER_TYPE, VIEW_TYPE } from "../asset/data/constants.js";

class Store {
    constructor () {
        this.viewState = {
            crntView : VIEW_TYPE.GRID,  // this.crntView = VIEW_TYPE.GRID;
            crntPage : 0,               // page index (grid, list view)
            crntCategory : 0,           // category index (list view)
            crntFilter : FILTER_TYPE.ALL,
            isChangeView : false,
            isChangeCategory :  false,
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
    
    initFlagVar() {
        if (this.viewState.isChangeView === true){
            this.viewState.isChangeView = false;
        }
        if (this.viewState.isChangeCategory === true) {
            this.viewState.isChangeCategory = false;
        }
    }
    setViewState(newState){
        this.viewState = {...this.viewState,  ...newState};
        this.notify();
        this.initFlagVar();
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