/* 
리스트 뷰  헤더 컴포넌트
*/
import store from "../../../../../Store/Store.js";

export default function Contents($target, props) {
  this.render = () => {
    const $header = document.createElement("header");
    const $img = document.createElement("img");
    const $div = document.createElement("div");
    const $button = document.createElement("button");

    $header.setAttribute("class", "list-header");
    $img.setAttribute("class", "list-img");
    $div.setAttribute("class", "list-edit");
    $button.setAttribute("class", "subscribe-btn");

    $img.src = props.pressLogo;
    $div.innerHTML = props.editDate;
    $button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none">
    <path d="M19 12.998H13V18.998H11V12.998H5V10.998H11V4.99799H13V10.998H19V12.998Z" fill="#879298"/>
    </svg> 구독하기`;

    $header.appendChild($img);
    $header.appendChild($div);
    $header.appendChild($button);

    $target.appendChild($header);
  };

  this.render();
}
