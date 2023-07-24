import { pressStore } from '../../../store/index.js';
import { customQuerySelectorAll } from '../../utils/index.js';
import Component from '../core/Component.js';
import LatestNewsComponent from './LatestNewsComponent.js';

export default class LatestNews extends Component {
  setup() {
    this.latestNewses = pressStore.getLatestNews();
  }
  template() {
    return `<div class='auto-rolling-news border-default surface-alt'></div>
            <div class='auto-rolling-news border-default surface-alt'></div>
            `;
  }
  mounted() {
    const $newsLists = customQuerySelectorAll('.auto-rolling-news', this.$target);

    new LatestNewsComponent($newsLists[0], {
      name: this.latestNewses[0].name,
      content: this.latestNewses[0].sub_news,
      currentIndex: 0,
      delay: 0,
    });
    new LatestNewsComponent($newsLists[1], {
      name: this.latestNewses[1].name,
      content: this.latestNewses[1].sub_news,
      currentIndex: 0,
      delay: 1,
    });
  }
}
