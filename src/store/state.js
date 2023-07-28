import newsStore from "./news.js";
import { CATEGORY_OPTIONS } from "../constant.js";
let currentObserver = null;
/**
 * parameter로 받은 함수를 실행하여 Observer를 등록합니다.
 * @param {Function} fn
 */
const observe = (fn) => {
    currentObserver = fn;
    fn();
    currentObserver = null;
};
/**
 * Proxy를 이용한 observable 객체 생성합니다.
 * @param { Object } obj
 * @returns { Proxy }
 */
const observable = (obj) => {
    const registerObserverMap = (obj) => {
        const observerMap = {};
        Object.keys(obj).forEach((key) => {
            observerMap[key] = new Set();
        });
        return observerMap;
    };
    const observerMap = registerObserverMap(obj);
    return new Proxy(obj, {
        get: (target, name) => {
            observerMap[name] = observerMap[name] || new Set();
            if (currentObserver)
                observerMap[name].add(currentObserver);
            return target[name];
        },
        //@ts-ignore
        set: (target, name, value) => {
            if (target[name] === value)
                return true;
            if (JSON.stringify(target[name]) === JSON.stringify(value))
                return true;
            target[name] = value;
            observerMap[name].forEach((fn) => {
                fn();
            });
            return true;
        },
    });
};
/*

Proxy는 IE에서 지원하지 않습니다. IE에서도 동작하게 하려면 아래의 코드를 사용하세요.

const observable = (obj: ObjType) => {
  Object.keys(obj).forEach((key) => {
    let _value = obj[key];
    const observers = new Set<Function>();
    Object.defineProperty(obj, key, {
      get() {
        if (currentObserver !== null) observers.add(currentObserver);
        return _value;
      },
      set(value: any) {
        _value = value;
        observers.forEach((fn) => {
          fn();
        });
      },
    });
  });
  return obj;
};

*/
export { observe, observable };
const store = observable({
    dark: false,
    type: "grid",
    filter: "all",
    category: 0,
    id: [],
    page: {
        all: { grid: 0, list: 0 },
        subscribe: { grid: 0, list: 0 },
    },
    get idx() {
        return this.page[this.filter][this.type];
    },
    set idx(value) {
        if (this.type === "list" && this.filter === "all") {
            if (value >= this.id.length) {
                this.category = (this.category + 1) % CATEGORY_OPTIONS.length;
                this.id = newsStore.getCategoryData({
                    category: CATEGORY_OPTIONS[this.category],
                });
                value = 0;
            }
            else if (value < 0) {
                this.category = (this.category - 1) % CATEGORY_OPTIONS.length;
                if (this.category < 0) {
                    this.category += CATEGORY_OPTIONS.length;
                }
                this.id = newsStore.getCategoryData({
                    category: CATEGORY_OPTIONS[this.category],
                });
                value = this.id.length - 1;
            }
        }
        else if (this.type === "list" && this.filter === "subscribe") {
            value = value % this.id.length;
            if (value < 0)
                value += this.id.length;
        }
        this.page[this.filter][this.type] = value;
    },
});
const updateStoreId = () => {
    store.id =
        store.filter === "all"
            ? newsStore.getCategoryData({
                category: CATEGORY_OPTIONS[0],
            })
            : newsStore.getSubscribeList();
};
export { store, updateStoreId };
