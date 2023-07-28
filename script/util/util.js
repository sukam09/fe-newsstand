/**
  *언론사 index shuffle하는 함수
*/
const shuffle = array => {
  array.sort(() => Math.random() - 0.5);
};

const getJSON = async (url) => {
  try {
    const response = await fetch(url);
    const jsonData = await response.json();
    return jsonData;
  } catch (err) {
    console.error("Error : ", err);
    return null;
  }
};

export {shuffle, getJSON};