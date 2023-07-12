const $progressCount = document.querySelector(
  ".news-list__field-tab__progress-count"
).childNodes[0];
const $progress = document.querySelector(".news-list__field-tab__progress");

let timer;
let nowSecond = 0;

const stopProgress = () => {
  if (timer) {
    clearInterval(timer);
    nowSecond = 0;
    $progress.style.background =
      "linear-gradient(to right, #4362d0 0%, #7890e7 0%)";
  }
};

const startProgress = () => {
  let page = 1;

  timer = setInterval(() => {
    nowSecond = (nowSecond % 20) + 1;
    $progress.style.background = `linear-gradient(to right, #4362d0 ${Math.round(
      nowSecond * 5
    )}%, #7890e7 ${Math.round(nowSecond * 5)}%)`;
    $progressCount.data = page + " ";
  }, 1000);
};

export { stopProgress, startProgress };
