import Button from '../components/Button.js';
import SnackBar from '../components/SnackBar.js';
import UnsubAlert from '../components/UnsubAlert.js';
import { MEDIA, MEDIA_APP_DATA, MSG } from '../constants.js';
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
    if (document.querySelector('.alert') !== null) return;
    document.querySelector('#media_view').appendChild(
      UnsubAlert(id, name, id => {
        const { media, view, subscribed } = this.getState();
        const { page, media: sub } = viewStore.getState();

        subscribed.splice(subscribed.indexOf(id), 1);
        if (media !== 'subscribed') {
          return button.replaceWith(
            Button(this.buttonData({ id, name, viewStore }))
          );
        }
        if (subscribed.length === 0) return this.setState({});

        const newPage =
          view === 'grid'
            ? Math.min(Math.ceil(sub.length / MEDIA.PAGE_SIZE) - 1, page)
            : page % sub.length;

        viewStore.setState({ page: newPage });
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
