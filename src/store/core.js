let currentObserver = null;
const observe = (fn) => {
    currentObserver = fn;
    fn();
    currentObserver = null;
};
// Proxy는 IE 지원 X
// const observable = (obj: ObjType) => {
//   Object.keys(obj).forEach((key) => {
//     let _value = obj[key];
//     const observers = new Set<Function>();
//     Object.defineProperty(obj, key, {
//       get() {
//         if (currentObserver !== null) observers.add(currentObserver);
//         return _value;
//       },
//       set(value: any) {
//         _value = value;
//         observers.forEach((fn) => {
//           fn();
//         });
//       },
//     });
//   });
//   return obj;
// };
const observable = (obj) => {
    // obj = Object.keys(obj).map((item: any) => {
    //   if (
    //     toString.call(obj[item]) === "[object Object]" ||
    //     toString.call(obj[item]) === "[object Array]"
    //   ) {
    //     return observable(obj[item]);
    //   }
    //   return item;
    // });
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
            // if (JSON.stringify(target[name]) === JSON.stringify(value)) return true;
            target[name] = value;
            observerMap[name].forEach((fn) => {
                fn();
            });
            return true;
        },
    });
};
export { observe, observable };
