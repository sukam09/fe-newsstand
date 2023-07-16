import { ArrowButton } from '../components/Button.js';

export const clearAllChildren = element => {
  Array.from(element.childNodes).forEach(child => child.remove());
};

export const shuffleArray = array => {
  array.sort(() => Math.random() - 0.5);
};

export const createNewArrow = () => {
  const leftArrow = document.querySelector('#left_arrow');
  const rightArrow = document.querySelector('#right_arrow');
  const newLeftArrow = ArrowButton('left');
  const newRightArrow = ArrowButton('right');

  leftArrow.replaceWith(newLeftArrow);
  rightArrow.replaceWith(newRightArrow);
  return [newLeftArrow, newRightArrow];
};
