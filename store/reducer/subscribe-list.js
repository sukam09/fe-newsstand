import { actionCreator } from "../../core/zzapdux.js";
import { setLocalStorageItem } from "../../utils/local-storage.js";

const KEY_SUBCRIBE_LIST = "subscribeList";

const initialState = [];

const INIT_SUBSCRIBE = "NEWS/INIT_SUBSCRIBE";
const ADD_SUBSCRIBE = "NEWS/ADD_SUBSCRIBE";
const CANCEL_SUBSCRIBE = "NEWS/CANCEL_SUBSCRIBE";

export const initSubscribe = (data) => actionCreator(INIT_SUBSCRIBE, data);
export const addSubscribe = (name) => actionCreator(ADD_SUBSCRIBE, name);
export const cancelSubscribe = (name) => actionCreator(CANCEL_SUBSCRIBE, name);

export const subscribeList = (state = initialState, action) => {
  let newState = [];

  switch (action.type) {
    case INIT_SUBSCRIBE:
      return action.payload;
    case ADD_SUBSCRIBE:
      newState = [...state, action.payload];
      break;
    case CANCEL_SUBSCRIBE:
      newState = state.filter((item) => item !== action.payload);
      break;
    default:
      return state;
  }

  setLocalStorageItem(KEY_SUBCRIBE_LIST, JSON.stringify(newState));
  return newState;
};
