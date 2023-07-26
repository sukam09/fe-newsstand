class StateStore{
    constructor(){
        this.viewState = {
            isAll: true,
            isGrid: true
        };

        this.pageState = {
            currentPage: 1,
            categoryNum: 0,
            maxCategoryNum: 6,
            minPage: 1,
            maxPage: 4,
            countPerPage: 24
        };
    }

    //viewState 관리
    getAllState(){
        return this.viewState.isAll;
    }

    getGridState(){
        return this.viewState.isGrid;
    }

    setAll(){
        this.viewState.isAll = true;
    }

    setSubscribe(){
        this.viewState.isAll = false;
    }

    setGrid(){
        this.viewState.isGrid = true;
    }

    setList(){
        this.viewState.isGrid = false;
    }

    //pageStae 관리
    getCurrentPage(){
        return this.pageState.currentPage
    }

    getCategoryNum(){
        return this.pageState.categoryNum
    }

    getMinPage(){
        return this.pageState.minPage
    }

    getMaxPage(){
        return this.pageState.maxPage
    }

    getMaxCategoryNum(){
        return this.pageState.maxCategoryNum
    }

    getCountPerPage(){
        return this.pageState.countPerPage
    }

    setCurrentPage(currentPage){
        this.pageState.currentPage = currentPage;
    }

    setCategoryNum(categoryNum){
        this.pageState.categoryNum = categoryNum;
    }

    setMinpage(minPage){
        this.pageState.minPage = minPage;
    }

    setMaxPage(maxPage){
        this.pageState.maxPage = maxPage;
    }

    setMaxCategoryNum(maxCategoryNum){
        this.pageState.maxCategoryNum = maxCategoryNum;
    }

    setList(){
        this.viewState.isGrid = false;
    }
}

const State = new StateStore();
export default State;  

//viewState와 pageState로 분리 필요