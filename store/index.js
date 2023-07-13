import { createStore } from "../core/index.js";
import { reducer } from "./reducer.js";

export const store = createStore(reducer);
