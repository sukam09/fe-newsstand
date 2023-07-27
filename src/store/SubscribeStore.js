class SubscribeStore{
    constructor(){
        this.subscribePress = [];
        this.subscribeListCategory = [];
    }

    getSubscribe(){
        return this.subscribePress;
    }

    getSubscribeCategory(){
        return this.subscribeListCategory;
    }

    addSubscribe(press){
        this.subscribePress.push(press);
    }

    removeSubscribe(press){
        let pressIndex = this.subscribePress.indexOf(press);
        this.subscribePress.splice(pressIndex, 1);
    }

    getSubscribeByID(id){
        let press;
        if(this.subscribePress.length > 0){
            press = this.subscribePress.find(logo =>logo.id == id);
        }
        else{
            press = 0;
        }
        return press
    }

    makeSubscribeCategory(){
        let subscribeListCategory = [];
        if(this.subscribePress.length > 0){
            this.subscribePress.forEach((press) => {
                subscribeListCategory.push(press.name);
            })
            //removeDuplicate();
            let pressSet = new Set(subscribeListCategory);
            this.subscribeListCategory = [...subscribeListCategory];
        }

    }
}

const store = new SubscribeStore();

export default store;  