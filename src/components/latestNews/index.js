export default class LatestNews {
  constructor() {
    this.$wrapper = document.createElement("div");
    this.$wrapper.className = "latest-main-news";

    this.LATEST_NEWS_COUNT = 5;
    this.ROLLING_SPEED = 2000;

    this.render();
    return this.$wrapper;
  }

  render() {
    this.$wrapper.appendChild(this.createLatesNewsContainer("left"));
    this.$wrapper.appendChild(this.createLatesNewsContainer("right"));
  }

  createLatesNewsContainer(location) {
    const $container = document.createElement("div");
    const $hiddenCompoent = document.createElement("div");
    const $wrapper = document.createElement("div");
    $container.className = "latest--container";
    $hiddenCompoent.className = "text--wrapper";
    $wrapper.className = "auto-rolling-news";

    // for (let i = 0; i < this.LATEST_NEWS_COUNT; i++) {}
    $wrapper.appendChild(this.createLatestNewsComponent("연합뉴스", `[1보] 1`));
    $wrapper.appendChild(this.createLatestNewsComponent("연합뉴스", `[1보] 2`));
    $wrapper.appendChild(this.createLatestNewsComponent("연합뉴스", `[1보] 3`));
    $wrapper.appendChild(this.createLatestNewsComponent("연합뉴스", `[1보] 4`));
    $wrapper.appendChild(this.createLatestNewsComponent("연합뉴스", `[1보] 5`));
    $wrapper.appendChild(this.createLatestNewsComponent("연합뉴스", `[1보] 1`));

    this.handleRolling($wrapper);

    $hiddenCompoent.appendChild($wrapper);
    $container.appendChild($hiddenCompoent);

    return $container;
  }

  createLatestNewsComponent(name, content) {
    const $component = document.createElement("div");
    $component.className = "latest--content";

    const $newsName = document.createElement("span");
    const $newsContent = document.createElement("p");

    $newsName.innerText = name;
    $newsContent.innerText = content;

    $component.appendChild($newsName);
    $component.appendChild($newsContent);

    return $component;
  }

  handleRolling(wrapper) {
    let order = 1;

    let interval = setInterval(() => {
      if (order > this.LATEST_NEWS_COUNT) {
        wrapper.classList.remove("play" + (order - 1));
        order = 0;
        clearInterval(interval);
      }
      wrapper.classList.add("play" + order);
      wrapper.classList.remove("play" + (order - 1));
      order += 1;
    }, this.ROLLING_SPEED);
  }
}
