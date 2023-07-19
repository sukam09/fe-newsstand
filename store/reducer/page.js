import {
  VIEW_TYPE,
  TAB_TYPE,
  CATEGORIES,
  CATEGORIES_TO_INDEX,
} from "../../constants/index.js";
import { actionCreator } from "../../core/index.js";

const categoryCount = CATEGORIES.length;

const initialState = {
  currentPage: 0,
  currentCategoryIdx: 0,
  viewType: VIEW_TYPE.GRID,
  tabType: TAB_TYPE.ALL,
};

const NEXT_PAGE = "PAGE/NEXT_PAGE";
const PREV_PAGE = "PAGE/PREV_PAGE";
const RESET_PAGE = "PAGE/RESET_PAGE";
const CHANGE_VIEW = "PAGE/CHANGE_VIEW";
const CHANGE_TAB = "PAGE/CHANGE_TAB";
const NEXT_CATEGORY = "PAGE/NEXT_CATEGORY";
const PREV_CATEGORY = "PAGE/PREV_CATEGORY";
const SET_CATEGORY = "PAGE/SET_CATEGORY";

export const nextPage = () => actionCreator(NEXT_PAGE);
export const prevPage = () => actionCreator(PREV_PAGE);
export const resetPage = () => actionCreator(RESET_PAGE);
export const changeView = (viewType) => actionCreator(CHANGE_VIEW, viewType);
export const changeTab = (tabType) => actionCreator(CHANGE_TAB, tabType);
export const nextCategory = () => actionCreator(NEXT_CATEGORY);
export const prevCategory = () => actionCreator(PREV_CATEGORY);
export const setCategory = (category) => actionCreator(SET_CATEGORY, category);

export const page = (state = initialState, action) => {
  switch (action.type) {
    case NEXT_PAGE:
      return {
        ...state,
        currentPage: state.currentPage + 1,
      };
    case PREV_PAGE:
      return {
        ...state,
        currentPage: state.currentPage - 1,
      };
    case RESET_PAGE:
      return {
        ...state,
        currentPage: 0,
      };
    case CHANGE_VIEW:
      return {
        ...state,
        currentPage: 0,
        currentCategoryIdx: 0,
        viewType: action.payload,
      };
    case CHANGE_TAB:
      return {
        ...state,
        currentPage: 0,
        currentCategoryIdx: 0,
        tabType: action.payload,
      };
    case NEXT_CATEGORY:
      return {
        ...state,
        currentCategoryIdx: getNextCategoryIdx(state.currentCategoryIdx),
        currentPage: 0,
      };
    case PREV_CATEGORY:
      return {
        ...state,
        currentCategoryIdx: getPrevCategoryIdx(state.currentCategoryIdx),
        currentPage: 0,
      };
    case SET_CATEGORY:
      return {
        ...state,
        currentCategoryIdx: CATEGORIES_TO_INDEX[action.payload],
        currentPage: 0,
      };
    default:
      return state;
  }

  function getPrevCategoryIdx(idx) {
    return idx === 0 ? categoryCount - 1 : idx - 1;
  }

  function getNextCategoryIdx(idx) {
    return idx === categoryCount - 1 ? 0 : idx + 1;
  }
};
