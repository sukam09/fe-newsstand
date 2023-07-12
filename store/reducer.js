import { VIEW_TYPE } from "../constants/index.js";
import { createAction } from "../core/my-redux.js";

const CATEGORIES = [
  "종합/경제",
  "방송/통신",
  "IT",
  "영자지",
  "스포츠/연예",
  "매거진/전문지",
  "지역",
];

const CATEGORIES_TO_INDEX = CATEGORIES.reduce((acc, curr, idx) => {
  acc[curr] = idx;
  return acc;
}, {});

const initialState = {
  currentPage: 0,
  currentCategory: "종합/경제",
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
      return {
        ...state,
        currentPage: 0,
        currentCategory: "종합/경제",
        viewType: action.payload,
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
