import { HEADLINE } from '../constants.js';
import Store from '../core/Store.js';

class HeadlineStore extends Store {
  #loop;

  constructor(newsData) {
    super({
      prevIndex: newsData.news.length - 1,
      newsData,
    });
    this.#loop = null;
  }

  update() {
    const { prevIndex, newsData } = this.getState();

    this.setState({ prevIndex: (prevIndex + 1) % newsData.news.length });
  }

  startLoop(titleWrapper) {
    this.#loop = setInterval(this.update.bind(this), HEADLINE.INTERVAL);
    this;
    titleWrapper.addEventListener('mouseenter', () => {
      clearInterval(this.#loop);
    });
    titleWrapper.addEventListener('mouseleave', () => {
      this.#loop = setInterval(this.update.bind(this), HEADLINE.INTERVAL);
    });
  }
}

export default HeadlineStore;
