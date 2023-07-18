import { initState } from "./observer.js";
import { DATA_LEN } from "./pageState.js";

export let subButtonStateList = [];

export function initSubButtonStateList() {
  for (let i = 0; i < DATA_LEN; i++) {
    const subButtonState = initState({
      key: `subButton${i}`,
      value: false,
    });
    subButtonStateList.push(subButtonState);
  }
}
