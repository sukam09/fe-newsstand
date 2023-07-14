// reducer 합치는 함수
export const combineReducers = (reducers) => {
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
};

export const actionCreator = (type, payload) => {
  return { type, payload };
};

export const createStore = (reducer) => {
  let state = undefined;

  const subscribers = [];

  const setState = (newState) => {
    state = newState;
  };

  const getState = () => {
    return { ...state };
  };

  const subscribe = (callback) => {
    subscribers.push(callback);
  };

  const dispatch = (action) => {
    const newState = reducer(state, action);

    console.log(newState);
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
};
