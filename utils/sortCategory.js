export const sortCategory = (agencies) => {
  agencies.sort((a, b) => {
    let categoryA = a.category;
    let categoryB = b.category;
    if (categoryA < categoryB) return -1;
    if (categoryA > categoryB) return 1;
    return 0;
  });
  return agencies;
};
