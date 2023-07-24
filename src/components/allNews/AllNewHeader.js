import Component from '../core/Component.js';
import Icon from '../common/Icon.js';
import { customQuerySelector } from '../../utils/index.js';
import { TEXT } from '../../constants/index.js';
import { viewStore } from '../../../store/index.js';

export default class AllNewHeader extends Component {
  setup() {
    const isCurrentDarkMode = document.body.className === 'dark';
    this.state = {
      modeIcon: isCurrentDarkMode ? 'moon' : 'sun',
    };
  }
  template() {
    return `
      <nav class="view-type-wrapper">
        <span id='all-press' class="${
          this.props.type === 'all' ? 'selected-bold16 text-strong' : 'available-medium16 text-weak'
        }">전체 언론사</span>
        <span id='my-press' class="${
          this.props.type === 'subscribed'
            ? 'selected-bold16 text-strong'
            : 'available-medium16 text-weak'
        }">내가 구독한 언론사</span>
      </nav>

      <div class="view-type-icon">
        <img id="darkmode-icon" src="src/assets/icons/${this.state.modeIcon}.png" />
        <img id="list-view-icon" class="icon-medium" />
        <img id="grid-view-icon" class="icon-medium" />
      </div>`;
  }

  mounted() {
    const listIconName = this.props.view === TEXT.LIST ? 'list-view-focus' : 'list-view';
    const gridIconName = this.props.view === TEXT.GRID ? 'grid-view-focus' : 'grid-view';

    new Icon(customQuerySelector('#list-view-icon', this.$target), { name: listIconName });
    new Icon(customQuerySelector('#grid-view-icon', this.$target), { name: gridIconName });
  }

  setEvent() {
    this.$target.addEventListener('click', e => {
      switch (e.target.id) {
        case 'list-view-icon':
          this.props.onClick({ view: TEXT.LIST });
          break;
        case 'grid-view-icon':
          this.props.onClick({ view: TEXT.GRID });
          break;
        case 'darkmode-icon':
          viewStore.toggleColorMode();
          break;
        case 'all-press':
          this.props.onClick({ pressType: TEXT.ALL });
          break;
        case 'my-press':
          this.props.onClick({ pressType: TEXT.SUBSCRIBE_EN });
          break;
        default:
      }
    });
  }
}
