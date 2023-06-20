import React, { useEffect, useState } from "react";

function getSavedValue(key, initialValue) {
  const savedValue = localStorage.getItem(key);
  if (savedValue !== null) {
    try {
      return JSON.parse(savedValue);
    } catch (error) {
      console.error(`Error parsing JSON for key "${key}":`, error);
    }
  }

  if (typeof initialValue === "function") {
    return initialValue();
  }

  return initialValue;
}

const useLocalstorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    return getSavedValue(key, initialValue);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export default useLocalstorage;
