/* 
리스트 뉴스 컨테이너 컴포넌트
*/

export default function SubNews($target, props) {
  this.render = () => {
    const $div = document.createElement("div");
    const $ul = document.createElement("ul");

    $div.setAttribute("class", "sub-news");

    let inner = props.subTitles.reduce(
      (accumulator, currentValue) => accumulator + `<li>${currentValue}</li>`,
      ""
    );

    $ul.innerHTML =
      inner +
      `
    <li class="caption">${props.press} 언론사에서 직접 편집한 뉴스입니다.</li>
    `;
    $div.appendChild($ul);
    $target.appendChild($div);
  };

  this.render();
}
