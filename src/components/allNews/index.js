import { viewStore } from '../../../store/index.js';
import { TEXT } from '../../constants/index.js';
import { customQuerySelector } from '../../utils/index.js';
import Component from '../core/Component.js';
import AllNewHeader from './AllNewHeader.js';
import AllNewsGridView from './AllNewsGridView.js';
import AllNewsListView from './AllNewsListView.js';
import AllNewsMyListView from './AllNewsMyListView.js';

export default class AllNews extends Component {
  setup() {
    this.state = { view: viewStore.viewType, option: viewStore.option };
    viewStore.subscribe(this);
  }

  template() {
    return `<div class='all-news-header'></div>
            <div class='all-news-wrapper'></div>`;
  }

  mounted() {
    const { viewType, option } = viewStore;

    new AllNewHeader(customQuerySelector('.all-news-header', this.$target), {
      viewType,
      option,
    });

    if (viewType === TEXT.GRID) {
      new AllNewsGridView(customQuerySelector('.all-news-wrapper', this.$target), {
        option,
      });
    }

    if (viewType === TEXT.LIST) {
      option === TEXT.ALL
        ? new AllNewsListView(customQuerySelector('.all-news-wrapper', this.$target), {
            option,
          })
        : new AllNewsMyListView(customQuerySelector('.all-news-wrapper', this.$target));
    }
  }
}
