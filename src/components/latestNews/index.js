export default class LatestNews {
  constructor() {
    this.$wrapper = document.createElement("div");
    this.$wrapper.className = "latest-main-news";

    this.leftInterval = 0;
    this.rightInterval = 0;

    this.LATEST_NEWS_COUNT = 6;
    this.ROLLING_SPEED = 3000;

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
    $wrapper.className = `auto-rolling-news ${location}`;

    for (let i = 1; i < this.LATEST_NEWS_COUNT; i++) {
      $wrapper.appendChild(
        this.createLatestNewsComponent("연합뉴스", `[1보] ${i}`)
      );
    }
    $wrapper.appendChild(this.createLatestNewsComponent("연합뉴스", `[1보] 1`));

    location === "left"
      ? this.handleLeftRolling($wrapper, 1)
      : this.handleRightRolling($wrapper, 1);

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

    $component.addEventListener("mouseenter", (e) =>
      this.handleRollingPause(e)
    );
    $component.addEventListener("mouseleave", (e) =>
      this.handleRollingRestart(e)
    );

    return $component;
  }

  handleLeftRolling(wrapper, order) {
    this.leftInterval = setInterval(() => {
      if (order >= this.LATEST_NEWS_COUNT) {
        wrapper.classList.remove("left-play" + (order - 1));
        order = 0;
      }
      wrapper.classList.add("left-play" + order);
      wrapper.classList.remove("left-play" + (order - 1));
      order += 1;
    }, this.ROLLING_SPEED);
  }

  handleRightRolling(wrapper, order) {
    this.rightInterval = setInterval(() => {
      if (order >= this.LATEST_NEWS_COUNT) {
        wrapper.classList.remove("right-play" + (order - 1));
        order = 0;
      }
      wrapper.classList.add("right-play" + order);
      wrapper.classList.remove("right-play" + (order - 1));
      order += 1;
    }, this.ROLLING_SPEED);
  }

  handleRollingPause(event) {
    const $rollingContent = event.target;
    const $rollingDiv = event.target.parentNode;
    const classesOfRollingDiv = $rollingDiv.className;
    $rollingContent.style.textDecoration = "underline";
    // hover 시 멈춤 구현
    if (classesOfRollingDiv.includes("right")) {
      clearInterval(this.rightInterval);
    } else {
      clearInterval(this.leftInterval);
    }
  }

  handleRollingRestart(event) {
    const $rollingContent = event.target;
    const $rollingDiv = event.target.parentNode;
    const classesOfRollingDiv = $rollingDiv.className;
    $rollingContent.style.textDecoration = "none";
    // 롤링 재실행
    const playClass = classesOfRollingDiv.split(" ")[2];
    const playOrder = playClass ? +playClass[playClass.length - 1] + 1 : 1;
    if (classesOfRollingDiv.includes("right")) {
      this.handleRightRolling($rollingDiv, playOrder);
    } else {
      this.handleLeftRolling($rollingDiv, playOrder);
    }
  }
}
