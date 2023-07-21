export const filterCategory = (agencies, focus) => {
  const filtered_category = agencies.filter(
    (agency) => agency.category === focus
  );
  return filtered_category;
};
