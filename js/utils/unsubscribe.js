import { removeChildElement } from "../utils/util.js";
import { setUnsubscribe } from "../store/dispatch.js";
export function unsubscribeModal(name) {
  const parent = document.querySelector(".modal__snack-bar-un");
  removeChildElement(parent);
  makeUnSubTag();

  const title = document.querySelector(".modal__unsub-publisher");
  const unsub = document.querySelector(".modal__unsub-title");
  const no = document.querySelector(".modal__no-title");

  // 언론사 타이틀 변경
  title.textContent = name;

  // display none -> 보이도록
  parent.classList.remove("modal__none");

  unsub.addEventListener("click", () => {
    setUnsubscribe(name);
    parent.classList.add("modal__none");
  });

  no.addEventListener("click", () => {
    parent.classList.add("modal__none");
  });
}

function makeUnSubTag() {
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
