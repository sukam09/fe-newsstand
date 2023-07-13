export const fetchData = async () => {
  const agencies = await fetch("../data/press.json").then((res) => {
    return res.json();
  });
  return agencies;
};
