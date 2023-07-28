class Store {
  constructor(reducer) {
    let state;
    let handler = [];

    state = reducer(state, {
      type: '@@__init__@@',
    });

    this.dispatch = action => {
      state = reducer(state, action);
      if (action.type === 'unsubscribe') {
        this.notify();
      }
    };

    this.subscribe = listener => {
      handler.push(listener);
    };

    this.getState = () => state;

    this.getMyPress = () => state.myPress;

    this.notify = () => {
      handler.forEach(fn => {
        fn();
      });
    };
  }
}

function reducer(state = initialState, action) {
  const { type, pid, pressName } = action;
  switch (type) {
    case 'subscribe':
      return { ...state, myPress: [...state.myPress, { pid, pressName }] };
    case 'unsubscribe':
      return { ...state, myPress: state.myPress.filter(({ pid: originalPid }) => originalPid !== pid) };
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
