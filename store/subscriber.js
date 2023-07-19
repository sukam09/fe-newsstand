

class Subscriber {
    constructor (func) {
        this.func = func; // function to call when store changed
    }

    subscribe (store) {
        store.addSubscriber(this.func);
    }
}