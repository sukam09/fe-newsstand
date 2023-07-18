class Store {
  constructor(reducer) {
    let state;
    let handler = [];

    reducer(state, {
      type: '@@__init__@@',
    });

    this.dispatch = action => {
      state = reducer(state, action);
      handler.forEach(h => {
        h();
      });
    };

    this.subscribe = listener => {
      handler.push(listener);
    };

    this.getState = () => {
      return state;
    };
  }
}

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

const initialState = {
  myPress: [],
};

function actionCreator(type, data) {
  return {
    type,
    ...data,
  };
}

const store = new Store(reducer);

export { store, actionCreator };
