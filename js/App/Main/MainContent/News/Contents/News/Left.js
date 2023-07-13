/* 
리스트 뉴스 컨테이너 컴포넌트
*/

export default function Left($target, props) {
  this.render = () => {
    const $div = document.createElement("div");
    const $img = document.createElement("img");
    const $childDiv = document.createElement("div");

    $div.setAttribute("class", "main-news");
    $childDiv.setAttribute("class", "main-title");

    $img.src = props.mainThumbnail;
    $childDiv.innerHTML = props.mainNewsTitle;

    $div.appendChild($img);
    $div.appendChild($childDiv);

    $target.appendChild($div);
  };

  this.render();
}
