class NewsStore{
    constructor(){
        this.pressData;
        this.listArticle = [];
    }


    getListArticle(){
        return this.listArticle;
    }

    getPressData(){
        return this.pressData;
    }

    makeListCategory(){
        let category = [];
        this.pressData.forEach(value => {
            category.push(value.category);
        });
        let categorySet = new Set(category);
        category = [...categorySet];
        category.forEach((value)=>{
            this.listArticle.push([value]);
        })
    }
    
    makeListArticle(){
        this.pressData.forEach((press) => {
            this.listArticle.forEach((category, categoryNum) => {
                if(category[0] === press.category){
                    this.listArticle[categoryNum].push(press);
                }
            })
        })
    }

    getListNews(categoryNum){
        console.log(this.listArticle);
        return this.listArticle[categoryNum]
    }

    getListCategory(){
        let category = [];
        this.listArticle.forEach(value => {
            category.push(value[0]);
        });

        return category;
    }

    findGridArticle(id){
        return this.pressData[id - 1];
    }

    getCategoryMaxPage(categoryNum){
        return this.listArticle[categoryNum].length;
    }

    setPressData(data){
        this.pressData = data;
    }

}

const newsData = new NewsStore();
export default newsData;
