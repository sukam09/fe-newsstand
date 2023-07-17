function createStore(reducer) {
  let state;
  let handler = [];
  reducer(state, {
    type: '@@__init__@@',
  });
  return {
    dispatch: action => {
      state = reducer(state, action);
      handler.forEach(h => {
        h();
      });
    },
    subscribe: listener => {
      handler.push(listener);
    },
    getState: () => state,
  };
}

const initialState = {
  myPress: [],
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'subscribe':
      return { ...state, myPress: [...state.myPress, action.pressName] };
    case 'unsubscribe':
      return { ...state, myPress: state.myPress.filter(press => press !== action.pressName) };
    default:
      return { ...state };
  }
}

function actionCreator(type, data) {
  return {
    type,
    ...data,
  };
}

const store = createStore(reducer);

export { store, actionCreator };
