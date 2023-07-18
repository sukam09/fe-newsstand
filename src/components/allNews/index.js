import { fetchData } from '../../../api/index.js';
import { TEXT } from '../../constants/index.js';
import { customQuerySelector, shufflePressOrder } from '../../utils/index.js';
import Component from '../core/Component.js';
import AllNewHeader from './AllNewHeader.js';
import AllNewsGridView from './AllNewsGridView.js';
import AllNewsListView from './AllNewsListView.js';

let currentView = 'grid';
let currentPressType = 'all';

export default class AllNews extends Component {
  setup() {
    const isDarkMode = document.body.className === 'dark';
    this.state = { isDarkMode, view: currentView, pressType: currentPressType };

    fetchData().then(data => {
      this.setState({ allPress: data });
    });
    this.state.myPress = ['오마이뉴스'];
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

    this.state.view === TEXT.GRID
      ? new AllNewsGridView(customQuerySelector('.all-news-wrapper', this.$target), {
          pressOrder: this.getGridPress(),
          addMyPress: this.addMyPress.bind(this),
          deleteMyPress: this.deleteMyPress.bind(this),
        })
      : new AllNewsListView(customQuerySelector('.all-news-wrapper', this.$target), {
          pressOrder: this.getListPress(),
          addMyPress: this.addMyPress.bind(this),
          deleteMyPress: this.deleteMyPress.bind(this),
        });
  }

  onClick(props) {
    this.setState(props);
  }

  addMyPress(press) {
    this.setState({ myPress: [...this.state.myPress, press] });
  }
  deleteMyPress(press) {
    this.setState({ myPress: this.state.myPress.filter(item => item !== press) });
  }

  getGridPress() {
    return this.state.pressType === TEXT.ALL
      ? shufflePressOrder(this.state.allPress)
      : this.state.allPress.filter(press => this.state.myPress.includes(press.name));
  }
  getListPress() {
    const listPress = {
      '종합/경제': [],
      '방송/통신': [],
      IT: [],
      영자지: [],
      '스포츠/연애': [],
      '매거진/전문지': [],
      지역: [],
    };

    this.state.pressType === TEXT.ALL
      ? this.state.allPress.forEach(press => listPress[press.category].push(press))
      : this.state.myPress;

    return listPress;
  }
}
