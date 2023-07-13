export function makeButtonTag(location, disabled = "") {
  const parentNode = document.querySelector(location);
  const buttonTag = `
    <button class="newsstand--left-btn ${disabled}">
            <img src="./assets//basicIcon/LeftButton.png" alt="" />
    </button>
    <button class="newsstand--right-btn">
            <img src="./assets/basicIcon/RightButton.svg" alt="" />
    </button>
    `;

  parentNode.innerHTML += buttonTag;
}
