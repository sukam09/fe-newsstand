// 구독버튼 생성
export function unSubButton(press) {
  const unsubscribe = () => {
    press.isSub = false;
    toggleSubButton(press, subButtonContainer);
    console.log(press);
  };

  return `
    <div class="sub_button_container">
      <button class="unsub_button"> x 해지하기</button>
    </div>
    `;
}
