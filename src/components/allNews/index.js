import { customQuerySelector } from '../../utils/index.js';
import Component from '../core/Component.js';
import AllNewHeader from './AllNewHeader.js';
import AllNewsGridView from './AllNewsGridView.js';
import AllNewsListView from './AllNewsListView.js';

let curreentView = 'list';

export default class AllNews extends Component {
  setup() {
    const isDarkMode = document.body.className === 'dark';
    this.state = { isDarkMode, view: curreentView };
  }

  template() {
    return `<div class='all-news-header'></div>
            <div class='all-news-wrapper'></div>`;
  }

  mounted() {
    new AllNewHeader(customQuerySelector('.all-news-header'), {
      onClick: this.onClick.bind(this),
      view: this.state.view,
    });

    this.state.view === 'grid'
      ? new AllNewsGridView(customQuerySelector('.all-news-wrapper'), {
          page: this.state.page,
          pressOrder: this.state.pressOrder,
        })
      : new AllNewsListView(customQuerySelector('.all-news-wrapper'));
  }

  onClick(viewType) {
    curreentView = viewType;
    this.setState({ view: curreentView });
  }
}
