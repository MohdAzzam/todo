export function get(key) {
    if (localStorage === null || localStorage === undefined) return null;
    let value = localStorage.getItem(key);
    try {
      return JSON.parse(value);
    } catch (e) {
      return value;
    }
  }
  
  export function set(key, value, isRaw) {
    if (localStorage === null || localStorage === undefined) return null;
    if (isRaw) {
      localStorage.setItem(key, value);
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }
  
  export function has(key) {
    if (localStorage === null || localStorage === undefined) return false;
    let value = localStorage.getItem(key);
    return value !== null;
  }
  
  export function remove(key) {
    if (localStorage === null || localStorage === undefined) return null;
    localStorage.removeItem(key);
  }
  
  export default { get, set, has, remove };