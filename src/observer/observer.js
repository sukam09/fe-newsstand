const globalStates = {};

export function initState({ key, defaultState }) {
  globalStates[key] = {
    state: defaultState,
    observer: new Set(),
  };
  return key;
}

export function getState(key) {
  return globalStates[key].state;
}

export function setState(key, state) {
  globalStates[key].state = state;
  notify(key);
}

function notify(key) {
  globalStates[key].observer.forEach((observer) => {
    observer();
  });
}

export function resister(key, observer) {
  globalStates[key].observer.add(observer);
}
