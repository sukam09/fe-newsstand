import Component from '../Component.js';
import Icon from '../common/Icon.js';

export default class AllNewHeader extends Component {
  template() {
    return `<nav class='view-type-wrapper'>
            <span class='selected-bold16 text-strong'>전체 언론사</span>        
            <span class='available-medium16 text-weak'>내가 구독한 언론사</span>
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
