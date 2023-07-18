const store = {
  state: {
    list_page: 0,
  },

  setGridPage(value) {
    this.state.list_page = value;
  },
};

export { store };
