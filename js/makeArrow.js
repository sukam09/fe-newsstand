function makeArrow() {
  const direction = ["left", "right"];

  direction.forEach((value) => {
    document.getElementById(
      `aside-${value}`
    ).innerHTML = `<img id="${value}-arrow" src="./img/${value}_button.png">`;
  });
}

export { makeArrow };
