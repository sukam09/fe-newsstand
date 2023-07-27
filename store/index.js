import { combineReducers, createStore } from "../core/index.js";
import { page } from "./reducer/page.js";
import { theme } from "./reducer/theme.js";
import { snackbar } from "./reducer/snackbar.js";
import { subscribeList } from "./reducer/subscribe-list.js";
import { modal } from "./reducer/modal.js";

const rootReducer = combineReducers({
  page,
  subscribeList,
});

// TODO: 적절한 네이밍 하기
export const appStore = createStore(rootReducer);

export const modalStore = createStore(modal);

export const snackbarStore = createStore(snackbar);

export const themeStore = createStore(theme);

export const useSelector = ({ store, selector }) => {
  if (!selector) return store.getState();

  return selector(store.getState());
};
