// (부모, 좌측버튼 클래스, 우측버튼 클래스)
export function makeButtonTag(location, left = "", right = "") {
  const parentNode = document.querySelector(location);
  const buttonTag = `
    <button class="newsstand--left-btn ${left}">
        <img src="./assets/basicIcon/LeftButton.png" alt="" />
    </button>
    <button class="newsstand--right-btn ${right}">
        <img src="./assets/basicIcon/RightButton.svg" alt="" />
    </button>
    `;

  parentNode.innerHTML += buttonTag;
}
