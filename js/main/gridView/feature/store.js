const MIN_PAGE = 1;
const MAX_PAGE = 4;

const store = {
  state: {
    grid_page: MIN_PAGE,
  },
  setGridPage(value) {
    this.state.grid_page = value;
  },
};

export { store, MIN_PAGE, MAX_PAGE };
