class Store{
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
        let press = this.subscribePress.find(press => press.id === id);
        return press
    }
}

const store = new Store();

export default store;  