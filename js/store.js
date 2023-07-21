const MIN_PAGE = 1;
const MAX_PAGE = 4;

const store = {
  state: {
    //type grid-all, grid-sub, list-category, list-press
    type: "grid-all",
    grid_page: MIN_PAGE,
    list_page: 0,
  },
  setGridPage(value) {
    this.state.grid_page = value;
  },
  setListPage(value) {
    this.state.list_page = value;
  },
  setType(value) {
    this.state.type = value;
  },
};

export { store, MAX_PAGE, MIN_PAGE };
