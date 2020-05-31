import localStorage from "local-storage";

export const getItem = (key) => {
  return localStorage.get(key);
};

export const setItem = (key, value) => {
  return localStorage.set(key, value);
};

export const removeItem = (key) => {
  return localStorage.remove(key);
};

export const clearLocalStorage = (key) => {
  localStorage.clear();
};

// export { getItem, setItem, removeItem, clearLocalStorage };
