let all_agencies = [];

export const setAllAgencies = (agencies) => {
  all_agencies = JSON.parse(JSON.stringify(agencies));
};

export const getAllAgencies = () => {
  return JSON.parse(JSON.stringify(all_agencies));
};
