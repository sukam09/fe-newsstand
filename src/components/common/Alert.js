import { store, actionCreator } from '../../../core/store.js';

export default function Alert({ $target, initialState }) {
  this.state = initialState;

  this.setState = nextState => {
    this.state = nextState;
    this.render();
  };

  const $div = document.createElement('div');
  $div.classList.add('alert');

  $target.appendChild($div);

  // Optimistic UI 적용
  const handleUnsubscribe = () => {
    const { subscribeButton } = this.state;
    subscribeButton.setState({ ...subscribeButton.state, isSubscribed: false });
    this.setState({ ...this.state, isShow: false });
    store.dispatch(actionCreator('unsubscribe', { pid: this.state.pid }));
  };

  const handleClose = () => {
    this.setState({ ...this.state, isShow: false });
  };

  this.render = () => {
    const { isShow, pressName } = this.state;

    if (isShow) {
      $div.classList.remove('hidden');
    } else {
      $div.classList.add('hidden');
    }

    $div.innerHTML = `
      <div class="alert-frame">
        <div>
          <div><span>${pressName}</span>을(를)</div>
          <div>구독해지하시겠습니까?</div>
        </div>
      </div>
      <div class="alert-button">
        <button class="positive-button">예, 해지합니다</button>
        <button class="negative-button">아니오</button>
      </div>
    `;

    const [$positiveButton, $negativeButton] = $div.querySelectorAll('button');
    $positiveButton.addEventListener('click', handleUnsubscribe);
    $negativeButton.addEventListener('click', handleClose);
  };

  this.render();
}
