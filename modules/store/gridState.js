import { initState } from "./observer.js";
import { DATA_LEN } from "./pageState.js";

export let subStateList = [];

export function initSubStateList() {
  for (let i = 0; i < DATA_LEN; i++) {
    const subButtonState = initState({
      key: `sub${i}`,
      value: false,
    });
    subStateList.push(subButtonState);
  }
}

export const myPressCntState = initState({
  key: "myPressCnt",
  value: 0,
});
