import db from '../../../store/db.js';
import { TEXT } from '../../constants/index.js';
import { customQuerySelector } from '../../utils/index.js';
import Component from '../core/Component.js';
import AllNewHeader from './AllNewHeader.js';
import AllNewsGridView from './AllNewsGridView.js';
import AllNewsListView from './AllNewsListView.js';

let currentView = 'list';
let currentPressType = 'all';

export default class AllNews extends Component {
  setup() {
    const isDarkMode = document.body.className === 'dark';
    this.state = { isDarkMode, view: currentView, pressType: currentPressType };
    db.observe(this);
  }

  template() {
    return `<div class='all-news-header'></div>
            <div class='all-news-wrapper'></div>`;
  }

  mounted() {
    if (db.isLoading) return;
    new AllNewHeader(customQuerySelector('.all-news-header', this.$target), {
      onClick: this.onClick.bind(this),
      view: this.state.view,
      type: this.state.pressType,
    });

    this.state.view === TEXT.GRID
      ? new AllNewsGridView(customQuerySelector('.all-news-wrapper', this.$target), {
          pressType: this.state.pressType,
        })
      : new AllNewsListView(customQuerySelector('.all-news-wrapper', this.$target), {
          pressType: this.state.pressType,
        });
  }

  onClick(props) {
    this.setState(props);
  }
}
