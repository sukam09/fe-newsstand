import Store from '../core/Store.js';

class ListStore extends Store {
  constructor(viewData, viewAll) {
    super({
      category: 0,
      page: 0,
      media: viewAll ? viewData.mediaData : viewData.subscribed,
    });
  }

  movePage(move) {
    const { category, media, page } = this.getState();
    const catLength = media.length;
    const pageLength = media[category].media.length;
    const newPage = page + move;

    switch (newPage) {
      case -1:
        const newCategory = (category - 1 + catLength) % catLength;

        this.setState({
          category: newCategory,
          page: media[newCategory].media.length - 1,
        });
        break;
      case pageLength:
        this.setState({
          category: (category + 1) % catLength,
          page: 0,
        });
        break;
      default:
        this.setState({ page: newPage });
    }
  }

  moveSubPage(move) {
    const { media, page } = this.getState();
    const pageLength = media.length;
    const newPage = page + move;

    switch (newPage) {
      case -1:
        this.setState({ page: pageLength - 1 });
        break;
      case pageLength:
        this.setState({ page: 0 });
        break;
      default:
        this.setState({ page: newPage });
    }
  }
}

export default ListStore;
