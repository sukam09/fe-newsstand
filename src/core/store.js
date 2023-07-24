import { observable } from "./observer.js";

export const store = observable({
  isShowAllPress: true,
  isShowGrid: true,
  press: [],
});
