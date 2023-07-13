/* 
Main 컴포넌트의 컨텐츠를 변경하는 네비게이션 컴포넌트
props: viewer, perssType, setViewer, setPressType
*/
import Button from "./Button.js";

const listButtonIcon = `<svg
class="view-line"
width="24"
height="24"
viewBox="0 0 24 24"
fill="none"
xmlns="http://www.w3.org/2000/svg"
>
<path
  d="M19 5V19H5V5H19ZM20.1 3H3.9C3.4 3 3 3.4 3 3.9V20.1C3 20.5 3.4 21 3.9 21H20.1C20.5 21 21 20.5 21 20.1V3.9C21 3.4 20.5 3 20.1 3ZM11 7H17V9H11V7ZM11 11H17V13H11V11ZM11 15H17V17H11V15ZM7 7H9V9H7V7ZM7 11H9V13H7V11ZM7 15H9V17H7V15Z"
/>
</svg>`;

const gridButtonIcon = `<svg
class="view-chess"
width="24"
height="24"
viewBox="0 0 24 24"
fill="none"
xmlns="http://www.w3.org/2000/svg"
>
<path
  d="M3 11V3H11V11H3ZM3 21V13H11V21H3ZM13 11V3H21V11H13ZM13 21V13H21V21H13ZM5 9H9V5H5V9ZM15 9H19V5H15V9ZM15 19H19V15H15V19ZM5 19H9V15H5V19Z"
/>
</svg>`;

export default function ViewerType($target, props) {
  this.render = () => {
    const $div = document.createElement("div");
    $div.setAttribute("class", "news-navbar_content");

    new Button($div, {
      inner: listButtonIcon,
      className: "news-navbar_content-news",
      changeType: "viewer",
      buttonType: "list",
      mainViewerType: props.mainContentType,
      onClick: props.setViewerType,
    });

    new Button($div, {
      inner: gridButtonIcon,
      className: "news-navbar_content-newspaper",
      changeType: "viewer",
      buttonType: "grid",
      mainViewerType: props.mainContentType,
      onClick: props.setViewerType,
    });

    $target.appendChild($div);
  };

  this.render();
}
