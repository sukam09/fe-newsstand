class Subject {
    constructor() {
        this._observers = [];
        this._state = [];
    }

    subscribe(observer) {
        this._observers.push(observer);
    }

    unsubscribe(observer) {
        this._observers = this._observers.filter((obs) => obs !== observer);
    }
}

class subscribeSubject extends Subject {
    addState(press_idx) {
        this._state.push(press_idx);
        this.notifyAll();
    }

    deleteState(press_idx) {
        this._state = this._state.filter((idx) => idx !== press_idx);
        this.notifyAll();
    }

    getIdx() {
        return this._state;
    }

    notifyAll() {
        this._observers.forEach((sbs) => {
            try {
                sbs.update(this._state);
            } catch (err) {
                console.error("observer error", err);
            }
        });
    }
}

// 관찰하는 주체 (구독한 언론사)
const _sub_press_list = new subscribeSubject();

export { _sub_press_list };
