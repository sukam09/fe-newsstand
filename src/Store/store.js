import { setPageTurner } from "../Components/PressGrid/pageMoveButton.js";
import { drawPressImg, moveSubscribedList } from "../Components/PressGrid/pressLogos.js";
import { initNews, isAllPressOrMyPressNotEmpty } from "../Components/PressList/PressNews.js";
import { changeCategory } from "../Components/PressList/categoryTab.js";
import { setNextCategory } from "../Components/PressList/pageMoveButton.js";
import { changePressView, changeView, changeViewerView } from "../Components/PressTab/pressTab.js";

export class createStore {
  constructor(reducer) {
    let state;
    let handler = [];

    state = reducer(state, {
      type: '@@__init__@@',
    });

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

function reducer(state = initState, action) {
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
    default:
      return { ...state };
  }

}

function actionCreator(type, data) { //action 생성
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

let isChangingCategory = false;
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

let prevPage = getPage();
let prevPressView = getPress();
let prevViewerView = getView();
let prevSubscribedPress = getSubscribedPressId();
let prevCategoryIndex = getClickedCategoryIndex();

function onChangeSubscribedPress() {
  if (prevSubscribedPress.length === getSubscribedPressId().length) return;
  if (prevSubscribedPress.length < getSubscribedPressId().length) {
    getView() === 'grid' ? moveSubscribedList() : initNews();
  }
  else if (prevSubscribedPress.length > getSubscribedPressId().length) {
    getView() === 'grid' ? drawPressImg() : initNews();
  }
  prevSubscribedPress = getSubscribedPressId();
}

function onPageChange() {
  if (prevPage === getPage()) return;
  prevPage = getPage();
  if (getView() === 'grid') {
    setPageTurner();
    drawPressImg();
  }
  else if (getView() === 'list') {
    setNextCategory();
    changeCategory();
  }
}

function onPressViewChange() {
  if (prevPressView === getPress()) return;
  prevPressView = getPress();
  changePressView();
}

function onViewerViewChange() {
  if (prevViewerView === getView()) return;
  prevViewerView = getView();
  changeViewerView();
}

function onChangeClickedCategory() {
  if (prevCategoryIndex == getClickedCategoryIndex()) return;
  prevCategoryIndex = getClickedCategoryIndex();
  setPage(0)
  changeCategory();
}

store.subscribe(onPageChange);
store.subscribe(onPressViewChange);
store.subscribe(onViewerViewChange);
store.subscribe(onChangeSubscribedPress);
store.subscribe(onChangeClickedCategory);






