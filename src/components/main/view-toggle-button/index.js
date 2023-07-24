import { viewState } from "../../../store/store.js";
import { useSubscribeAtom } from "../../../store/atom.js";
import { setDisplayCurrentView, setEvents } from "./ViewToggleButton.js";

export const setViewToggleButton = () => {
  setEvents();

  useSubscribeAtom(viewState, setDisplayCurrentView);
};
