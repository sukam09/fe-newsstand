import { store, actionCreator } from "./reducer.js";
import { ACTION } from "../utils/constant.js";

const initSubTabView = {
  ALL_PUBLISHER: true,
  MY_PUBLISHER: false,
};

const initCurrentView = {
  GRID: true,
  LIST: false,
};

const initListPage = {
  currentContents: 1,
  currentCategory: 0,
  goBefore: false,
  first_page: 0,
};

// 언론사 구독하기
export function setSubscribe(name, src, id) {
  store.dispatch(actionCreator(ACTION.SUBSCRIBE, [name, src, id]));
}

// 구독 해지하기
export function setUnsubscribe(name) {
  store.dispatch(actionCreator(ACTION.UNSUBSCRIBE, name));
}

// 전체 언론사 포커스
export function setNavTabViewToAll() {
  const data = { ALL_PUBLISHER: true, MY_PUBLISHER: false };
  store.dispatch(actionCreator(ACTION.ALL_PUBLISHER, data));
}

// 내가 구독한 언론사 포커스
export function setNavTabViewToMy() {
  const data = { ALL_PUBLISHER: false, MY_PUBLISHER: true };
  store.dispatch(actionCreator(ACTION.MY_PUBLISHER, data));
}

// 그리드 페이지 포커스
export function setUserViewToGrid() {
  const data = { GRID: true, LIST: false };
  store.dispatch(actionCreator(ACTION.GRID_VIEW, data));
}

// 리스트 페이지 포커스
export function setUserViewToList() {
  const data = { GRID: false, LIST: true };
  store.dispatch(actionCreator(ACTION.LIST_VIEW, data));
}

// 리스트 페이지 콘텐츠 페이지
export function setContentsPage(page) {
  store.dispatch(actionCreator(ACTION.CONTENTS, page));
}

// 리스트 페이지 카테고리 인덱스
export function setCategoryIndex(page) {
  store.dispatch(actionCreator(ACTION.CATEGORY, page));
}

// SET: goBefore
export function setGoBefore(status) {
  store.dispatch(actionCreator(ACTION.GO_BEFORE, status));
}

// SET: selectedPage
export function setSelectedPage(page) {
  store.dispatch(actionCreator(ACTION.SELECTED_PAGE, page));
}

// 구독중인 언론사 리스트
export function getSubscrbeList() {
  return store.getState()?.subList || [];
}

// 전체 or 내가 구독한 언론사중에 포커스되어있는 부분 호출.
export function getNavTabView() {
  const navTabObj = store.getState()?.navTabView || initSubTabView;

  return Object.keys(navTabObj).find((key) => navTabObj[key] === true);
}

// 현재 유저의 뷰를 반환
export function getUserView() {
  const userViewObj = store.getState()?.currentView || initCurrentView;
  return Object.keys(userViewObj).find((key) => userViewObj[key] === true);
}

// GET: 콘텐츠 넘버
export function getCurrentContent() {
  return (
    store.getState()?.listPage?.currentContents || initListPage.currentContents
  );
}
// GET: 카테고리 인덱스
export function getCategoryIdx() {
  return (
    store.getState()?.listPage?.currentCategory || initListPage.currentCategory
  );
}
// GET: goBefore
export function getGoBefore() {
  return store.getState()?.listPage?.goBefore || initListPage.goBefore;
}
// GET: first_page
export function getFirstPage() {
  return store.getState()?.listPage?.first_page || initListPage.first_page;
}

// 그리드 뷰에서 GET: selectedPage
export function getSelectedPage() {
  return store.getState()?.gridPage?.selectedPage || 0;
}

// 구독중인지 확인
export function isSubscribe(name) {
  // 참조하는 값이 없을수도 있어서 옵셔널체이닝 연산자 사용.
  return store.getState()?.subList.some((sub) => sub[0] === name);
}
