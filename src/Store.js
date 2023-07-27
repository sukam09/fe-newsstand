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
        this.notifyAll(true);
    }

    deleteState(press_idx) {
        this._state = this._state.filter((idx) => idx !== press_idx);
        this.notifyAll(false);
    }

    getIdx() {
        return this._state;
    }

    notifyAll(is_add) {
        this._observers.forEach((sbs) => {
            try {
                sbs.update(this._state, is_add);
            } catch (err) {
                throw new Error("update error: ", sbs);
            }
        });
    }
}

class modeSubject extends Subject {
    constructor() {
        super();
        this._state = { is_grid_view: true, is_sub_view: false };
    }

    setState({ is_grid_view, is_sub_view }) {
        if (is_grid_view !== null) this._state.is_grid_view = is_grid_view;
        if (is_sub_view !== null) this._state.is_sub_view = is_sub_view;
        this.notifyAll();
    }

    notifyAll() {
        console.log(this._state);
    }
}

// 관찰하는 주체 (구독한 언론사)
const _sub_press_list = new subscribeSubject();
const _mode = new modeSubject();

export { _sub_press_list, _mode };
