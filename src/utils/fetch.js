const getFetchData = (url) => {
  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      throw error;
    });
};

export { getFetchData };
