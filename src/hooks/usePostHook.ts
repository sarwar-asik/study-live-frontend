/* eslint-disable @typescript-eslint/no-explicit-any */
import { getRefreshToken } from "@/helper/authHelper";
import { useState } from "react";

interface PostOptions {
  headers?: HeadersInit;
}

interface PostResponse<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  postData: (body: any) => Promise<void>;
}

const usePostHook = <T>(
  url: string,
  options?: PostOptions
): PostResponse<T> => {
  const [data, setData] = useState<any| null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const postData = async (body: any) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...options?.headers,
        },
        body,
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json()
      setData(result);
      return result;
    } catch (err:any) {
      setError(err as Error);
      // eslint-disable-next-line no-constant-condition
      if ((err.status = 403)) {
        await getRefreshToken();
      }
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, postData };
};

export default usePostHook;
