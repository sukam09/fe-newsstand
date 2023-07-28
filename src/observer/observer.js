const globalState = {};

const subscribe = (key, observer) => globalState[key].observers.add(observer);

const _notify = (key) => 
    globalState[key].observers.forEach((observer) => observer());

const initState = ({ key, defaultValue }) => {
    globalState[key] = {
        state: defaultValue,
        observers: new Set(),
    };
    return key;
};

const getState = (key) => {
    return globalState[key].state;
}

const setState = (key, newState) => {
    globalState[key].state = newState;
    _notify(key);
};

export { subscribe, initState, getState, setState };