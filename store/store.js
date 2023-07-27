
import { FILTER_TYPE, VIEW_TYPE } from "../asset/data/constants.js";

class Store {
    constructor () {
        this.viewState = {
            crntView : VIEW_TYPE.GRID,  // this.crntView = VIEW_TYPE.GRID;
            crntPage : 0,               // page index (grid, list view)
            crntCategory : 0,           // category index (list view)
            crntFilter : FILTER_TYPE.ALL,
        }
        this.flagState = {
            isChangeView : false,
            isChangeCategory :  false,
            isSubscribing : false,
            isUnsubscribing : false,
        }
        this.pressData = [];
        this.subList = [];
        this.shuffledList = [];
        this.observers = new Set();
    }

    getViewState() {
        return {...this.viewState};
    }
    getFlagState() {
        return {...this.flagState};
    }
    getSubList() {
        return this.subList;
    }
    getShuffledList() {
        return this.shuffledList;
    }
    getPressData() {
        return this.pressData;
    }

    
    initFlagVar() {
        for (let state in this.flagState){
            if (state){
                state = false;
            }
        }
    }
    setFlagVar(newState) {
        if ("crntView" in newState){
            this.flagState.isChangeView = true;
        }
        if ("crntCategory" in newState){
            this.flagState.isChangeCategory = true;
        }
    }
    async setViewState(newState){
        this.viewState = {...this.viewState,  ...newState};
        this.setFlagVar(newState);
        this.notify();
        
    }
    setSubList(id, type){
        switch(type){
            case "subscribe":
                this.subList.push(id);
                this.flagState.isSubscribing = true;
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
    setPressData(data) {
        this.pressData = data
    }

    subscribe(observer) {
        this.observers.add(observer)
    }
    notify(){
        return new Promise((resolve) => {
            this.observers.forEach(func =>  new Promise(resolve => func(resolve)));
            resolve(); 
          });
    }
}


const store = new Store();

export {store};