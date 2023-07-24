const currentState = {};

function initState({ key, defaultState }) {
  currentState[key] = {
    state: defaultState,
    observers: new Set(),
  };
  return key;
}

function subscribe(key, observer) {
  currentState[key].observers.add(observer);
}

function notify(key) {
  currentState[key].observers.forEach((observer) => observer());
}

function getState(key) {
  if (!key in currentState) throw Error("존재하지 않는 key값입니다.");
  return currentState[key].state;
}

function setState(key, newState) {
  if (!key in currentState) throw Error("존재하지 않는 key값입니다.");
  currentState[key].state = newState;
  notify(key);
}

export { initState, subscribe, getState, setState };
