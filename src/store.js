import { fetchpressNews } from "./dataFetch.js";

export class createStore {
  constructor(reducer) {
    let state;
    let handler = [];
    this.dispatch = (action) => {
      state = reducer(state, action)
      handler.forEach(h => h())
    }
    this.subscribe = (listener) => {
      handler.push(listener)
    }
    this.getState = () => {
      return state;
    }
    this.isExist = (whatState, whatValue) => {
      return state === undefined ? false : state.pressesId.includes(whatValue) ? true : false
    }
  }
}

const initState = {
  pressesId: [],
  isAllPress: true,
}

export function reducer(state = initState, action) {
  switch (action.type) {
    case "subscribe":
      return { ...state, pressesId: [...state.pressesId, action.pressId] };
    case "unsubscribe":
      return { ...state, pressesId: state.pressesId.filter(pressId => pressId !== action.pressId) }
  }
}

export function actionCreator(type, data) { //action 생성
  return {
    type: type,
    ...data
  }
}

export function addpress(id) {
  store.dispatch(actionCreator("subscribe", { pressId: id }));
  console.log(store.getState())
}

export function removepress(id) {
  store.dispatch(actionCreator("unsubscribe", { pressId: id }));
  console.log(store.getState())
}

export const store = new createStore(reducer);




