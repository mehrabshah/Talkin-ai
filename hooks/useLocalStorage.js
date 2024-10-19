function useLocalStorage() {
    const getItem = (key) => {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    };
  
    const setItem = (key, value) => {
      window.localStorage.setItem(key, JSON.stringify(value));
    };
  
    return { getItem, setItem };
  }
  
  export default useLocalStorage;
  