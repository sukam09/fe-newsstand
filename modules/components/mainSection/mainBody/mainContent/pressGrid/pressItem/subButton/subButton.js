// 구독버튼 생성
export function subButton() {
  return `
  <div class="sub_button_container">
    <button class="sub_button"> + 구독하기</button>
    <button class="unsub_button"> x 해지하기</button>
  </div>
  `;
}

export function subscribe(press) {
  press.isSub = true;
  toggleSubButton(press, subButtonContainer);
}

export function unsubscrib(press) {
  press.isSub = false;
  toggleSubButton(press, subButtonContainer);
}
