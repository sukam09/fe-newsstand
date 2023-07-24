/*
롤링 컨텐츠 컴포넌트
*/

import Component from "../../utils/Component.js";

const WAITING_TIME = 1000;
const ANIMATION_TIME = 400;
const MOVE_PIXEL = -16;

const ROLLING_INTERVAL = 5000;

const titleArr = [
  {
    press: "연합뉴스",
    title: "[1보] 김기현•안철수•천하람•황교안, 여전대 본경선 진출",
  },
  {
    press: "연합뉴스",
    title: "[2보] 김기현•안철수•천하람•황교안, 여전대 본경선 진출",
  },
  {
    press: "연합뉴스",
    title: "[3보] 김기현•안철수•천하람•황교안, 여전대 본경선 진출",
  },
  {
    press: "연합뉴스",
    title: "[4보] 김기현•안철수•천하람•황교안, 여전대 본경선 진출",
  },
  {
    press: "연합뉴스",
    title: "[5보] 김기현•안철수•천하람•황교안, 여전대 본경선 진출",
  },
];

const pauseRolling = function (timer) {
  clearTimeout(timer);
};

const startRolling = function (rollingElement) {
  const stopMoveUp = () => {
    rollingElement.removeAttribute("style");
    rollingElement.appendChild(rollingElement.firstElementChild);
    /*
        Node.appendChild() 메소드는 한 노드를 특정 부모 노드의 자식 노드 리스트 중 마지막 자식으로 붙입니다. 
        만약 주어진 노드가 이미 문서에 존재하는 노드를 참조하고 있다면 appendChild() 메소드는 노드를 현재 위치에서 새로운 위치로 이동시킵니다. 
        (문서에 존재하는 노드를 다른 곳으로 붙이기 전에 부모 노드로 부터 지워버릴 필요는 없습니다.)
        https://developer.mozilla.org/ko/docs/Web/API/Node/appendChild
      */
  };

  const moveUpElement = () => {
    rollingElement.style.transitionDuration = `${ANIMATION_TIME}ms`;
    rollingElement.style.marginTop = `${MOVE_PIXEL}px`;

    setTimeout(stopMoveUp, ANIMATION_TIME);
  };

  return setInterval(moveUpElement, ROLLING_INTERVAL);
};

function RollingContents($target, props) {
  Component.call(this, $target, props);

  this.timeId;
  this.init = false;
  this.rolling;
}

Object.setPrototypeOf(RollingContents.prototype, Component.prototype);

RollingContents.prototype.template = function () {
  const createList = (accumulator, currentValue) => {
    return (
      accumulator +
      `
      <li>
      <div class="newsflash__content__newspaper">${currentValue.press}</div>
      <span class="newsflash__content__title">
        ${currentValue.title}
      </span>
      </li>
      `
    );
  };

  return `
  <ul>
    ${titleArr.reduce(createList, "")}
  </ul>
`;
};

RollingContents.prototype.setEvent = function () {
  const on = function ({ target }) {
    target.style.textDecoration = "underline";
    pauseRolling(this.timeId);
  };

  const out = function ({ target }) {
    target.style.textDecoration = "none";
    this.timeId = startRolling(this.rolling);
  };

  const handleMouseOver = on.bind(this);
  const handleMouseOut = out.bind(this);

  if (!this.init) {
    this.$el.addEventListener("mouseover", handleMouseOver);

    this.$el.addEventListener("mouseout", handleMouseOut);

    this.init = true;
  }
};

RollingContents.prototype.mounted = function () {
  this.rolling = this.$el.querySelector("ul");

  setTimeout(() => {
    this.timeId = startRolling(this.rolling);
  }, this.props.startTime * WAITING_TIME);
};

export default RollingContents;
