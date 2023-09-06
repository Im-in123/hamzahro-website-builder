// src/utils/localStorage.ts
export const saveTokenToLocalStorage = (key: string, value: any): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error saving to local storage:', error);
  }
};

export const loadTokenFromLocalStorage = (key: string): any | null => {
  try {
    const serializedValue = localStorage.getItem(key);
     return serializedValue ? JSON.parse(serializedValue) : null;

  } catch (error) {
    console.error('Error loading from local storage:', error);
    return null;
  }
};
