import SnackBar from '../components/SnackBar.js';
import UnsubAlert from '../components/media/UnsubAlert.js';
import { MEDIA_APP_DATA, MSG } from '../constants.js';
import Store from '../core/Store.js';

class NavStore extends Store {
  constructor() {
    super({
      data: MEDIA_APP_DATA,
      subscribed: [],
      media: 'all',
      view: 'grid',
    });
  }

  defaultView(media) {
    return media === 'all' ? 'grid' : 'list';
  }

  setView(name, media) {
    const newState = { [name]: media };

    if (name === 'media') newState.view = this.defaultView(media);
    this.setState(newState);
  }

  subMedia(id) {
    document.querySelector('#media_view').appendChild(
      SnackBar(MSG.SUBSCRIBE, () => {
        const { media, view } = this.getState();

        if (media === 'subscribed' && view === 'list') return;
        this.setState({ media: 'subscribed', view: 'list' });
      })
    );
    this.getState().subscribed.push(id);
  }

  unsubMedia(id, name, viewStore, button) {
    document.querySelector('#media_view').appendChild(
      UnsubAlert(id, name, id => {
        const { media, subscribed } = this.getState();
        const { page, media: sub } = viewStore.getState();

        subscribed.splice(subscribed.indexOf(id), 1);
        if (media === 'subscribed') {
          viewStore.setState({ page: page % sub.length });
        } else {
          button.replaceWith(SubButton(id, this));
        }
      })
    );
  }

  buttonData({ id, name, viewStore, withText = true }) {
    if (this.getState().subscribed.includes(id)) {
      return {
        icon: 'close',
        isWhite: false,
        text: withText ? MSG.BUTTON_UNSUB : null,
        onClick: button => {
          this.unsubMedia(id, name, viewStore, button);
        },
      };
    }
    return {
      icon: 'plus',
      isWhite: true,
      text: MSG.BUTTON_SUB,
      once: true,
      onClick: () => this.subMedia(id),
    };
  }
}

export default NavStore;
