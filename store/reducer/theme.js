import { THEME } from "../../constants/index.js";
import { actionCreator } from "../../core/zzapdux.js";
import { setLocalStorageItem } from "../../utils/local-storage.js";

const initialState = THEME.LIGHT;

const INIT_THEME = "PAGE/INIT_THEME";
const CHANGE_THEME = "PAGE/CHANGE_THEME";

export const initTheme = (theme) => actionCreator(INIT_THEME, theme);
export const changeTheme = () => actionCreator(CHANGE_THEME);

export const theme = (state = initialState, action) => {
  let newState = state;

  switch (action.type) {
    case INIT_THEME:
      return action.payload;
    case CHANGE_THEME:
      newState = state === THEME.LIGHT ? THEME.DARK : THEME.LIGHT;
      break;
    default:
      return state;
  }

  setLocalStorageItem("theme", newState);
  return newState;
};
