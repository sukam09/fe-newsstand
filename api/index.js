/**
 * 해당 url fetch 후 json으로 변환
 * @param {String} url
 * @returns {Promise}
 */
export const fetchData = async url => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

/**
 * 로컬스토리지에 저장된 데이터를 가져오는 함수
 * @param {String} key
 */
export const getLocalStorage = key => {
  return JSON.parse(localStorage.getItem(key)) ?? null;
};

/**
 * 로컬스토리지에 저장된 데이터를 저장하는 함수
 * @param {String} key
 * @param {String} value
 */
export const setLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};
