// export const HOST = "https://aba.gigalixirapp.com";
export const HOST = "http://localhost:4000";
export const API = `${HOST}/api/v1`;

export const API_SERVICES = `${API}/services`;

export const URL_PATHS = {
  HOME: "/",
  SIGN_UP: "/signup",
  CONFIRM_EMAIL: "/confirm-email/:confirmation_token",
  SIGN_IN: "/session/new",
  RESET_PASSWORD: "/reset-password",
};

export const API_PATHS = {
  AUTH_SIGN_UP: `${HOST}/registration`,
  AUTH_CONFIRM_EMAIL: `${HOST}/confirm_email`,
  AUTH_SIGN_IN: `${HOST}/session`,
  AUTH_SIGN_OUT: `${HOST}/session`,
  AUTH_UPDATE_PASSWORD: `${HOST}/reset_password`,
  AUTH_WHOAMI: `${API}/users/whoami`,
};

export const AUTH_ACTIONS = {
  AUTH_LOADING: "AUTH_LOADING",
  AUTH_REGISTER: "AUTH_REGISTER",
  AUTH_CONFIRM_EMAIL: "AUTH_CONFIRM_EMAIL",
  AUTH_SUCCESS: "AUTH_SUCCESS",
  AUTH_GET_USER: "AUTH_GET_USER",
  AUTH_ERROR: "AUTH_ERROR",
  AUTH_LOGOUT: "AUTH_LOGOUT",
  AUTH_REQUEST_RESET_PASSWORD: "AUTH_REQUEST_RESET_PASSWORD",
  AUTH_UPDATE_PASSWORD: "AUTH_REQUEST_RESET_PASSWORD",
  AUTH_CLEAR_STATE: "AUTH_CLEAR_STATE",
};

export const STATUS = {
  SUCCESS: "success",
  ERROR: "error",
};

export const HEADERS = {
  CONTENT_TYPE: "content-type",
  CSRF: "x-csrf-token",
};
