export default class Logo {
  constructor({ name }) {
    this.$img = document.createElement('img');
    this.$img.className = 'press-logo';
    this.name = name;
    this.render();

    return this.$img;
  }

  render() {
    this.$img.src = `src/assets/logo/${this.name}.png`;
  }
}
