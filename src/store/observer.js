import { State, Store } from "./store.js";

const globalStore = new Store();

const subscribe = (key, observer) =>
  globalStore.getState(key).setObserbers(observer);

const _notify = (key) =>
  globalStore
    .getState(key)
    .getObserbers()
    .forEach((observer) => observer());

const initState = ({ key, defaultValue }) => {
  globalStore.setState(key, new State(defaultValue));
  return key;
};

const getState = (key) => globalStore.getState(key).getValue();

const setState = (key, newState) => {
  globalStore.getState(key).setValue(newState);
  _notify(key);
};

export { subscribe, initState, getState, setState };
