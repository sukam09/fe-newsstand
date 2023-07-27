export const globalState = {};

export function initState({ key, defaultState }) {
  globalState[key] = {
    state: defaultState,
    observers: new Set(),
  };
  return key;
}

export function getState(key) {
  return globalState[key].state;
}

export function setState(key, value) {
  globalState[key].state = value;
  notify(key);
}

export function subscribe(key, observer) {
  globalState[key].observers.add(observer);
}

export function notify(key) {
  globalState[key].observers.forEach((observer) => {
    observer();
  });
}
