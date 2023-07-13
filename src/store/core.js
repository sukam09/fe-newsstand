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
    const initialObserverMaps = {};
    const observerMap = Object.keys(obj).reduce((map, key) => {
        map[key] = new Set();
        return map;
    }, initialObserverMaps);
    return new Proxy(obj, {
        get: (target, name) => {
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
