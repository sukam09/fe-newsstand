import { createStore } from "../core/my-redux.js";
import { reducer } from "./reducer.js";

export const store = createStore(reducer);
