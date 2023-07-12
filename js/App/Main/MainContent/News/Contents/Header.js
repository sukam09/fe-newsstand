/* 
리스트 뷰  헤더 컴포넌트
*/
export default function Contents($target, props) {
  this.state = "light";

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const $header = document.createElement("header");
    const $img = document.createElement("img");
    const $div = document.createElement("div");
    const $button = document.createElement("button");

    $header.setAttribute("class", "list-header");
    $img.setAttribute("class", "list-img");
    $div.setAttribute("class", "list-edit");
    $button.setAttribute("class", "subscribe-btn");

    $img.src = `./assets/newspaper/${props.mode}/${1}.png`;
    $div.innerHTML = "2023.02.10 18:27 편집";
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
