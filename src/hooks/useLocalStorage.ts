const useLocalStorage = () => {
  const setLocalStorageItem = (key: string, value: string[]) => {
    localStorage.setItem(key, JSON.stringify(value));
  };
  const getLocalStorageItem = (key: string) => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : [];
  };
  return { setLocalStorageItem, getLocalStorageItem };
};
export default useLocalStorage;
