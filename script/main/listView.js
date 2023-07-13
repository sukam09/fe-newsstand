import {getJSON } from '../util/util.js';



const setProgressed = () => {
  var categoryItems = document.querySelectorAll(".category_item");

  function updateProgressBar() {
    var progressed = document.querySelector(".category_item.progressed");
    var progressBar = document.querySelector(".progress_bar");

    if (!progressed || !progressBar) return;

    var rect = progressed.getBoundingClientRect();

    progressBar.style.position = "absolute";
    progressBar.style.top = rect.top + "px";
    progressBar.style.left = rect.left + "px";
  }

  for (var i = 0; i < categoryItems.length; i++) {
    categoryItems[i].addEventListener("click", function (event) {
      for (var j = 0; j < categoryItems.length; j++) {
        categoryItems[j].classList.remove("progressed");
      }

      event.currentTarget.classList.add("progressed");
      updateProgressBar();

      // 클릭할 때마다 progressBarControl 호출
      progressBarControl();
    });
  }
};

const progressBarControl = () => {
  let start = null;
  const element = document.querySelector(".progress_bar");
  const duration = 1000;
  const endWidth = 166;

  function step(timestamp) {
    if (!start) start = timestamp;
    const elapsed = timestamp - start;

    const currentWidth = Math.min((endWidth * elapsed) / duration, endWidth);
    element.style.width = currentWidth + "px";

    if (currentWidth < endWidth) {
      requestAnimationFrame(step);
    } else {
      //애니메이션 끝났을 때
      console.log("AEW");
    }
  }

  element.style.width = "0px"; // 클릭할 때마다 width를 초기화
  requestAnimationFrame(step);
};

const listViewInit = () => {
  setProgressed();
  progressBarControl();
};

export default listViewInit;
