import Component from '../Component.js';
import Icon from '../common/Icon.js';

export default class AllNewHeader extends Component {
  template() {
    return `<nav class='view-type-wrapper'>
            <span>전체 언론사</span>        
            <span>내가 구독한 언론사</span>
            </nav>

            <div class='view-type-icon'>
            <img id ='list-view-icon'/>
            <img id ='grid-view-icon'/>
            </div>`;
  }

  mounted() {
    new Icon(this.$target.querySelector('#list-view-icon'), { name: 'list-view' });
    new Icon(this.$target.querySelector('#grid-view-icon'), { name: 'grid-view' });
  }
}
