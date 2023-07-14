import { PROGRESS_BAR_DELAY } from '../constants.js';

const ListProgressBar = afterDelay => {
  const listProgressBar = document.createElement('div');
  const startTime = performance.now();
  let animationFrameId;

  const loop = now => {
    const time = now - startTime;
    const progress = time / PROGRESS_BAR_DELAY;

    listProgressBar.style.width = `${progress * 100}%`;
    progress < 1
      ? (animationFrameId = requestAnimationFrame(loop))
      : afterDelay();
  };

  const removeElement = () => {
    cancelAnimationFrame(animationFrameId);
    listProgressBar.removeEventListener(
      'DOMNodeRemovedFromDocument',
      removeElement
    );
  };

  listProgressBar.id = 'list_progress';
  listProgressBar.classList.add('surface_brand_default');
  listProgressBar.addEventListener('DOMNodeRemovedFromDocument', removeElement);

  animationFrameId = requestAnimationFrame(loop);

  return listProgressBar;
};

export default ListProgressBar;
