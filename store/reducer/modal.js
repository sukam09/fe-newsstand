import { actionCreator } from "../../core/zzapdux.js";

const initialState = {
  open: false,
  press: "",
};

const OPEN_MODAL = "MODAL/OPEN_MODAL";
const CLOSE_MODAL = "MODAL/CLOSE_MODAL";

export const openModal = (press) => actionCreator(OPEN_MODAL, press);
export const closeModal = () => actionCreator(CLOSE_MODAL);

export const modal = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_MODAL:
      return { ...state, open: true, press: action.payload };
    case CLOSE_MODAL:
      return { ...state, open: false };
    default:
      return state;
  }
};
