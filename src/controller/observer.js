const globalState = {};

const subscribe = (key, observer) => globalState[key]._observers.add(observer);

const _notify = (key) => globalState[key]._observers.forEach((observer) => observer());

const initState = ({ key, defaultValue }) => {
  globalState[key] = {
    _state: defaultValue,
    _observers: new Set(),
  };
  return key;
};

const getState = (key) => {
  return globalState[key]._state;
};

const setState = (key, newState) => {
  globalState[key]._state = newState;
  _notify(key);
};

const setStateOnce = (key) => {
  _notify(key);
};

export { subscribe, initState, getState, setState, setStateOnce };
