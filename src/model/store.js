import { GRID, LIST, SUBSCRIBE, UNSUBSCRIBE } from "../constant.js";
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
    if (action.type === SUBSCRIBE) {
      this.#subscribeHandler.forEach((renderFn) => {
        renderFn();
      });
    } else if (action.type === UNSUBSCRIBE) {
      if (VIEW.layout === GRID) {
        this.#gridUnsubscribeHandler.forEach((renderFn) => {
          if (VIEW.tab === SUBSCRIBE) {
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
    if (type === SUBSCRIBE) {
      this.#subscribeHandler.push(listener);
    } else if (type === UNSUBSCRIBE) {
      if (view === GRID) {
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
    case SUBSCRIBE:
      return {
        ...state,
        subscriptions: [...state.subscriptions, action.press],
      };
    case UNSUBSCRIBE:
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
