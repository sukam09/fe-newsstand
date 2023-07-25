import { store } from "./store.js";
import { observe } from "./observer.js";
export function getMode() {
  return store.state.mode;
}

export function getIndex(index) {
  return index === "gridIndex" ? store.state.gridIndex : store.state.listIndex;
}
export function getView() {
  return store.state.view;
}
export function getPage() {
  return store.state.page;
}
export function getTabMode() {
  return store.state.tabMode;
}
export function getSubscribedPress() {
  return store.state.subscribedPress;
}
export function getCurrentPress() {
  return store.state.currentPress;
}

// 옵저버 등록
observe(getMode);
observe(getView);
observe(getPage);
observe(getTabMode);
observe(getSubscribedPress);
observe(getIndex);
observe(getCurrentPress);
