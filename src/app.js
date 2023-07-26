import { store } from '../core/store.js';
import { getPidMap } from './utils.js';
import { CATEGORY_NUMBERS, PAGE_MAX_NUMBER, PAGE_MIN_NUMBER } from './constants.js';

import Header from './components/Header.js';
import AutoRollingNews from './components/AutoRollingNews.js';
import PressTab from './components/PressTab.js';
import PressGridView from './components/PressGridview.js';
import PressListView from './components/PressListView.js';
import { fetchPressInfo } from './api.js';

const defaultHeadlines = [
  `정부, '처리수' 표현에 "문제없어", '핵폐수'엔 "불안감 내용 부적절"`,
  `IAEA 최종보고서 반발…전국 곳곳서 후쿠시마 오염수 방류 규탄`,
  `일본 원전 오염수 방류도 안했는데…찬바람 부는 횟집·양식어가`,
  `'오염수 저지' 野의원단 방일 출국…"국제공조 통해 방류 저지"`,
  `與 "민주 'IAEA 총장면담·日방문', 부끄럽고 한심…국격 추락"`,
  `尹대통령, 리투아니아로 출국…나토회의서 북핵 공조 모색`,
  `검찰, 국회 2차 압수수색…송영길 보좌진 동선 추적`,
  `검찰, 박영수 측근 불러 보강수사…구속영장 재청구 '무게'`,
  `조국 아들 "연세대 대학원에 석사 학위 반납"`,
  `민주, 양평고속道 의혹에 "게이트·국정농단"…국조·특검도 거론`,
];
const defaultCategories = ['종합/경제', '방송/통신', 'IT', '영자지', '스포츠/연예', '매거진/전문지', '지역'];

const pressInfo = await fetchPressInfo();
const pidMap = await getPidMap();

export default function App({ $app }) {
  this.state = {
    press: 'all',
    view: 'grid',
    pressList: [],
  };

  this.setState = (nextState, isRender = true) => {
    this.state = nextState;
    if (isRender) {
      this.render();
    }
  };

  new Header({ $target: $app });

  new AutoRollingNews({
    $target: $app,
    initialState: {
      data: defaultHeadlines,
    },
  });

  const pressTab = new PressTab({
    $target: $app,
    initialState: {
      press: 'all',
      view: 'grid',
    },
    onClickPress: press => {
      if (this.state.press === press) {
        return;
      }

      // 내가 구독한 언론사가 하나도 없으면 이동하지 않음
      if (store.getMyPress().length === 0) {
        return;
      }

      this.setState({ ...this.state, press });
      pressTab.setState({ ...this.state, press });
    },
    onClickView: view => {
      if (this.state.view === view) {
        return;
      }
      this.setState({ ...this.state, view });
      pressTab.setState({ ...this.state, view });
    },
  });

  const $div = document.createElement('div');
  $app.appendChild($div);

  const onChangePress = press => {
    this.setState({ ...this.state, press });
    pressTab.setState({ ...this.state, press });
  };

  this.render = () => {
    $div.innerHTML = '';

    const myPressLength = store.getMyPress().length;

    this.state.view === 'grid'
      ? new PressGridView({
          $target: $div,
          initialState: {
            press: this.state.press,
            page: 1,
            minPage: PAGE_MIN_NUMBER,
            maxPage: PAGE_MAX_NUMBER,
            pressInfo,
            pidMap,
          },
          onChangePress,
        })
      : new PressListView({
          $target: $div,
          initialState: {
            press: this.state.press,
            index: 0,
            length: this.state.press === 'all' ? CATEGORY_NUMBERS : myPressLength,
            present: 1,
            entire: 1,
            categories: defaultCategories,
            pidMap,
          },
          onChangePress,
        });
  };

  this.render();
}
