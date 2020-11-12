import { useRef, useEffect } from 'react';

export function useIsMounted() {
  const isMountedRef = useRef(true);
  useEffect(
    () => () => {
      isMountedRef.current = false;
    },
    [],
  );
  return () => isMountedRef.current;
}
