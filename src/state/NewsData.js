class NewsData{
    constructor(){
        this.gridArticle;
        this.listArticle;
    }

    getGridArticle(){
        return this.gridArticle;
    }

    getListArticle(){
        return this.listArticle;
    }

    getListNews(categoryNum){
        return this.listArticle[categoryNum].news
    }

    getListCategory(){
        let category = [];
        this.listArticle.forEach(value => {
            category.push(value.category);
        });
        return category;
    }

    getCategoryMaxPage(categoryNum){
        return this.listArticle[categoryNum].news.length;
    }

    setGridArticle(data){
        this.gridArticle = data;
    }
    setListArticle(data){
        this.listArticle = data;
    }
}

const newsData = new NewsData();
export default newsData;

//바깥에서 선언을 하거나 contructor 안에 선언