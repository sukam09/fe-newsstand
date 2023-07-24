export default function SnackBar({ $target, initialState }) {
  this.state = initialState;

  this.setState = nextState => {
    this.state = nextState;
    this.render();
  };

  const { text } = this.state;

  const $div = document.createElement('div');
  $div.classList.add('snack-bar');
  $target.appendChild($div);

  this.render = () => {
    if (this.state.isShow) {
      $div.classList.remove('hidden');
    } else {
      $div.classList.add('hidden');
    }

    $div.textContent = text;
  };

  this.render();
}
