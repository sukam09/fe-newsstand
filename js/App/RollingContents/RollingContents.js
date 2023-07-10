/*
롤링 컨텐츠 컴포넌트
*/

const setRollingEvent = function (rollingElement, time) {
  setTimeout(() => {
    window.setInterval(function () {
      rollingElement.style.transitionDuration = "400ms";
      rollingElement.style.marginTop = "-16px";

      window.setTimeout(function () {
        rollingElement.removeAttribute("style");
        rollingElement.appendChild(rollingElement.firstElementChild);
      }, 400);
    }, 5000);
  }, time * 1000);
};

export default function Rolling($target, props) {
  const mode = props.mode;
  const startTime = props.startTime;

  this.render = () => {
    const $rollingBox = document.createElement("div");
    $rollingBox.setAttribute("class", "newsflash__content");

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
    setRollingEvent($rollingDiv.firstElementChild, startTime);
    $rollingBox.appendChild($rollingDiv);
    $target.appendChild($rollingBox);
  };

  this.render();
}
