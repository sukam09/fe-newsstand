export default function SubscribeButton({ $target, initialState }) {
  this.state = initialState;

  this.setState = nextState => {
    this.state = nextState;
    this.render();
  };

  const { type } = this.state;

  const $button = document.createElement('button');
  $target.appendChild($button);

  this.render = () => {
    const { type, isSubscribed } = this.state;
    const className = `${type}-${isSubscribed ? 'unsubscribe' : 'subscribe'}-button`;
    const icon = `${isSubscribed ? 'closed' : 'plus'}`;
    const text = `${isSubscribed ? '해지하기' : '구독하기'}`;

    $button.className = className;

    $button.innerHTML = `
      <img src="../asset/icons/${icon}.svg" />
      <p>${text}</p>
    `;
  };

  this.render();
}
