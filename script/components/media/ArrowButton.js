const ArrowButton = direction => {
  const arrow = document.createElement('button');

  arrow.id = `${direction}_arrow`;
  arrow.innerHTML = `<img src="assets/images/${direction}.svg" alt="${direction}">`;
  return arrow;
};

export const replaceArrow = () => {
  const leftArrow = ArrowButton('left');
  const rightArrow = ArrowButton('right');

  document.querySelector('#left_arrow').replaceWith(leftArrow);
  document.querySelector('#right_arrow').replaceWith(rightArrow);
  return [leftArrow, rightArrow];
};

export default ArrowButton;
