const GRID = "grid";
const LIST = "list";
let pageType = LIST;

export const MAX_GRID_PAGE = 4;
export const NUM_IN_A_GRID = 24;
export let gridPage = 0;

const MAX_CATEGORY_ID = 2;
export const MAX_LIST_PAGE = {
  // categoryId: maxPage
  0: 3,
  1: 4,
};
export let categoryId = 0;
export let listPage = 0;

export function incGridPage() {
  gridPage >= MAX_GRID_PAGE - 1 ? (gridPage = MAX_GRID_PAGE - 1) : gridPage++;
}
export function decGridPage() {
  gridPage <= 0 ? (gridPage = 0) : gridPage--;
}

export function incListPage() {
  const maxPage = MAX_LIST_PAGE[parseInt(categoryId)];
  listPage >= maxPage - 1 ? (listPage = maxPage - 1) : listPage++;
  console.log(listPage);
}

export function getListPage() {
  return listPage;
}

export function setListPage(value) {
  listPage = value;
}
export function decListPage() {
  listPage <= 0 ? (listPage = 0) : listPage--;
}

export function changePageType(type) {
  if (type === GRID || LIST) {
    pageType = type;
  }
}
export function setCategoryId(id) {
  categoryId = id;
}
