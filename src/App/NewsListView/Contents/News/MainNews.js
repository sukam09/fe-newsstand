/* 
리스트 뉴스 컨테이너 컴포넌트
*/

const findTargetChildNode = (element, targetTagName) => {
  if (!element) return null;

  const children = Array.from(element.children);

  for (const child of children) {
    if (child.tagName.toLowerCase() === targetTagName.toLowerCase()) {
      return child;
    }

    const matchedElement = findTargetChildNode(child, targetTagName);
    if (matchedElement) return matchedElement;
  }

  return null;
};

export default function MainNews($target, props) {
  this.render = () => {
    const $div = document.createElement("div");
    const $imgContainer = document.createElement("div");
    const $img = document.createElement("img");
    const $childDiv = document.createElement("div");

    $div.setAttribute("class", "main-news");
    $imgContainer.setAttribute("class", "img-container");
    $childDiv.setAttribute("class", "main-title");

    $imgContainer.style.overflow = "hidden";
    $img.src = props.mainThumbnail;
    $childDiv.innerHTML = props.mainNewsTitle;

    $imgContainer.appendChild($img);
    $div.appendChild($imgContainer);
    $div.appendChild($childDiv);

    $target.appendChild($div);
  };

  this.render();
}
