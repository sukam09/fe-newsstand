import Component from '../Component.js';
import AllNewHeader from './AllNewHeader.js';
import AllNewsGrid from './AllNewsGrid.js';

export default class AllNews extends Component {
  template() {
    return `<div class='all-news-header'></div>
            <div class='grid-wrapper'></div>`;
  }

  mounted() {
    new AllNewHeader(this.$target.querySelector('.all-news-header'));
    new AllNewsGrid(this.$target.querySelector('.grid-wrapper'));
  }
}
