export const fetchData = async () => {
  try {
    const response = await fetch('src/mocks/news.json');
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
