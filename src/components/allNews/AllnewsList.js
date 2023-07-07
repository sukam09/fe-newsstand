export default class AllNewsList {
  constructor(name) {
    const $component = document.createElement('li');
    $component.innerText = name;

    this.render();
    return $component;
  }

  render() {}
}
