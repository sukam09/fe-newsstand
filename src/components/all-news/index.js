//components
import Component from '../core/Component.js';
import AllNewHeader from './AllNewHeader.js';
import AllNewsGridView from './AllNewsGridView.js';
import AllNewsListView from './AllNewsListView.js';
import AllNewsMyListView from './AllNewsMyListView.js';

//constants
import { TEXT } from '../../constants/index.js';

//utils
import { customQuerySelector } from '../../utils/index.js';

//store
import { viewStore, pressStore } from '../../../store/index.js';
import AllNewsBlankView from './AllNewsBlankView.js';

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
    const { subscribedList } = pressStore;

    new AllNewHeader(customQuerySelector('.all-news-header', this.$target), {
      viewType,
      option,
    });

    if (viewType === TEXT.GRID) {
      option === TEXT.SUBSCRIBE_EN && subscribedList.length === 0
        ? new AllNewsBlankView(customQuerySelector('.all-news-wrapper', this.$target))
        : new AllNewsGridView(customQuerySelector('.all-news-wrapper', this.$target), {
            option,
          });
    }

    if (viewType === TEXT.LIST) {
      option === TEXT.ALL
        ? new AllNewsListView(customQuerySelector('.all-news-wrapper', this.$target), {
            option,
          })
        : subscribedList.length === 0
        ? new AllNewsBlankView(customQuerySelector('.all-news-wrapper', this.$target))
        : new AllNewsMyListView(customQuerySelector('.all-news-wrapper', this.$target));
    }
  }
}
