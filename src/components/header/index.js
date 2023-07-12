import { getTodayDate } from '../../utils/index.js';
import Component from '../core/Component.js';
import Icon from '../common/Icon.js';

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
    new Icon(this.$target.querySelector('.news-stand-icon'), { name: 'newspaper' });
    new Icon(this.$target.querySelector('.news-stand-icon'), { name: 'newspaper' });
  }

  setEvent() {
    this.$target.addEventListener('click', () => location.reload());
  }
}
