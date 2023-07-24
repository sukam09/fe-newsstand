import Component from '../core/Component.js';
import Icon from '../common/Icon.js';
import { customQuerySelector } from '../../utils/index.js';
import { TEXT } from '../../constants/index.js';
import { viewStore } from '../../../store/index.js';

export default class AllNewHeader extends Component {
  setup() {
    this.state = {
      modeIcon: viewStore.isDarkMode() ? 'moon' : 'sun',
    };
  }
  template() {
    return `
      <nav class="view-type-wrapper">
        <span id='all-press' class="${
          this.props.option === 'all'
            ? 'selected-bold16 text-strong'
            : 'available-medium16 text-weak'
        }">전체 언론사</span>
        <span id='my-press' class="${
          this.props.option === 'subscribed'
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
    const listIconName = viewStore.viewType === TEXT.LIST ? 'list-view-focus' : 'list-view';
    const gridIconName = viewStore.viewType === TEXT.GRID ? 'grid-view-focus' : 'grid-view';

    new Icon(customQuerySelector('#list-view-icon', this.$target), { name: listIconName });
    new Icon(customQuerySelector('#grid-view-icon', this.$target), { name: gridIconName });
  }

  setEvent() {
    this.$target.addEventListener('click', ({ target }) => {
      switch (target.id) {
        case 'list-view-icon':
          viewStore.toggleViewType(TEXT.LIST);
          break;
        case 'grid-view-icon':
          viewStore.toggleViewType(TEXT.GRID);
          break;
        case 'all-press':
          viewStore.toggleOption(TEXT.ALL);
          break;
        case 'my-press':
          viewStore.toggleOption(TEXT.SUBSCRIBE_EN);
          break;
        case 'darkmode-icon':
          viewStore.toggleColorMode();
          break;
      }
    });
  }
}
