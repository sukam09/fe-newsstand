/* 
보여줄 메인 컨텐츠를 선택하는 버튼
props: inner, className, changeType, buttonType, onClick
*/

export default function Button($target, props, ClassName, onClick) {
  // debugger;
  // this.state = mode;
  const { mainContent, renderContent, mode, page } = props;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

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

      let targetElement = $button;
      while (targetElement && targetElement.tagName !== "path")
        targetElement = targetElement.firstElementChild;

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
