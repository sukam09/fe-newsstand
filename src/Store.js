import { DOM } from "./utils/domClassName.js";
import { ICON_COLOR } from "./utils/constant.js";

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

    changeFont(cont1, cont2) {
        cont1.classList.replace("selected-bold16", "available-medium16");
        cont2.classList.replace("available-medium16", "selected-bold16");
    }
    changeIcon(cont1, cont2) {
        cont1.style.filter = ICON_COLOR;
        cont2.style.filter = "none";
    }
    hideView(conts) {
        conts.forEach((cont) => (cont.style.display = "none"));
    }
    replaceView(cont1, cont2) {
        cont1.style.display = "none";
        cont2.style.display = "flex";
    }

    changeView() {
        const grid_icon = document.querySelector(`.${DOM.NAV_GRID_ICON}`);
        const list_icon = document.querySelector(`.${DOM.NAV_LIST_ICON}`);
        const entire_btn = document.querySelector(`.${DOM.NAV_ENTIRE}`);
        const subscribe_btn = document.querySelector(`.${DOM.NAV_SUBSCRIBE}`);
        const grid_entire = document.querySelector(`.${DOM.GRID_ENTIRE_VIEW}`);
        const grid_sub = document.querySelector(`.${DOM.GRID_SUBSCRIBE_VIEW}`);
        const list_entire = document.querySelector(`.${DOM.LIST_ENTIRE_VIEW}`);
        const list_sub = document.querySelector(`.${DOM.LIST_SUBSCRIBE_VIEW}`);

        this._state.is_sub_view
            ? this.changeFont(entire_btn, subscribe_btn)
            : this.changeFont(subscribe_btn, entire_btn);
        this._state.is_grid_view ? this.changeIcon(grid_icon, list_icon) : this.changeIcon(list_icon, grid_icon);

        if (this._state.is_grid_view) {
            this.hideView([list_entire, list_sub]);
            this._state.is_sub_view ? this.replaceView(grid_entire, grid_sub) : this.replaceView(grid_sub, grid_entire);
        } else {
            this.hideView([grid_entire, grid_sub]);
            this._state.is_sub_view ? this.replaceView(list_entire, list_sub) : this.replaceView(list_sub, list_entire);
        }
    }
    notifyAll() {
        console.log(this._state);
        this.changeView();

        this._observers.forEach((sbs) => {
            try {
                sbs.updateMode(this._state);
            } catch (err) {
                throw new Error("_mode error: ", sbs);
            }
        });
    }
}

// 관찰하는 주체 (구독한 언론사)
const _sub_press_list = new subscribeSubject();
const _mode = new modeSubject();

export { _sub_press_list, _mode };
