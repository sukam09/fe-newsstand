
import { updateArrow } from "../script/arrow.js";
import { drawPress } from "../script/grid-view.js";
import { drawList } from "../script/list-view.js";

class Store {
    constructor () {
        this.view = "grid";
        this.page = 0; // page index (grid, list view)
        this.category = 0; // category index (list view)
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

    setView(view){
        this.view = view;
        this.renderView();
    }
    setPage(page){
        this.page = page;
        this.renderView();
        this.renderArrow();
    }
    setCategory(category){
        this.category = category;
        this.renderView();
    }


    renderView(){
        switch (this.view){
            case "grid":
                drawPress(this.page);
                break;
            case "list":
                drawList(this.category);
                break;
        }
    }

    renderArrow() {
        updateArrow();
    }
}


const store = new Store();

export {store};