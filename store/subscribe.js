import { initState } from "../observer/observer.js";

const subscribeList = initState({
  key: "subscribeList",
  defaultState: [1, 6, 18, 39, 25, 41],
});

const selectSubscribeIdx = initState({
  key: "selectSubscribeIdx",
  defaultState: 0,
});

export { subscribeList, selectSubscribeIdx };
