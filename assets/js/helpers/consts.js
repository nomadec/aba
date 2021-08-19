export const API = "http://localhost:4000/api/v1";
// export const API = "https://aba.gigalixirapp.com/api/v1";

export const API_SERVICES = `${API}/services`;

export const API_AUTH_SIGN_UP = `${API}/registration`;
export const API_AUTH_SIGN_IN = `${API}/session`;
export const API_AUTH_SIGN_OUT = `${API}/session`;
export const API_AUTH_RENEW = `${API}/session/renew`;

export const URL_PATHS = {
  HOME: "/",
  SIGN_IN: "/signin",
  SIGN_UP: "/signup",
};

export const AUTH_ACTIONS = {
  AUTH_LOADING: "AUTH_LOADING",
  AUTH_SUCCESS: "AUTH_SUCCESS",
  AUTH_ERROR: "AUTH_ERROR",
  AUTH_CLOSE: "AUTH_CLOSE",
  CLEAR_AUTH_STATE: "CLEAR_AUTH_STATE",
};

export const STATUS = {
  SUCCESS: "success",
  ERROR: "error",
};
