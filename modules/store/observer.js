export const globalState = {};

export const initState = ({ key, value }) => {
  globalState[key] = {
    state: value,
    observers: new Set(),
  };
  return key;
};

export const getState = (key) => {
  return globalState[key].state;
};

export const setState = (key, value) => {
  globalState[key].state = value;
  notify(key);
};

export const addObserver = (key, fn) => {
  globalState[key].observers.add(fn);
};

const notify = (key) => {
  globalState[key].observers.forEach((fn) => fn());
};
