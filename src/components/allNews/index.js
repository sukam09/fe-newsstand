import { TEXT } from '../../constants/index.js';
import { customQuerySelector } from '../../utils/index.js';
import Component from '../core/Component.js';
import AllNewHeader from './AllNewHeader.js';
import AllNewsGridView from './AllNewsGridView.js';
import AllNewsListView from './AllNewsListView.js';
import AllNewsMyListView from './AllNewsMyListView.js';

let currentView = 'list';
let currentPressType = 'all';
export let myListPotal;

export default class AllNews extends Component {
  setup() {
    const isDarkMode = document.body.className === 'dark';
    this.state = { isDarkMode, view: currentView, pressType: currentPressType };
    myListPotal = this.moveMyList.bind(this);
  }

  template() {
    return `<div class='all-news-header'></div>
            <div class='all-news-wrapper'></div>`;
  }

  mounted() {
    new AllNewHeader(customQuerySelector('.all-news-header', this.$target), {
      onClick: this.onClick.bind(this),
      view: this.state.view,
      type: this.state.pressType,
    });

    if (this.state.view === TEXT.GRID) {
      new AllNewsGridView(customQuerySelector('.all-news-wrapper', this.$target), {
        pressType: this.state.pressType,
      });
    }

    if (this.state.view === TEXT.LIST) {
      this.state.pressType === TEXT.ALL
        ? new AllNewsListView(customQuerySelector('.all-news-wrapper', this.$target), {
            pressType: this.state.pressType,
          })
        : new AllNewsMyListView(customQuerySelector('.all-news-wrapper', this.$target));
    }
    this.state.view === TEXT.GRID;
  }

  onClick(props) {
    this.setState(props);
  }

  moveMyList() {
    this.setState({ view: TEXT.LIST, pressType: TEXT.SUBSCRIBE_EN });
  }
}

export const changeCurrentView = view => (currentPressType = view);
