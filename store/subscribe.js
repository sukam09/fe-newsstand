import { initState } from "../observer/observer.js";

const subscribeList = initState({
  key: "subscribeList",
  defaultState: [3, 5, 7],
});

const selectSubscribeIdx = initState({
  key: "selectSubscribeIdx",
  defaultState: 0,
});

export { subscribeList, selectSubscribeIdx };
