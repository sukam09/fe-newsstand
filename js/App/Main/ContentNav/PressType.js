/* 
Main 컴포넌트의 컨텐츠를 변경하는 네비게이션 컴포넌트
*/
import Button from "./Button.js";

const allButtonInner = "전체 언론사";
const myButtonInner = "내가 구독한 언론사";

export default function PressType($target, props) {
  this.render = () => {
    const $div = document.createElement("div");
    $div.setAttribute("class", "news-navbar_newspaper");

    new Button($div, {
      inner: allButtonInner,
      className: "news-navbar_newspaper-list-all",
      changeType: "press",
      buttonType: "all",
      mainPressType: props.mainContentType,
      onClick: props.setPressType,
    });

    new Button($div, {
      inner: myButtonInner,
      className: "news-navbar_newspaper-list-my",
      changeType: "press",
      buttonType: "my",
      mainPressType: props.mainContentType,
      onClick: props.setPressType,
    });

    $target.appendChild($div);
  };

  this.render();
}
