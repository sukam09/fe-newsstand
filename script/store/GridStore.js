import { MEDIA } from '../constants.js';
import Store from '../core/Store.js';

class GridStore extends Store {
  constructor(viewData, viewAll) {
    super({
      page: 0,
      media: viewAll ? viewData.mediaData : viewData.subscribed,
    });
  }

  getMediaId(index) {
    const { page, media } = this.getState();

    return media[index + page * MEDIA.PAGE_SIZE];
  }

  movePage(move) {
    this.setState({ page: this.getState().page + move });
  }

  addArrowListener(leftArrow, rightArrow) {
    document.eventManager.register(
      'click',
      leftArrow,
      () => this.movePage(-1),
      'view'
    );
    document.eventManager.register(
      'click',
      rightArrow,
      () => this.movePage(1),
      'view'
    );
  }
}

export default GridStore;
