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
    this.isSubscribed = (pressId) => {
      return state === undefined ? false : state.subscribedPressesId.includes(pressId) ? true : false
    }
  }
}

const initState = {
  subscribedPressesId: [],
  page: 0,
  howPress: '',
  howView: '',
  clickedCategoryIndex: 0,
  mode: '',
}

export function reducer(state = initState, action) {
  switch (action.type) {
    case "subscribe":
      return { ...state, subscribedPressesId: [...state.subscribedPressesId, action.pressId] };
    case "unsubscribe":
      return { ...state, subscribedPressesId: state.subscribedPressesId.filter(pressId => pressId !== action.pressId) };
    case "setPress":
      return { ...state, howPress: action.howPress }
    case "setView":
      return { ...state, howView: action.howView };
    case "setMode":
      return { ...state, mode: action.mode };
    case "setPage":
      return { ...state, page: action.page };
    case "setCategory":
      return { ...state, clickedCategoryIndex: action.clickedCategoryIndex };
  }
}

export function actionCreator(type, data) { //action 생성
  return {
    type: type,
    ...data
  }
}

export const store = new createStore(reducer);

export function addpress(pressId) {
  store.dispatch(actionCreator("subscribe", { pressId: pressId }));
}

export function removepress(pressId) {
  store.dispatch(actionCreator("unsubscribe", { pressId: pressId }));
}

export function setPress(howPress) {
  store.dispatch(actionCreator("setPress", { howPress: howPress }));
}

export function setView(howView) {
  store.dispatch(actionCreator("setView", { howView: howView }));
}

export function setMode(whatMode) {
  store.dispatch(actionCreator("setMode", { mode: whatMode }));
}

export function setPage(whatPage) {
  store.dispatch(actionCreator("setPage", { page: whatPage }));
}

export function setClickedCategoryIndex(whatCategory) {
  store.dispatch(actionCreator("setCategory", { clickedCategoryIndex: whatCategory }))
}

export function getSubscribedPressId() {
  return store.getState().subscribedPressesId;
}

export function getPress() {
  return store.getState().howPress;
}

export function getView() {
  return store.getState().howView;
}

export function getMode() {
  return store.getState().mode;
}

export function getPage() {
  return store.getState().page;
}

export function getClickedCategoryIndex() {
  return store.getState().clickedCategoryIndex;
}









