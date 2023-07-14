import { THEME } from "../../constants/index.js";
import { actionCreator } from "../../core/zzapdux.js";

const initialState = {
  currentTheme: THEME.LIGHT,
};

const CHANGE_THEME = "PAGE/CHANGE_THEME";

export const changeTheme = () => actionCreator(CHANGE_THEME);

export const theme = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_THEME:
      return {
        ...state,
        currentTheme:
          state.currentTheme === THEME.LIGHT ? THEME.DARK : THEME.LIGHT,
      };
    default:
      return state;
  }
};
