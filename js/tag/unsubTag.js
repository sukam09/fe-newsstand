export function makeUnSubTag() {
  const parent = document.querySelector(".modal__snack-bar-un");

  const child = `
        <div class="modal__warning">
          <div>
            <span class="modal__unsub-publisher">여성경제신문</span
            ><span>을(를)</span>
          </div>
          <div>
            <span>구독해지하시겠습니까?</span>
          </div>
        </div>
        <div class="modal__un-option">
          <div class="modal__unsub-title">예, 해지합니다</div>
          <div class="modal__no-title">아니오</div>
        </div>
    `;

  parent.innerHTML = child;
}
