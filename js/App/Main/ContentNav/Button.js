/* 
보여줄 메인 컨텐츠를 선택하는 버튼
*/

export default function Button($target, props, ClassName, onClick) {
  // debugger;
  // this.state = mode;
  const { renderContent, mode, page } = props;

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

  const changeRenderContent = () => {};

  this.render = () => {
    const $button = document.createElement("button");
    $button.setAttribute(
      "class",
      `${ClassName}-${props.type} mouse-hover-pointer`
    );

    $button.innerHTML = props.inner;
    $button.addEventListener("click", changeMainContent);

    $target.appendChild($button);
  };

  this.render();
}
