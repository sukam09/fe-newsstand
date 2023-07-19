const getShuffle = (list) => {
  return list.sort(() => Math.random() - 0.5);
};

const getShuffleIds = (listLength) => {
  const initList = Array.from({ length: listLength }, (_, idx) => idx + 1);
  return getShuffle(initList);
};

const getSliceIds = (shuffleIds, pageNum, sliceNum) => {
  return shuffleIds.slice(pageNum * sliceNum, pageNum * sliceNum + sliceNum);
};

export { getShuffle, getShuffleIds, getSliceIds };
