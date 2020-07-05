import { useEffect, useState, useRef } from 'react';

export const useFetch = (url: string) => {
  const isCurrent = useRef(true);
  const [state, setState] = useState<{ data: any; loading: boolean }>({
    data: null,
    loading: true,
  });

  useEffect(() => {
    return () => {
      isCurrent.current = false;
    };
  }, []);
  useEffect(() => {
    setState((state) => ({ data: state.data, loading: true }));

    fetch(url)
      .then((x) => x.text())
      .then((y) => {
        setTimeout(() => {
          if (isCurrent.current) {
            setState({ data: y, loading: false });
          }
        }, 2000);
      });
  }, [url, setState]);

  return state;
};
