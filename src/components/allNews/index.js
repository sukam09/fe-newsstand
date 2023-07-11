import Component from '../core/Component.js';
import AllNewHeader from './AllNewHeader.js';
import AllNewsGridView from './AllNewsGridView.js';
import AllNewsListView from './AllNewsListView.js';

export default class AllNews extends Component {
  setup() {
    this.state = { view: 'list' };
  }

  template() {
    return `<div class='all-news-header'></div>
            <div class='all-news-wrapper'></div>`;
  }

  mounted() {
    new AllNewHeader(this.$target.querySelector('.all-news-header'), {
      onClick: this.onClick.bind(this),
      view: this.state.view,
    });

    this.state.view === 'grid'
      ? new AllNewsGridView(this.$target.querySelector('.all-news-wrapper'), {
          page: this.state.page,
          pressOrder: this.state.pressOrder,
        })
      : new AllNewsListView(this.$target.querySelector('.all-news-wrapper'));
  }

  onClick(viewType) {
    this.setState({ view: viewType });
  }
}
