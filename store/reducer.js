import { VIEW_TYPE } from "../constants/index.js";
import { createAction } from "../core/my-redux.js";

const initialState = {
  currentPage: 0,
  currentCategory: "종합/경제",
  viewType: VIEW_TYPE.GRID,
};

const NEXT_PAGE = "PAGE/NEXT_PAGE";
const PREV_PAGE = "PAGE/PREV_PAGE";
const RESET_PAGE = "PAGE/RESET_PAGE";
const CHANGE_VIEW = "PAGE/CHANGE_VIEW";

export const nextPage = () => createAction(NEXT_PAGE);
export const prevPage = () => createAction(PREV_PAGE);
export const resetPage = () => createAction(RESET_PAGE);
export const changeView = (viewType) => createAction(CHANGE_VIEW, viewType);

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
    default:
      return state;
  }
};
