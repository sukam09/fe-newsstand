export function createStore(reducer) {
  let state;
  let handler = [];
  reducer(state, {
    type: "@@__init__@@",
  });

  return {
    dispatch: (action) => {
      state = reducer(state, action);
      handler.forEach((h) => {
        h();
      });
    },
    subscribe: (listener) => {
      handler.push(listener);
    },

    getState: () => state,
  };
}
