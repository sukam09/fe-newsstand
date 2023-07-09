import { getTodayDate } from '../../utils/index.js';
import Component from '../Component.js';
import Icon from '../common/Icon.js';

export default class Header extends Component {
  template() {
    const todayDate = getTodayDate();

    return `<h1><button class='news-stand-logo'>
              <img/>뉴스스탠드</button></h1>
            <span class='date'>${todayDate}</span>`;
  }

  mounted() {
    new Icon(this.$target.querySelector('img'), { name: 'newspaper' });
  }

  setEvent() {
    this.$target.addEventListener('click', () => location.reload());
  }
}
