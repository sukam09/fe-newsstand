import { initState } from "../observer/observer.js";
import { initSubscribeList } from "../utils/utils.js";

const response = await fetch(`../data/press-data.json`);
const jsonData = await response.json();

const pressDataState = initState({
    key: "pressData",
    value: jsonData,
});

const subscribeDataState = initState({
    key: "subscribeData",
    value: initSubscribeList(jsonData),
});

export { pressDataState, subscribeDataState };
