export const clearAllChildren = element => {
  Array.from(element.childNodes).forEach(child => child.remove());
};
