function removeArrow() {
  const direction = ["left", "right"];

  direction.forEach((value) => {
    document.getElementById(`aside-${value}`).innerHTML = "";
  });
}

export { removeArrow };
