export function progressBar() {
  return `
  <div class="progressbar"></div>
  `;
}

export function startProgressAnimation($progressbar) {
  let raf;
  let runningTime = 5000;
  let percentage = 0;
  let start;

  const performAnimation = (timestamp) => {
    start === undefined ? (start = timestamp) : null;
    const elapsed = timestamp - start;
    const clicked = $progressbar.parentNode.classList.contains("clicked");

    // runningtime 넘어가면 처음부터 시작
    if (elapsed >= runningTime) {
      start = timestamp;
    }

    // 다른 요소가 click 되면 중지
    if (!clicked) {
      cancelAnimationFrame(raf);
      return;
    }
    percentage = (elapsed / runningTime) * 100;
    $progressbar.style.width = `${percentage}%`;
    raf = requestAnimationFrame(performAnimation);
  };

  raf = requestAnimationFrame(performAnimation);
}
