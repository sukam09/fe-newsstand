export const filterCategory = (agencies, focus) => {
  const filteredCategory = agencies.filter(
    (agency) => agency.category === focus
  );
  return filteredCategory;
};
