class SubscribeStore{
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

    findSubscribe(id){
        if(this.subscribePress.length > 0){
            press = this.subscribePress.find(press => press.id === id);
        }
        else{
            press = 0;
        }
        return press
    }
}

const store = new SubscribeStore();

export default store;  