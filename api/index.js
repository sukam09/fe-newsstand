export const fetchData = async () => {
  try {
    const response = await fetch('src/mocks/news.json');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
