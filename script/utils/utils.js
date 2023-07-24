import ArrowButton from '../components/media/ArrowButton.js';
import { getMediaLogo, getNewsData } from '../fetch/getNewsData.js';

export const clearAllChildren = element => {
  Array.from(element.childNodes).forEach(child => child.remove());
};

export const shuffleArray = array => array.sort(() => Math.random() - 0.5);

export const createNewArrow = () => {
  const leftArrow = ArrowButton('left');
  const rightArrow = ArrowButton('right');

  document.querySelector('#left_arrow').replaceWith(leftArrow);
  document.querySelector('#right_arrow').replaceWith(rightArrow);
  return [leftArrow, rightArrow];
};

export const fadeOutElement = element => {
  const startTime = performance.now();
  const loop = now => {
    const elapsed = now - startTime;
    const opacity = 1 - elapsed / 200;

    element.style.opacity = opacity;
    if (opacity > 0) {
      requestAnimationFrame(loop);
    } else {
      element.remove();
    }
  };

  element.style.opacity = 1;
  requestAnimationFrame(loop);
};

export const setMediaLogo = (element, id, theme) => {
  element.src = getMediaLogo(id, theme);
  element.alt = getNewsData(id).name;
};
