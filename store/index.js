import { combineReducers, createStore } from "../core/index.js";
import { page } from "./reducer/page.js";
import { theme } from "./reducer/theme.js";

const rootReducer = combineReducers({ page, theme });

export const store = createStore(rootReducer);

export const useSelector = (selector) => {
  return selector(store.getState());
};
