class Store {
  #state;
  #handler;
  constructor(reducer) {
    this.#state = reducer(undefined, {
      type: "@@__init__@@",
    });
    this.#handler = [];
  }

  dispatch(action) {
    this.#state = reducer(this.#state, action);
    this.#handler.forEach((h) => {
      h();
    });
  }

  subscribe(listener) {
    this.#handler.push(listener);
  }

  getSubscribe() {
    return this.#state.subscriptions;
  }
  getIsSubscribe(pressID) {
    return this.#state.subscriptions.find((press) => press.ID === pressID);
  }
}

const InitState = {
  subscriptions: [],
};

function reducer(state = InitState, action) {
  switch (action.type) {
    case "subscribe":
      return {
        ...state,
        subscriptions: [...state.subscriptions, action.press],
      };
    case "unsubscribe":
      return {
        ...state,
        subscriptions: state.subscriptions.filter((press) => press.ID !== action.press.ID),
      };
    default:
      return { ...state };
  }
}

export function actionCreator(type, data) {
  return {
    type: type,
    ...data,
  };
}

export const store = new Store(reducer);
