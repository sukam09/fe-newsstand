import Component from '../core/Component.js';
import Icon from '../common/Icon.js';

export default class AllNewHeader extends Component {
  setup() {
    const isCurrentDarkMode = document.body.className === 'dark';
    this.state = {
      modeIcon: isCurrentDarkMode ? 'sun' : 'moon',
    };
  }
  template() {
    return `<nav class='view-type-wrapper'>
            <span class='selected-bold16 text-strong'>전체 언론사</span>        
            <span class='available-medium16 text-weak'>내가 구독한 언론사</span>
            </nav>

            <div class='view-type-icon'>
            <img id="darkmode-icon" src="src/assets/icons/${this.state.modeIcon}.png" />
            <img id ='list-view-icon' class='icon-medium'/>
            <img id ='grid-view-icon' class='icon-medium'/>
            </div>`;
  }

  mounted() {
    const listIconName = this.props.view === 'list' ? 'list-view-focus' : 'list-view';
    const gridIconName = this.props.view === 'grid' ? 'grid-view-focus' : 'grid-view';

    new Icon(this.$target.querySelector('#list-view-icon'), { name: listIconName });
    new Icon(this.$target.querySelector('#grid-view-icon'), { name: gridIconName });
  }

  setEvent() {
    this.$target.addEventListener('click', e => {
      const id = e.target.id;

      if (id === 'list-view-icon') {
        this.props.onClick('list');
      } else if (id === 'grid-view-icon') {
        this.props.onClick('grid');
      } else if (id === 'darkmode-icon') {
        const isCurrentDarkMode = document.body.className === 'dark';
        const nextModeIcon = isCurrentDarkMode ? 'moon' : 'sun';

        document.body.className = isCurrentDarkMode ? 'light' : 'dark';
        this.setState({ modeIcon: nextModeIcon });
      }
    });
  }
}
