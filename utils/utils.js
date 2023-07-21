export const fetchData = async () => {
  const agencies = await fetch("../data/press.json").then((res) => {
    return res.json();
  });
  return agencies;
};

export const sliceData = (data, start_index, end_index) =>
  data.slice(start_index, end_index);

export const shuffleData = (data) => {
  return data.agencies.sort(() => 0.5 - Math.random());
};

// 부모 태그 내 모든 자식 태그 삭제
export const removeAllChildNodes = (parent) => {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
};
