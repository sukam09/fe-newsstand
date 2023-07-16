const getShuffle = (list) => {
  return list.sort(() => Math.random() - 0.5);
};

const getShuffleList = (listLength) => {
  const initList = Array.from({ length: listLength }, (_, idx) => idx + 1);
  return getShuffle(initList);
};

export { getShuffleList };
