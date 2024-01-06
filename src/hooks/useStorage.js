import { useState } from "react";

const useStorage = (storageType, key, initialValue) => {
  const getStoredValue = () => {
    try {
      const storedValue = storageType.getItem(key);
      return storedValue ? JSON.parse(storedValue) : initialValue;
    } catch (error) {
      console.error("Error reading from storage:", error);
      return initialValue;
    }
  };

  const [value, setValue] = useState(getStoredValue);

  const setStoredValue = (newValue) => {
    try {
      setValue(newValue);
      storageType.setItem(key, JSON.stringify(newValue));
    } catch (error) {
      console.error("Error writing to storage:", error);
    }
  };

  const clearStorage = () => {
    try {
      setValue(initialValue);
      storageType.removeItem(key);
    } catch (error) {
      console.error("Error clearing storage:", error);
    }
  };

  return [value, setStoredValue, clearStorage];
};

export const useLocalStorage = (key, initialValue) => {
  return useStorage(localStorage, key, initialValue);
};

export const useSessionStorage = (key, initialValue) => {
  return useStorage(sessionStorage, key, initialValue);
};
