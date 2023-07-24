import { initState } from "../observer/observer.js";

const subscribeList = initState({
  key: "subscribeList",
  defaultState: [],
});

const selectSubscribeIdx = initState({
  key: "selectSubscribeIdx",
  defaultState: 0,
});

export { subscribeList, selectSubscribeIdx };
