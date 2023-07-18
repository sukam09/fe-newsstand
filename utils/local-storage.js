export const setLocalStorageItem = (key, value) => {
  localStorage.setItem(key, value);
};

export const getLocalStorageItem = (key) => {
  return localStorage.getItem(key);
};

export const removeLocalStorageItem = (key) => {
  localStorage.removeItem(key);
};
