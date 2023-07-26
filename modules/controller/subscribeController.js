import { getState, setState } from "../store/observer.js";
import {
  LIST,
  MODE_MY,
  pageModeState,
  pageTypeState,
} from "../store/pageState.js";
import { myPressListState } from "../store/subState.js";
import { showPage } from "./pageController/pageController.js";

export function updateMyPressList(subState, pressId) {
  const isSub = getState(subState);
  const myPressList = getState(myPressListState);

  if (isSub) {
    myPressList.push(pressId);
    setState(myPressListState, myPressList);
  } else {
    const filtered = myPressList.filter((value) => value !== pressId);
    setState(myPressListState, filtered);
    const pageType = getState(pageTypeState);
    const pageMode = getState(pageModeState);
    if (pageType === LIST && pageMode === MODE_MY) {
      console.log("test");
      showPage({ pageMode, pageType });
    }
  }
}
