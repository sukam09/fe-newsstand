const getRollingData = async () => {
  const rollingData = await fetch("./js/Data/RollingNews.json").then((res) => {
    return res.json();
  });
  return rollingData;
};

export { getRollingData };
