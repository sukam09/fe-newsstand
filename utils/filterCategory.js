export const filterCategory = (agencies, text) => {
  const filteredCategory = agencies.filter(
    (agency) => agency.category === text
  );
  return filteredCategory;
};
