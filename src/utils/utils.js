import { getState } from "../store/observer.js";
import { VIEW_OPTION_TYPE, VIEW_TYPE } from "../constants/constants.js";
import { isDarkMode, viewOptionState, viewState } from "../store/storeKey.js";

const customFetch = async (url, callback, options) => {
  try {
    const response = await fetch(url, options);
    let data = await response.json();

    if (callback) data = callback(data);
    return data;
  } catch (err) {
    console.error(err);
  }
};

const shuffleArrayRandom = (array) => {
  const new_array = array.slice();

  return new_array.sort(() => Math.random() - 0.5);
};

const setDate = () => {
  const today = new Date();

  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "long",
  };

  return today.toLocaleDateString("ko-KR", options);
};

const pressObjectToArray = (data) => {
  const newArray = [];

  for (const key in data) {
    newArray.push({
      name: key,
      light: data[key].light,
      dark: data[key].dark,
    });
  }

  return newArray;
};

const newsObjectToArray = (data) => {
  const newMap = {};

  for (const key in data) {
    data[key].forEach((inner) => {
      if (inner.press in newMap) newMap[inner.press].push(inner);
      else newMap[inner.press] = [inner];
    });
  }

  return newMap;
};

const shuffleObjectRandom = (data) => {
  const newObject = {};

  for (const key in data) {
    newObject[key] = shuffleArrayRandom(data[key]);
  }

  return newObject;
};

const checkIsAllType = () => {
  const currentViewOption = getState(viewOptionState);

  return currentViewOption === VIEW_OPTION_TYPE.ALL;
};

const checkIsGridView = () => {
  const currentView = getState(viewState);

  return currentView === VIEW_TYPE.GRID;
};

const checkIsDarkMode = () => {
  const currentMode = getState(isDarkMode);

  return currentMode;
};

export {
  customFetch,
  shuffleArrayRandom,
  setDate,
  pressObjectToArray,
  shuffleObjectRandom,
  newsObjectToArray,
  checkIsAllType,
  checkIsGridView,
  checkIsDarkMode,
};
