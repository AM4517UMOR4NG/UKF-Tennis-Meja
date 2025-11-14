import { useCallback, useRef } from 'react';

export function useThrottle(callback, delay) {
  const throttleRef = useRef(null);
  
  return useCallback((...args) => {
    if (throttleRef.current) return;
    
    throttleRef.current = setTimeout(() => {
      callback(...args);
      throttleRef.current = null;
    }, delay);
  }, [callback, delay]);
}

export function useDebounce(callback, delay) {
  const debounceRef = useRef(null);
  
  return useCallback((...args) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    
    debounceRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  }, [callback, delay]);
}
