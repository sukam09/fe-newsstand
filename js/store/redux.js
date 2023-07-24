import { ACTION } from "../utils/constant.js";

function createStore(reducer) {
  let state;
  let handler = [];
  reducer(state, {
    type: "@@__init__@@",
  });

  return {
    dispatch: (action) => {
      state = reducer(state, action);
      handler.forEach((h) => {
        h();
      });
    },
    subscribe: (listener) => {
      handler.push(listener);
    },

    getState: () => state,
  };
}

const InitState = {
  subList: [],
  navTabView: {
    ALL_PUBLISHER: true,
    MY_PUBLISHER: false,
  },
  currentView: {
    GRID: true,
    LIST: false,
  },
};

function reducer(state = InitState, action) {
  switch (action.type) {
    // 구독하기
    case ACTION.SUBSCRIBE:
      return { ...state, subList: [...state.subList, action.data] };
    // 구독 해지하기
    case ACTION.UNSUBSCRIBE:
      return {
        ...state,
        subList: state.subList.filter((sub) => sub[0] !== action.data),
      };
    // 전체 언론사 포커스
    case ACTION.ALL_PUBLISHER:
      return {
        ...state,
        navTabView: { ...action.data },
      };
    // 내가 구독한 언론사 포커스
    case ACTION.MY_PUBLISHER:
      return {
        ...state,
        navTabView: { ...action.data },
      };
    // 그리드 뷰 포커스
    case ACTION.GRID_VIEW:
      return {
        ...state,
        currentView: { ...action.data },
      };
    // 리스트 뷰 포커스
    case ACTION.LIST_VIEW:
      return {
        ...state,
        currentView: { ...action.data },
      };

    default:
      return { ...state };
  }
}

export function actionCreator(type, data) {
  return {
    type: type,
    data,
  };
}

export const store = createStore(reducer);

const initSubTabView = {
  ALL_PUBLISHER: true,
  MY_PUBLISHER: false,
};

const initCurrentView = {
  GRID: true,
  LIST: false,
};

// store.subscribe(() => {
//   console.log("상태변경");
// });

// 언론사 구독하기
export function subscribe(name, src) {
  store.dispatch(actionCreator(ACTION.SUBSCRIBE, [name, src]));
}

// 구독 해지하기
export function unsubscribe(name) {
  store.dispatch(actionCreator(ACTION.UNSUBSCRIBE, name));
}

// 구독중인지 확인
export function isSubscribe(name) {
  // 참조하는 값이 없을수도 있어서 옵셔널체이닝 연산자 사용.
  return store.getState()?.subList.some((sub) => sub[0] === name);
}

// 구독중인 언론사 리스트
export function getSubscrbeList() {
  return store.getState()?.subList || [];
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

// 전체 or 내가 구독한 언론사중에 포커스되어있는 부분 호출.
export function getNavTabView() {
  const navTabObj = store.getState()?.navTabView || initSubTabView;

  return Object.keys(navTabObj).find((key) => navTabObj[key] === true);
}

export function getUserView() {
  const userViewObj = store.getState()?.currentView || initCurrentView;
  return Object.keys(userViewObj).find((key) => userViewObj[key] === true);
}
