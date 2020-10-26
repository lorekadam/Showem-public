const ACCESS_TOKEN = "accessToken";
const REFRESH_TOKEN = "refreshToken";

export const setTokens = (access_token: string, refresh_token: string) => {
  localStorage.setItem(ACCESS_TOKEN, access_token);
  localStorage.setItem(REFRESH_TOKEN, refresh_token);
};

export const clearTokens = () => {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
};

export const haveTokens = () => {
  return (
    localStorage.getItem(ACCESS_TOKEN) && localStorage.getItem(REFRESH_TOKEN)
  );
};

export const addToLocalStorage = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

export const isLocalStorage = (key: string) => {
  return localStorage.getItem(key);
};

export const removeLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};
