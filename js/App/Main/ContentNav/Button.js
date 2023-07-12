/* 
보여줄 메인 컨텐츠를 선택하는 버튼
*/

export default function Button($target, props, ClassName, onClick) {
  // debugger;
  // this.state = mode;
  const { mainContent, renderContent, mode, page } = props;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  const changeMainContent = () => {
    onClick({
      mainContent: props.type,
      renderContent: renderContent,
      mode: mode,
      page: 1,
    });
  };

  const changeRenderContent = () => {
    onClick({
      mainContent: mainContent,
      renderContent: props.type,
      mode: mode,
      page: 1,
    });
  };

  this.render = () => {
    const $button = document.createElement("button");
    $button.setAttribute(
      "class",
      `${ClassName}-${props.type} mouse-hover-pointer`
    );

    $button.innerHTML = props.inner;

    if (props.changeState === "mainContent") {
      $button.addEventListener("click", changeMainContent);

      let targetElement = $button;
      while (targetElement && targetElement.tagName !== "path")
        targetElement = targetElement.firstElementChild;

      targetElement.style.fill =
        props.type === props.mainContent ? "#4362D0" : "";
    } else {
      $button.addEventListener("click", changeRenderContent);

      $button.style.color =
        props.type === props.renderContent ? "#14212B" : "#879298";
      $button.style.fontWeight = props.type === props.renderContent ? 700 : 500;
    }

    $target.appendChild($button);
  };

  this.render();
}
