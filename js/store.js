import { initState } from "./observer.js";

const viewType = initState({ key: "viewType", defaultState: "grid" });

const viewOption = initState({ key: "viewOption", defaultState: "all" });

const listPage = initState({ key: "listPage", defaultState: 0 });

const gridPage = initState({ key: "gridPage", defaultState: 1 });

const isDark = initState({ key: "isDark", defaultState: false });

export { viewType, listPage, gridPage, viewOption, isDark };
