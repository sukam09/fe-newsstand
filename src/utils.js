export const customFetch = async (url, callback, options) => {
  try {
    const response = await fetch(url, options);
    let data = await response.json();

    if (callback) data = callback(data);
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const shuffleArrayRandom = (array) => {
  const new_array = array.slice();

  return new_array.sort(() => Math.random() - 0.5);
};

export const setDate = () => {
  const today = new Date();

  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "long",
  };

  return today.toLocaleDateString("ko-KR", options);
};
