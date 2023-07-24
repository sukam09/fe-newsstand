export const fetchData = async (url) => {
  'src/mocks/news.json';
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getLocalStorage = key => {
  return JSON.parse(localStorage.getItem(key)) ?? null;
};

export const setLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};
