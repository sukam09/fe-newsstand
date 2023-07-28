import { initState } from "../observer/observer.js";

const isLightMode = initState({
  key: "isLightMode",
  defaultState: true,
});

const isGridMode = initState({
  key: "isGridMode",
  defaultState: true,
});

const isTotalMode = initState({
  key: "isTotalMode",
  defaultState: true,
});

export { isLightMode, isGridMode, isTotalMode };
