import { PROGRESS_BAR_DELAY } from '../constants.js';

const ListProgressBar = afterDelay => {
  const listProgressBar = document.createElement('div');
  const startTime = performance.now();
  let animationFrameId;

  const loop = now => {
    const time = now - startTime;
    const progress = (time / PROGRESS_BAR_DELAY) * 100;

    listProgressBar.style.width = `${progress}%`;
    progress < 100
      ? (animationFrameId = requestAnimationFrame(loop))
      : afterDelay();
  };

  listProgressBar.cancelLoop = () => cancelAnimationFrame(animationFrameId);
  listProgressBar.classList.add('list_progress', 'surface_brand_default');
  animationFrameId = requestAnimationFrame(loop);
  return listProgressBar;
};

export default ListProgressBar;
