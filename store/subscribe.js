import { initState } from "../observer/observer.js";

const subscribeList = initState({
  key: "subscribeList",
  defaultState: [
    1, 6, 18, 39, 25, 41, 4, 5, 7, 8, 9, 14, 19, 21, 22, 23, 24, 26, 27, 28, 29,
    33, 43, 64, 75, 88,
  ],
});

const selectSubscribeIdx = initState({
  key: "selectSubscribeIdx",
  defaultState: 0,
});

export { subscribeList, selectSubscribeIdx };
