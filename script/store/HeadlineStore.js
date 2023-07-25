import {
  rollingNewsTitle,
  updateNewsContent,
} from '../apps/headline/headlineApp.js';
import { HEADLINE } from '../constants.js';
import Store from '../core/Store.js';

class HeadlineStore extends Store {
  constructor(newsData) {
    super({
      index: 0,
      newsData,
      loop: null,
    });
    this.updateNewsContent = updateNewsContent;
  }

  #readyRolling(titleWrapper) {
    titleWrapper.classList.add('rolling');
    titleWrapper.insertAdjacentHTML('beforeend', rollingNewsTitle());
  }

  startLoop(titleWrapper) {
    const updateNews = () => {
      const { index, newsData } = this.getState();

      if (!titleWrapper.classList.contains('rolling')) {
        this.#readyRolling(titleWrapper);
      }
      this.updateNewsContent(titleWrapper, newsData.news, index);
      this.setState({ index: (index + 1) % newsData.news.length });
    };

    this.setState({ loop: setInterval(updateNews, HEADLINE.INTERVAL) });
    titleWrapper.addEventListener('mouseenter', () => {
      clearInterval(this.getState().loop);
    });
    titleWrapper.addEventListener('mouseleave', () => {
      this.setState({ loop: setInterval(updateNews, HEADLINE.INTERVAL) });
    });
  }
}

export default HeadlineStore;
