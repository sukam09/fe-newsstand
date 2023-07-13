import { createStore } from "../core/zzapdux.js";
import { reducer } from "./reducer.js";

export const store = createStore(reducer);
