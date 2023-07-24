//style.display = ""
export function setDisplay(element, display_style) {
  document.querySelector(element).style.display = display_style;
}

//style.display of array elements
export function setDisplayofArr(elements, display_style) {
  elements.forEach((element) => {
    document.querySelector(element).style.display = display_style;
  });
}

//element.classList.remove + add
export function removeAddClass(element, remove_class, add_class) {
  element.classList.remove(remove_class);
  element.classList.add(add_class);
}
