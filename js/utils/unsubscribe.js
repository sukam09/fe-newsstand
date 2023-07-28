import { handleElementClass, removeChildElement } from "../utils/util.js";
import { setUnsubscribe } from "../store/dispatch.js";
import { makeUnSubTag } from "../tag/unsubTag.js";

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
  handleElementClass(parent, "remove", "modal__none");

  unsub.addEventListener("click", () => {
    handleElementClass(parent, "add", "modal__none");
    setUnsubscribe(name);
  });

  no.addEventListener("click", () => {
    handleElementClass(parent, "add", "modal__none");
  });
}
