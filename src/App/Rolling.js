/* 
롤링 컨텐츠 컨테이너 컴포넌트
*/
import Component from "../utils/Component.js";
import RollingContents from "./Rolling/RollingContents.js";

const startTimeArr = [0, 1];

function Rolling($target, props) {
  Component.call(this, $target, props);
}

Object.setPrototypeOf(Rolling.prototype, Component.prototype);

Rolling.prototype.template = function () {
  const createRollingbox = (accumulator, currentValue) => {
    return (
      accumulator +
      `
      <div data-key=${currentValue} class="newsflash__content">
        <div class="rolling"></div>
      </div>
      `
    );
  };

  const rollingTemplate = startTimeArr.reduce(createRollingbox, "");

  return rollingTemplate;
};

Rolling.prototype.mounted = function () {
  const createRollingContents = (element, index) => {
    const rollingContetnsProps = {
      ...this.props,
      startTime: startTimeArr[index],
    };

    new RollingContents(element, rollingContetnsProps);
  };

  const rollingBox = this.$el.querySelectorAll(".rolling");
  rollingBox.forEach(createRollingContents);
};

export default Rolling;
