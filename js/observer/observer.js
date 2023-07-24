const globalStates = {};

export function initState({ key, defaultState }) {
  globalStates[key] = {
    state: defaultState,
    observers: new Set(),
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
  globalStates[key].observers.forEach(observer => {
    observer();
  });
}

export function subscribe(key, observer) {
  globalStates[key].observers.add(observer);
}
