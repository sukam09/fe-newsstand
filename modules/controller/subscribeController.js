import { getState, setState } from "../store/observer.js";
import { myPressListState } from "../store/subState.js";

export function updateMyPressList(subState, pressId) {
  const isSub = getState(subState);
  const myPressList = getState(myPressListState);

  if (isSub) {
    myPressList.push(pressId);
    setState(myPressListState, myPressList);
  } else {
    const filtered = myPressList.filter((value) => value !== pressId);
    setState(myPressListState, filtered);
  }
}
