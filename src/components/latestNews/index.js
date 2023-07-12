import latestNewsTitle from "../../data/latestNewsData.js";

export default class LatestNews {
  constructor() {
    this.$wrapper = document.createElement("div");
    this.$wrapper.className = "latest-main-news";

    // interval 변수 초기화
    this.leftInterval = 0;
    this.rightInterval = 0;

    this.LATEST_NEWS_COUNT = 6;
    this.ROLLING_SPEED = 5000;

    this.render();
    return this.$wrapper;
  }

  render() {
    this.$wrapper.appendChild(this.createLatestContainer("left"));
    this.$wrapper.appendChild(this.createLatestContainer("right"));
  }

  /**
   * 헤드라인 컴포넌트 구현
   */
  createLatestContainer(location) {
    const $container = document.createElement("div");
    const $hiddenCompoent = document.createElement("div");
    $hiddenCompoent.className = "text--wrapper";
    $container.className = "latest--container";

    $hiddenCompoent.appendChild(this.createContentWrapper(location));

    $container.appendChild(this.createPressName("연합뉴스"));
    $container.appendChild($hiddenCompoent);

    return $container;
  }

  /**
   * 언론사 이름 컴포넌트 구현
   */
  createPressName(name) {
    const $name = document.createElement("span");
    $name.innerText = name;
    return $name;
  }

  /**
   * 롤링 컴포넌트 구현
   */
  createContentWrapper(location) {
    const $wrapper = document.createElement("div");
    $wrapper.className = `auto-rolling-news ${location}`;

    latestNewsTitle.forEach((news) =>
      $wrapper.appendChild(this.createContent(news.title))
    );
    $wrapper.appendChild(this.createContent(latestNewsTitle[0].title));

    location === "left"
      ? this.handleLeftRolling($wrapper, 1)
      : this.handleRightRolling($wrapper, 1);

    return $wrapper;
  }

  /**
   * 헤드라인 컴포넌트 구현
   */
  createContent(content) {
    const $content = document.createElement("p");

    $content.innerText = content;

    $content.addEventListener("mouseenter", (e) => this.handleRollingPause(e));
    $content.addEventListener("mouseleave", (e) =>
      this.handleRollingRestart(e)
    );

    return $content;
  }

  /* 롤링 구현 함수 (왼쪽) */
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

  /* 롤링 구현 함수 (오른쪽) */
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

  /**
   * hover 시 멈춤 기능 함수
   */
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

  /**
   * 마우스 아웃 시 롤링 재시작 기능 함수
   */
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
