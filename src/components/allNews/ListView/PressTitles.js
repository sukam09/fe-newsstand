export default class PressTitles {
  constructor(name, titles) {
    this.$wrapper = document.createElement("div");
    this.$wrapper.className = "press-titles";

    this.name = name;
    this.titles = titles;
    this.render();

    return this.$wrapper;
  }

  render() {
    const $subText = document.createElement("p");
    $subText.classList.add("pressTitles-subText");

    this.titles.forEach((title) => {
      this.$wrapper.appendChild(this.createPressTitle(title.title));
    });
    $subText.innerText = `${this.name} 언론사에서 직접 편집한 뉴스입니다.`;
    this.$wrapper.appendChild($subText);
  }

  createPressTitle(text) {
    const $title = document.createElement("p");
    $title.classList.add("pressTitles-title");
    $title.innerText = text;

    return $title;
  }
}
