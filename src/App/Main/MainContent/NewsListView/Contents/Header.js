/* 
리스트 뷰  헤더 컴포넌트
*/
import store from "../../../../../Store/Store.js";

const subscribeButtonInner = `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none">
<path d="M19 12.998H13V18.998H11V12.998H5V10.998H11V4.99799H13V10.998H19V12.998Z" fill="#879298"/>
</svg> 구독하기`;

const unsubscribeButtonInner = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
<rect x="0.5" y="0.5" width="23" height="23" rx="11.5" fill="white"/>
<path d="M9.6 15L9 14.4L11.4 12L9 9.6L9.6 9L12 11.4L14.4 9L15 9.6L12.6 12L15 14.4L14.4 15L12 12.6L9.6 15Z" fill="#879298"/>
<rect x="0.5" y="0.5" width="23" height="23" rx="11.5" stroke="#D2DAE0"/>
</svg>`;

export default function Contents($target, props) {
  this.render = () => {
    const $header = document.createElement("header");
    const $img = document.createElement("img");
    const $div = document.createElement("div");
    const $button = document.createElement("button");

    $header.setAttribute("class", "list-header");
    $img.setAttribute("class", "list-img");
    $div.setAttribute("class", "list-edit");

    if (!store.isSubscribed(props.pressId)) {
      $button.setAttribute("class", "subscribe-btn");
      $button.innerHTML = subscribeButtonInner;
      $button.addEventListener("click", () => {
        store.dispatch("구독하기", props.pressId);
        $button.classList.remove("subscribe-btn");
        $button.innerHTML = unsubscribeButtonInner;
      });
    } else {
      $button.innerHTML = unsubscribeButtonInner;
      $button.addEventListener("click", () => {
        store.dispatch("해지하기", props.pressId);
        $button.setAttribute("class", "subscribe-btn");
        $button.innerHTML = subscribeButtonInner;
      });
    }

    $img.src = props.pressLogo;
    $div.innerHTML = props.editDate;

    $header.appendChild($img);
    $header.appendChild($div);
    $header.appendChild($button);

    $target.appendChild($header);
  };

  this.render();
}
