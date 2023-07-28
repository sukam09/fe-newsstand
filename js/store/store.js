export function createStore(reducer) {
  let state;
  let handler = [];
  reducer(state, {
    type: "@@__init__@@",
  });

  return {
    dispatch: (action) => {
      state = reducer(state, action);
      // notify
      handler.forEach((h) => {
        h();
      });
    },
    subscribe: (listener) => {
      handler.push(listener);
    },
    //unsubscribe

    getState: () => state,
  };
}
