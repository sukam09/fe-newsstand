import { actionCreator } from "../../core/zzapdux.js";

const initialState = {
  open: false,
};

const OPEN_SNACKBAR = "SNACKBAR/OPEN_SNACKBAR";
const CLOSE_SNACKBAR = "SNACKBAR/CLOSE_SNACKBAR";

export const openSnackbar = () => actionCreator(OPEN_SNACKBAR);
export const closeSnackbar = () => actionCreator(CLOSE_SNACKBAR);

export const snackbar = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_SNACKBAR:
      return { ...state, open: true };
    case CLOSE_SNACKBAR:
      return { ...state, open: false };
    default:
      return state;
  }
};
