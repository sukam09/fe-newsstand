import { grid_view_info_entire, grid_view_info_sub } from "./components/grid/gridToggle.js";

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

    notifyAll(isAdd) {
        this._observers.forEach((sbs) => {
            try {
                sbs.update(this._state);
            } catch (err) {
                console.error("observer error", err);
            }
        });
    }
}

const _sub_press_list = new subscribeSubject();
_sub_press_list.subscribe(grid_view_info_sub);
_sub_press_list.subscribe(grid_view_info_entire);

export { _sub_press_list };
