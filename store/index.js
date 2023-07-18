import { combineReducers, createStore } from "../core/index.js";
import { page } from "./reducer/page.js";
import { theme } from "./reducer/theme.js";
import { snackbar } from "./reducer/snackbar.js";
import { subscribeList } from "./reducer/subscribe-list.js";

const rootReducer = combineReducers({ page, theme, snackbar, subscribeList });

export const store = createStore(rootReducer);

export const useSelector = (selector) => {
  return selector(store.getState());
};
