export default function SubscribeButton({ $target, initialState }) {
  this.state = initialState;

  this.setState = nextState => {
    this.state = nextState;
    this.render();
  };

  const { type } = this.state;

  const $button = document.createElement('button');
  $button.classList.add(`${type}-subscribe-button`);
  $target.appendChild($button);

  this.render = () => {
    $button.innerHTML = `
      <img src="../asset/icons/plus.svg" />
      <p>${this.state.isSubscribed ? '해지하기' : '구독하기'}</p>
    `;
  };

  this.render();
}
