import Arrow from '../components/media/Arrow.js';

export const clearAllChildren = element => {
  Array.from(element.childNodes).forEach(child => child.remove());
};

export const shuffleArray = array => {
  array.sort(() => Math.random() - 0.5);
};

export const createNewArrow = () => {
  const leftArrow = Arrow('left');
  const rightArrow = Arrow('right');

  document.querySelector('#left_arrow').replaceWith(leftArrow);
  document.querySelector('#right_arrow').replaceWith(rightArrow);
  return [leftArrow, rightArrow];
};
