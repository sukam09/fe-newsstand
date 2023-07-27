import { store } from "../store/store.js";

export const fetchAllPress = async () => {
  const agencies = await fetch(absoluteFilePath("../data/press.json")).then(
    (res) => {
      return res.json();
    }
  );
  return agencies;
};

export const sliceData = (data, start_index, end_index) =>
  data.slice(start_index, end_index);

export const shufflePress = (data) => {
  return data.agencies.sort(() => 0.5 - Math.random());
};

// 부모 태그 내 모든 자식 태그 삭제
export const removeAllChildNodes = (parent) => {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
};

export const checkSubscription = () => {
  return (
    store.subscriptions.filter((item) => item.subscribe === true).length === 0
  );
};

export const absoluteFilePath = (relativePath) => {
  const anchor = ce("a");
  anchor.href = relativePath;
  return anchor.href;
};

export const qs = (elem) => {
  return document.querySelector(elem);
};

export const ce = (elem) => {
  return document.createElement(elem);
};
