const $progressCount = document.querySelector(
  ".news-list__field-tab__progress-count"
).childNodes[0];
const $progress = document.querySelector(".news-list__field-tab__progress");

const setProgress = () => {
  let nowCount = 1;
  let nowSecond = 0;
  setInterval(() => {
    nowSecond = (nowSecond % 20) + 1;
    $progress.style.background = `linear-gradient(to right, #4362d0 ${Math.round(
      nowSecond * 5
    )}%, #7890e7 ${Math.round(nowSecond * 5)}%)`;
    $progressCount.data = nowCount + " ";
  }, 1000);
};

export { setProgress };
