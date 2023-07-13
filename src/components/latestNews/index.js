import { customQuerySelectorAll } from '../../utils/index.js';
import Component from '../core/Component.js';
import LatestNewsComponent from './LatestNewsComponent.js';

export default class LatestNews extends Component {
  template() {
    return `<div class='auto-rolling-news border-default surface-alt'></div>
            <div class='auto-rolling-news border-default surface-alt'></div>
            `;
  }
  mounted() {
    const $newsLists = customQuerySelectorAll('.auto-rolling-news', this.$target);

    new LatestNewsComponent($newsLists[0], {
      name: '연합뉴스',
      content: [
        '[1보] 김기현·안철수·천하람·황교안, 與전대 본경선 진출',
        '[2보] 김기현·안철수·천하람·황교안, 與전대 본경선 진출',
        '[3보] 김기현·안철수·천하람·황교안, 與전대 본경선 진출',
        '[4보] 김기현·안철수·천하람·황교안, 與전대 본경선 진출',
        '[5보] 김기현·안철수·천하람·황교안, 與전대 본경선 진출',
      ],
      currentIndex: 0,
      delay: 0,
    });
    new LatestNewsComponent($newsLists[1], {
      name: '연합뉴스',
      content: [
        '[1보] 김기현·안철수·천하람·황교안, 與전대 본경선 진출',
        '[2보] 김기현·안철수·천하람·황교안, 與전대 본경선 진출',
        '[3보] 김기현·안철수·천하람·황교안, 與전대 본경선 진출',
        '[4보] 김기현·안철수·천하람·황교안, 與전대 본경선 진출',
        '[5보] 김기현·안철수·천하람·황교안, 與전대 본경선 진출',
      ],
      currentIndex: 0,
      delay: 1,
    });
  }
}
