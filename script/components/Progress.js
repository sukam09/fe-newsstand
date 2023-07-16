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

  listProgressBar.id = 'list_progress';
  listProgressBar.classList.add('surface_brand_default');
  listProgressBar.addEventListener('DOMNodeRemovedFromDocument', () => {
    cancelAnimationFrame(animationFrameId);
  });
  animationFrameId = requestAnimationFrame(loop);
  return listProgressBar;
};

export default ListProgressBar;
