/* eslint-disable @typescript-eslint/no-explicit-any */
import { jwtDecode } from "jwt-decode";
import { authKey, SERVER_URL } from "./const";

export const decodedToken = (token: string) => {
  return jwtDecode(token);
};
export const setToLocalStorage = (key: string, token: string) => {
  if (!key || typeof window === "undefined") {
    return "";
  }
  return localStorage.setItem(key, token);
};

export const getFromLocalStorage = (key: string) => {
  if (!key || typeof window === "undefined") {
    return "";
  }
  return localStorage.getItem(key);
};

export const getRefreshToken = async () => {
  // console.log("rrrrrrrrrrr");
  const response = (await fetch(`${SERVER_URL}/auth/refresh-token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  })) as any;
  const accessToken = response?.data?.accessToken ?? "demoToken";
  setToLocalStorage(authKey, accessToken);
};

export const getUserInfo = (): any | { e: "" } => {
  const authToken = getFromLocalStorage(authKey);
  // console.log(authToken)

  if (authToken) {
    const decodedData = decodedToken(authToken);
    // console.log(decodedData)
    return decodedData;
  } else {
    return { e: "" };
  }
};
