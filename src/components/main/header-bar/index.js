import {
  renderHeaderBar,
  setDragSlider,
  renderSubscribePressBar,
} from "./HeaderBar.js";
import {
  viewState,
  subscribeState,
  viewOptionState,
} from "../../../store/store.js";
import { useSubscribeAtom } from "../../../store/atom.js";

export const setHeaderBar = (categoryList) => {
  setDragSlider();

  useSubscribeAtom(viewState, renderHeaderBar(categoryList));
  useSubscribeAtom(subscribeState, renderSubscribePressBar);
  useSubscribeAtom(viewOptionState, renderHeaderBar(categoryList));
};
