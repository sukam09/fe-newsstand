export const createAction = (type, payload) => {
  return { type, payload };
};

export const createStore = (reducer) => {
  let state = undefined;

  const setState = (newState) => {
    state = newState;
  };

  const subscribers = [];

  const getState = () => {
    return state;
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
};
