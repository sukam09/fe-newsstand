class ViewReducer{
    constructor(){
        this.viewState = {
            isAll: true,
            isGrid: true
        };
    }

    getViewState(){
        return this.viewState
    }

}

const viewState = new ViewReducer();

export default viewState;  