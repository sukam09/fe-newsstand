import { fetchData } from '../../../api/index.js';
import db from '../../../store/db.js';
import { TEXT } from '../../constants/index.js';
import { customQuerySelector } from '../../utils/index.js';
import Component from '../core/Component.js';
import AllNewHeader from './AllNewHeader.js';
import AllNewsGridView from './AllNewsGridView.js';
import AllNewsListView from './AllNewsListView.js';

let currentView = 'grid';
let currentPressType = 'all';

export default class AllNews extends Component {
  setup() {
    const isDarkMode = document.body.className === 'dark';
    this.state = { isDarkMode, view: currentView, pressType: currentPressType, allPress: [] };

    fetchData().then(data => {
      this.setState({ allPress: data });
    });
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
          pressType: this.state.pressType,
        })
      : new AllNewsListView(customQuerySelector('.all-news-wrapper', this.$target), {
          pressOrder: this.getListPress(),
          addMyPress: this.addMyPress.bind(this),
          deleteMyPress: this.deleteMyPress.bind(this),
          pressType: this.state.pressType,
        });
  }

  onClick(props) {
    this.setState(props);
  }

  addMyPress(press) {
    db.putDbData(press);
    //화면 이동
  }

  deleteMyPress(press) {
    db.deleteDbData(press);
    this.render();
  }

  getListPress() {
    let listPress = {
      '종합/경제': [],
      '방송/통신': [],
      IT: [],
      영자지: [],
      '스포츠/연예': [],
      '매거진/전문지': [],
      지역: [],
    };

    this.state.pressType === TEXT.ALL
      ? db.allPress.forEach(press => listPress[press.category].push(press))
      : (listPress = db.allPress.filter(press => db.getDbData.includes(press.name)));

    return listPress;
  }
}
