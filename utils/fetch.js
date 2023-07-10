export const fetchData = async () => {
  const agencies = await fetch("../data.json").then((res) => {
    return res.json();
  });
  return agencies;
};
