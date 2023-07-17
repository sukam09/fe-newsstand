class ArticleState{

    constructor(){
        this.subscribePress = [];
    }

    getSubscribe(){
        return this.subscribePress;
    }

    addSubscribe(press){
        this.subscribePress.push(press);
    }

    removeSubscribe(press){
        let pressIndex = this.subscribePress.indexOf(press);
        this.subscribePress.splice(pressIndex, 1);
    }
}

const articleState = new ArticleState();

export default articleState;  