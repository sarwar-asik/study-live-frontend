/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

interface PostOptions {
  headers?: HeadersInit;
}

interface PostResponse<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  postData: (body: any) => Promise<T | null>;
}

const usePost = <T>(url: string, options?: PostOptions): PostResponse<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const postData = async (body: any): Promise<T | null> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...options?.headers,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();
      setData(result);
      return result;
    } catch (err: any) {
      setError(err.message);
      console.log(err.message, "err");

      // Attempt to refresh token if a 403 status is encountered
      if (err.status === 403) {
        try {
          await getRefreshToken();
          return postData(body); // Retry the request after refreshing the token
        } catch (refreshError) {
          console.error("Failed to refresh token", refreshError);
        }
      }
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, postData };
};

export default usePost;

async function getRefreshToken() {
  // Implement the logic to get a new token here
  // For example:
  const response = await fetch("/api/refresh-token", {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to refresh token");
  }

  const result = await response.json();
  // Store the new token (localStorage, state, context, etc.)
  // For example:
  localStorage.setItem("token", result.token);
}
