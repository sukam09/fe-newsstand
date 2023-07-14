import { getDBLength } from "./api/index.js";
export const PAGINATION_UNIT = 24;
export let MAX_GRID_PAGE_NUM = 4;
export let MAX_LIST_PAGE_NUM = 96;
export const setConfig = async () => {
    const dbLength = await getDBLength();
    MAX_GRID_PAGE_NUM = Math.min(Math.ceil(dbLength / PAGINATION_UNIT), 4);
    MAX_LIST_PAGE_NUM = Math.min(PAGINATION_UNIT * MAX_GRID_PAGE_NUM, dbLength);
};
