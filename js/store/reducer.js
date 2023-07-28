import { ACTION } from "../utils/constant.js";
import { createStore } from "./store.js";

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
  listPage: {
    currentContents: 1,
    currentCategory: 0,
    goBefore: false,
    first_page: 0,
  },
  gridPage: {
    selectedPage: 0,
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
    // 현재 콘텐츠 페이지
    case ACTION.CONTENTS:
      return {
        ...state,
        listPage: {
          ...state.listPage,
          currentContents: action.data,
        },
      };
    // 현재 카테고리 페이지
    case ACTION.CATEGORY:
      return {
        ...state,
        listPage: {
          ...state.listPage,
          currentCategory: action.data,
        },
      };
    // 이전 카테고리로 넘어갈지
    case ACTION.GO_BEFORE:
      return {
        ...state,
        listPage: {
          ...state.listPage,
          goBefore: action.data,
        },
      };
    case ACTION.SELECTED_PAGE: {
      return {
        ...state,
        gridPage: {
          ...state.gridPage,
          selectedPage: action.data,
        },
      };
    }

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
