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

    const commonButtonProps = {
      mainPressType: props.mainContentType,
      onClick: props.setPressType,
    };

    const allButtonProps = {
      ...commonButtonProps,
      inner: allButtonInner,
      className: "news-navbar_newspaper-list-all",
      changeType: "press",
      buttonType: "all",
    };

    const myButtonProps = {
      ...commonButtonProps,
      inner: myButtonInner,
      className: "news-navbar_newspaper-list-my",
      changeType: "press",
      buttonType: "my",
    };

    new Button($div, allButtonProps);
    new Button($div, myButtonProps);

    $target.appendChild($div);
  };

  this.render();
}
