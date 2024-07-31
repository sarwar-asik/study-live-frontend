import { useState, useEffect } from "react";

interface FetchOptions {
  method?: string;
  headers?: HeadersInit;
  body?: BodyInit | null;
}

interface FetchResponse<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

const useFetchDataHook = <T>(
  url: string,
  options?: FetchOptions
): FetchResponse<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, options]);

  return { data, loading, error };
};

export default useFetchDataHook;
