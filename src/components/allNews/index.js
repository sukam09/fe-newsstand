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
    this.state.myPress = [
      {
        name: '오마이뉴스',
        number: '0',
        category: '종합/경제',
        edit_date: '2023.02.10. 18.27',
        main_news: {
          thumbnail: 'https://picsum.photos/320/200',
          title: '또 국민연금의 몽니…현대百 지주사 불발',
        },
        sub_news: [
          '"위스키 사려고 이틀 전부터 줄 섰어요"',
          "'방시혁 제국'이냐 '카카오 왕국'이냐...K엔터 누가 거머쥘까",
          '사용후핵연료 저장시설 포화...이대론 7년 뒤 원전 멈춘다',
          '[단독] 원희룡 "해외건설 근로자 소득공제 월 500만원으로 상향할 것"',
          '태평양에는 우영우의 고래만 있는게 아니었다 [로비의 그림]',
          'LG엔솔, 폴란드 자동차산업협회 가입..."유럽서 목소리 키운다"',
        ],
      },
    ]; // 아이템 객체로 저장
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
      : this.state.myPress;
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
      : this.state.myPress.forEach(press => listPress[press.category].push(press));

    return listPress;
  }
}
