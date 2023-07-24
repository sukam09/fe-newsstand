import { store } from "../../../store/core.js";
export const movePage = (type) => {
    if (type === "prev")
        return () => store.idx--;
    if (type === "next")
        return () => store.idx++;
};
