import Icon from "../common/Icon.js";

/** 구독 버튼 요소 생성 */
export function createSubscribeButton() {
  const $subButton = document.createElement("button");
  const $plusIcon = new Icon({ name: "plus" });
  const $text = document.createElement("span");
  $subButton.classList.add("pressInfo-subButton");

  $text.innerText = "구독하기";
  $subButton.appendChild($plusIcon);
  $subButton.appendChild($text);

  return $subButton;
}
