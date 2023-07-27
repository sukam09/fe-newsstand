// reducer 합치는 함수
export function combineReducers(reducers) {
  const reducerKeys = Object.keys(reducers);

  return (state = {}, action) => {
    const nextState = {};

    let changed = false;
    reducerKeys.forEach((reducerKey) => {
      const reducer = reducers[reducerKey];

      const previousState = state[reducerKey];
      const newState = reducer(previousState, action);

      nextState[reducerKey] = newState;

      changed = changed || previousState !== newState;
    });

    return changed ? nextState : state;
  };
}

export function actionCreator(type, payload) {
  return { type, payload };
}

export function createStore(reducer) {
  let state = undefined;

  const subscribers = [];

  const setState = (newState) => {
    state = newState;
  };

  const getState = () => {
    switch (typeof state) {
      case "object":
        return Array.isArray(state) ? [...state] : { ...state };
      case "function":
        return state.bind();
      default:
        return state;
    }
  };

  const subscribe = (callback) => {
    subscribers.push(callback);
  };

  const dispatch = (action) => {
    const newState = reducer(state, action);

    if (state === newState) return;
    if (JSON.stringify(state) === JSON.stringify(newState)) return;

    setState(newState);
    subscribers.forEach((callback) => callback());
  };

  dispatch({ type: "@@INIT" });

  return {
    getState,
    subscribe,
    dispatch,
  };
}
