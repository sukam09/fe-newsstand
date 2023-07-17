const Arrow = direction => {
  const arrow = document.createElement('button');

  arrow.id = `${direction}_arrow`;
  arrow.innerHTML = `<img src="assets/images/${direction}.svg" alt="${direction}">`;
  return arrow;
};

export default Arrow;
