import Component from '../core/Component.js';
import Icon from '../common/Icon.js';
import { customQuerySelector, getTodayDate } from '../../utils/index.js';

export default class Header extends Component {
  setup() {
    this.todayDate = getTodayDate();
  }
  template() {
    return `<h1>
              <button class='news-stand-logo display-bold24 text-strong'>
              <img class='news-stand-icon'/>뉴스스탠드</button>
            </h1>
            <span class='date display-medium16 text-default'>${this.todayDate}</span>
            `;
  }

  mounted() {
    new Icon(customQuerySelector('.news-stand-icon', this.$target), { name: 'newspaper' });
    new Icon(customQuerySelector('.news-stand-icon', this.$target), { name: 'newspaper' });
  }

  setEvent() {
    this.$target.addEventListener('click', () => location.reload());
  }
}
