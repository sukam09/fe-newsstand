import { VIEW } from "./global.js";

class Store {
  #state;
  #subscribeHandler;
  #gridUnsubscribeHandler;
  #listUnsubscribeHandler;
  constructor(reducer) {
    this.#state = reducer(undefined, {
      type: "@@__init__@@",
    });
    this.#subscribeHandler = [];
    this.#gridUnsubscribeHandler = [];
    this.#listUnsubscribeHandler = [];
  }

  dispatch(action) {
    this.#state = reducer(this.#state, action);
    if (action.type === "subscribe" && VIEW.layout === "list") {
      this.#subscribeHandler.forEach((renderFn) => {
        renderFn();
      });
    } else if (action.type === "unsubscribe") {
      if (VIEW.layout === "grid") {
        this.#gridUnsubscribeHandler.forEach((renderFn) => {
          if (VIEW.tab === "subscribe") {
            renderFn();
          }
        });
      } else {
        this.#listUnsubscribeHandler.forEach((renderFn) => {
          renderFn();
        });
      }
    }
  }

  subscribe(listener, type, view) {
    if (type === "subscribe") {
      this.#subscribeHandler.push(listener);
    } else if (type === "unsubscribe") {
      if (view === "grid") {
        this.#gridUnsubscribeHandler.push(listener);
      } else {
        this.#listUnsubscribeHandler.push(listener);
      }
    }
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
