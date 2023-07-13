/*
롤링 컨텐츠 컴포넌트
*/
const WAITING_TIME = 1000;
const ANIMATION_TIME = 400;
const MOVE_TIME = ANIMATION_TIME;
const MOVE_PIXEL = -16;
const ROLLING_INTERVAL = 5000;

const pauseRolling = function (timer) {
  clearTimeout(timer);
};

const startRolling = function (rollingElement) {
  const removeRollingMotion = () => {
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

    setTimeout(removeRollingMotion, MOVE_TIME);
  };

  return setInterval(moveUpElement, ROLLING_INTERVAL);
};

export default function Rolling($target, props) {
  const startTime = props.startTime;
  let timeId;

  this.handleMouseOver = (elem) => {
    elem.style.textDecoration = "underline";
    pauseRolling(timeId);
  };

  this.handleMouseOut = (elem, rollingTarget) => {
    elem.style.textDecoration = "none";
    timeId = startRolling(rollingTarget.firstElementChild);
  };

  this.setHoverEvent = (target) => {
    let spanList = target.getElementsByClassName("newsflash__content__title");
    // HTMLCollection Type has not forEach
    HTMLCollection.prototype.forEach = Array.prototype.forEach;

    spanList.forEach((elem) => {
      elem.onmouseover = () => {
        this.handleMouseOver(elem);
      };
      elem.onmouseout = () => {
        this.handleMouseOut(elem, target);
      };
    });
  };

  this.render = () => {
    const $rollingBox = document.createElement("div");
    $rollingBox.setAttribute("class", "newsflash__content");

    // 컨텐츠가 보여지는 영역
    const $rollingDiv = document.createElement("div");
    $rollingDiv.setAttribute("class", "rolling");

    $rollingDiv.innerHTML = `
    <ul>
    <li>
      <div class="newsflash__content__newspaper">연합뉴스</div>
      <span class="newsflash__content__title">
        [1보] 김기현•안철수•천하람•황교안, 여전대 본경선 진출
      </span>
    </li>
    <li>
      <div class="newsflash__content__newspaper">연합뉴스</div>
      <span class="newsflash__content__title">
        [2보] 김기현•안철수•천하람•황교안, 여전대 본경선 진출
      </span>
    </li>
    <li>
      <div class="newsflash__content__newspaper">연합뉴스</div>
      <span class="newsflash__content__title">
        [3보] 김기현•안철수•천하람•황교안, 여전대 본경선 진출
      </span>
    </li>
    <li>
      <div class="newsflash__content__newspaper">연합뉴스</div>
      <span class="newsflash__content__title">
        [4보] 김기현•안철수•천하람•황교안, 여전대 본경선 진출
      </span>
    </li>
    <li>
      <div class="newsflash__content__newspaper">연합뉴스</div>
      <span class="newsflash__content__title">
        [5보] 김기현•안철수•천하람•황교안, 여전대 본경선 진출
      </span>
    </li>
  </ul>
  `;

    setTimeout(() => {
      timeId = startRolling($rollingDiv.firstElementChild);
    }, startTime * WAITING_TIME);

    this.setHoverEvent($rollingDiv);

    $rollingBox.appendChild($rollingDiv);
    $target.appendChild($rollingBox);
  };

  this.render();
}
