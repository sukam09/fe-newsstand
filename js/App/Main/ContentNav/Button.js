/* 
메인 컨텐츠를 선택하는 버튼(전체/구독, 리스트 뷰/그리드를 선택 가능)
*/

const findTargetChildNode = (element, targetTagName) => {
  if (!element) {
    return null;
  }

  if (element.tagName === targetTagName) {
    return element;
  }

  return findTargetChildNode(element.firstElementChild, targetTagName);
};

export default function Button($target, props) {
  const changePressType = () => {
    props.onClick(props.buttonType);
  };

  const changeViewerType = () => {
    props.onClick(props.buttonType);
  };

  this.render = () => {
    const $button = document.createElement("button");
    $button.setAttribute("class", props.className);

    $button.innerHTML = props.inner;

    if (props.changeType === "viewer") {
      $button.addEventListener("click", changeViewerType);

      let targetElement = findTargetChildNode($button, "path");

      targetElement.style.fill =
        props.buttonType === props.mainViewerType ? "#4362D0" : "";
    } else {
      $button.addEventListener("click", changePressType);

      $button.style.color =
        props.buttonType === props.mainPressType ? "#14212B" : "#879298";
      $button.style.fontWeight =
        props.buttonType === props.mainPressType ? 700 : 500;
    }

    $target.appendChild($button);
  };

  this.render();
}
