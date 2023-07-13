import { VIEW_TYPE, CATEGORIES } from "../constants/index.js";
import { createAction } from "../core/my-redux.js";

let categoryIdx = 0;

const categoryCount = CATEGORIES.length;

const initialState = {
  currentPage: 0,
  currentCategory: CATEGORIES[categoryIdx],
  viewType: VIEW_TYPE.GRID,
};

const NEXT_PAGE = "PAGE/NEXT_PAGE";
const PREV_PAGE = "PAGE/PREV_PAGE";
const RESET_PAGE = "PAGE/RESET_PAGE";
const CHANGE_VIEW = "PAGE/CHANGE_VIEW";
const NEXT_CATEGORY = "PAGE/NEXT_CATEGORY";
const PREV_CATEGORY = "PAGE/PREV_CATEGORY";
const SET_CATEGORY = "PAGE/SET_CATEGORY";

export const nextPage = () => createAction(NEXT_PAGE);
export const prevPage = () => createAction(PREV_PAGE);
export const resetPage = () => createAction(RESET_PAGE);
export const changeView = (viewType) => createAction(CHANGE_VIEW, viewType);
export const nextCategory = () => createAction(NEXT_CATEGORY);
export const prevCategory = () => createAction(PREV_CATEGORY);
export const setCategory = (category) => createAction(SET_CATEGORY, category);

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case NEXT_PAGE:
      return { ...state, currentPage: state.currentPage + 1 };
    case PREV_PAGE:
      return { ...state, currentPage: state.currentPage - 1 };
    case RESET_PAGE:
      return { ...state, currentPage: 0 };
    case CHANGE_VIEW:
      categoryIdx = 0;
      return {
        ...state,
        currentPage: 0,
        currentCategory: CATEGORIES[categoryIdx],
        viewType: action.payload,
      };
    case NEXT_CATEGORY:
      categoryIdx = categoryIdx === categoryCount - 1 ? 0 : categoryIdx + 1;
      return {
        ...state,
        currentCategory: CATEGORIES[categoryIdx],
        currentPage: 0,
      };
    case PREV_CATEGORY:
      categoryIdx = categoryIdx === 0 ? categoryCount - 1 : categoryIdx - 1;
      return {
        ...state,
        currentCategory: CATEGORIES[categoryIdx],
        currentPage: 0,
      };
    case SET_CATEGORY:
      return {
        ...state,
        currentCategory: action.payload,
        currentPage: 0,
      };
    default:
      return state;
  }
};
