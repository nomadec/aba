// export const HOST = "https://aba.gigalixirapp.com";
export const HOST = "http://localhost:4000";
export const API = `${HOST}/api/v1`;

export const API_SERVICES = `${API}/services`;

export const URL_PATHS = {
  HOME: "/",
  SERVICES: "/services",
  SERVICE_CREATE: "/services/new",
  SERVICE_SHOW: "/services/show",
  SERVICE_EDIT: "/services/edit",
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

  // api_v1_service_path  GET     /api/v1/services                       AbaWeb.ServiceController :index
  // api_v1_service_path  GET     /api/v1/services/:id                   AbaWeb.ServiceController :show
  // api_v1_service_path  POST    /api/v1/services                       AbaWeb.ServiceController :create
  // api_v1_service_path  PATCH   /api/v1/services/:id                   AbaWeb.ServiceController :update
  //                      PUT     /api/v1/services/:id                   AbaWeb.ServiceController :update
  // api_v1_service_path  DELETE  /api/v1/services/:id                   AbaWeb.ServiceController :delete
  // api_v1_service_path  GET     /api/v1/services/:id/edit              AbaWeb.ServiceController :edit
  // api_v1_service_path  GET     /api/v1/services/new                   AbaWeb.ServiceController :new
  SERVICES: `${API}/services`,
};

export const AUTH_ACTIONS = {
  AUTH_REGISTER: "AUTH_REGISTER",
  AUTH_CONFIRM_EMAIL: "AUTH_CONFIRM_EMAIL",
  AUTH_SUCCESS: "AUTH_SUCCESS",
  AUTH_GET_USER: "AUTH_GET_USER",
  AUTH_ERROR: "AUTH_ERROR",
  AUTH_LOGOUT: "AUTH_LOGOUT",
  AUTH_REQUEST_RESET_PASSWORD: "AUTH_REQUEST_RESET_PASSWORD",
  AUTH_UPDATE_PASSWORD: "AUTH_REQUEST_RESET_PASSWORD",
};

export const LOADING_STARTED = "LOADING_STARTED";
export const LOADING_ENDED = "LOADING_ENDED";

export const SERVICES_GET = "SERVICES_GET";
export const SERVICES_CREATE = "SERVICES_CREATE";
export const SERVICES_GET_DETAILS = "SERVICES_GET_DETAILS";
export const SERVICES_DROP_DETAILS = "SERVICES_DROP_DETAILS";

export const STATUS = {
  SUCCESS: "success",
  ERROR: "error",
};

export const HEADERS = {
  CONTENT_TYPE: "content-type",
  CSRF: "x-csrf-token",
};
