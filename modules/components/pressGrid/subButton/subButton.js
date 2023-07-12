// 구독버튼 생성
export function subButton(press) {
  const $subButtonContainer = document.createElement("div");
  const subscribe = () => {
    press.isSub = true;
    toggleSubButton(press, subButtonContainer);
  };
  $subButtonContainer.addEventListener("click", subscribe);
  $subButtonContainer.innerHTML += `<button class="sub_button"> + 구독하기</button>`;

  return `
  <div class="sub_button_container">
    <button class="sub_button"> + 구독하기</button>
  </div>
  `;
}
