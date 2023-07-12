/* 
리스트 뉴스 컨테이너 컴포넌트
*/

export default function Left($target, props) {
  this.state = "light";

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const $div = document.createElement("div");
    const $img = document.createElement("img");
    const $childDiv = document.createElement("div");

    $div.setAttribute("class", "main-news");
    $childDiv.setAttribute("class", "main-title");

    $img.src = "./assets/img/Thumbnail.png";
    $childDiv.innerHTML = "또 국민연금의 몽니…현대百 지주사 불발";

    $div.appendChild($img);
    $div.appendChild($childDiv);

    $target.appendChild($div);
  };

  this.render();
}
