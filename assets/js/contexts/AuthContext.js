import axios from "axios";
import React, { createContext, useContext, useReducer } from "react";
import {
  API_PATHS,
  AUTH_ACTIONS,
  HEADERS,
  LOADING_ENDED,
  LOADING_STARTED,
  STATUS,
} from "../helpers/consts";
import { supervise_rq } from "../helpers/utils";
import qs from "qs";

const authContext = createContext();

export const useAuth = () => {
  return useContext(authContext);
};

const INIT_STATE = {
  loading: false,
  status: null,
  message: null,
  user: null,
  email_confirmed: false,
};

const reducer = (state = INIT_STATE, action) => {
  console.log(action);
  switch (action.type) {
    case LOADING_STARTED:
      return {
        ...state,
        loading: true,
      };
    case AUTH_ACTIONS.AUTH_REGISTER:
      return {
        ...state,
        loading: false,
        status: STATUS.success,
        message: action.payload,
      };
    case AUTH_ACTIONS.AUTH_CONFIRM_EMAIL:
      return {
        ...state,
        loading: false,
        status: STATUS.success,
        email_confirmed: true,
        message: action.payload,
      };
    case AUTH_ACTIONS.AUTH_REQUEST_RESET_PASSWORD:
      return {
        ...state,
        loading: false,
        status: STATUS.success,
        message: action.payload,
      };
    case AUTH_ACTIONS.AUTH_UPDATE_PASSWORD:
      return {
        ...state,
        loading: false,
        status: STATUS.success,
        message: action.payload,
      };
    case AUTH_ACTIONS.AUTH_GET_USER:
      return {
        ...state,
        loading: false,
        status: STATUS.success,
        user: action.payload,
      };
    case AUTH_ACTIONS.AUTH_SUCCESS:
      return {
        ...state,
        loading: false,
        status: STATUS.success,
        message: action.payload,
      };
    case AUTH_ACTIONS.AUTH_ERROR:
      return {
        ...state,
        loading: false,
        status: STATUS.ERROR,
        message: action.payload,
        user: null,
      };
    case LOADING_ENDED:
      return {
        ...state,
        loading: false,
        status: null,
        message: null,
      };
    case AUTH_ACTIONS.AUTH_LOGOUT:
      return {
        ...INIT_STATE,
      };

    default:
      return state;
  }
};

const AuthContextProvider = ({ csrfToken, children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  function attach_headers(keys, headers) {
    keys.forEach((k) => {
      switch (k) {
        case HEADERS.CONTENT_TYPE:
          headers[HEADERS.CONTENT_TYPE] = "application/x-www-form-urlencoded";
          break;
        case HEADERS.CSRF:
          headers[HEADERS.CSRF] = csrfToken;
          break;

        default:
          break;
      }
    });
  }

  // registration handled here. when registered, email will be sent with a link to confrim email address,
  // and only after user can sign, hence here we just display a message about request status
  async function signUp(userForm) {
    const headers = {};
    attach_headers([HEADERS.CONTENT_TYPE, HEADERS.CSRF], headers);
    const body = qs.stringify({ user: userForm });

    cleanupAuthState();
    dispatch({ type: LOADING_STARTED });
    const resp = await supervise_rq(() =>
      axios.post(API_PATHS.AUTH_SIGN_UP, body, { headers })
    );

    if (resp.status === STATUS.SUCCESS) {
      dispatch({
        type: AUTH_ACTIONS.AUTH_REGISTER,
        payload:
          "You'll need to confirm your e-mail before you can sign in. An e-mail confirmation link has been sent to you.",
      });
    } else {
      dispatch({
        type: AUTH_ACTIONS.AUTH_ERROR,
        payload: resp.data,
      });
    }
  }

  // verify user's email and update state accordingly
  async function confirmEmail(confirmation_token) {
    cleanupAuthState();
    dispatch({ type: LOADING_STARTED });
    const resp = await supervise_rq(() =>
      axios(`${API_PATHS.AUTH_CONFIRM_EMAIL}/${confirmation_token}`)
    );

    if (resp.status === STATUS.SUCCESS) {
      dispatch({
        type: AUTH_ACTIONS.AUTH_CONFIRM_EMAIL,
        payload: "The email address has been confirmed.",
      });
    } else {
      dispatch({
        type: AUTH_ACTIONS.AUTH_ERROR,
        payload: "Email Confirmation FAILED!",
      });
    }
  }

  // sign in handled here
  // if authenticated, then user data fetched
  async function signIn(userForm) {
    const headers = {};
    attach_headers([HEADERS.CSRF], headers);
    const body = { user: userForm };

    cleanupAuthState();
    dispatch({ type: LOADING_STARTED });
    const resp = await supervise_rq(() =>
      axios.post(API_PATHS.AUTH_SIGN_IN, body, { headers })
    );

    if (resp.status === STATUS.SUCCESS) {
      const user = await getUserData();
      dispatch({
        type: AUTH_ACTIONS.AUTH_SUCCESS,
        payload: `Hi, ${user.first_name}. Sign-in is successful!`,
      });
    } else {
      dispatch({
        type: AUTH_ACTIONS.AUTH_ERROR,
        payload:
          "The provided login details did not work. Please verify your credentials, and try again.",
      });
    }
  }

  // log out handled here
  async function signOut() {
    const headers = {};
    attach_headers([HEADERS.CSRF], headers);

    cleanupAuthState();
    dispatch({ type: LOADING_STARTED });
    await supervise_rq(() =>
      axios.delete(API_PATHS.AUTH_SIGN_OUT, { headers })
    );

    dispatch({
      type: AUTH_ACTIONS.AUTH_LOGOUT,
    });
  }

  // request a reset password link here
  async function requestResetPassword(formData) {
    const headers = {};
    attach_headers([HEADERS.CSRF], headers);
    const body = { user: formData };

    cleanupAuthState();
    dispatch({ type: LOADING_STARTED });
    const resp = await supervise_rq(() =>
      axios.post(API_PATHS.AUTH_UPDATE_PASSWORD, body, { headers })
    );

    if (resp.status === STATUS.SUCCESS) {
      dispatch({
        type: AUTH_ACTIONS.AUTH_REQUEST_RESET_PASSWORD,
        payload:
          "If an account for the provided email exists, an email with reset instructions will be sent to you. Please check your inbox.",
      });
    } else {
      dispatch({
        type: AUTH_ACTIONS.AUTH_ERROR,
        payload: "Oops, something went wrong. Pleas try again later.",
      });
    }
  }

  // // verify the reset password token (*** currently not possible to check)
  // async function verifyResetPasswordToken(reset_token) {
  //   const headers = {};
  //   attach_headers([HEADERS.CSRF], headers);

  //   cleanupAuthState();
  //   dispatch({ type: LOADING_STARTED });
  //   const resp = await supervise_rq(() =>
  //     axios(`${API_PATHS.AUTH_UPDATE_PASSWORD}/${reset_token}`, { headers })
  //   );
  //   console.log(resp);

  //   // if (resp.status === STATUS.SUCCESS) {
  //   //   dispatch({
  //   //     type: AUTH_ACTIONS.AUTH_REQUEST_RESET_PASSWORD,
  //   //     payload:
  //   //       "If an account for the provided email exists, an email with reset instructions will be sent to you. Please check your inbox.",
  //   //   });
  //   // } else {
  //   //   dispatch({
  //   //     type: AUTH_ACTIONS.AUTH_ERROR,
  //   //     payload: "Oops, something went wrong. Pleas try again later.",
  //   //   });
  //   // }
  //   return false;
  // }

  // update password if reset link is correct else error
  async function updatePassword(formData, reset_token) {
    const headers = {};
    attach_headers([HEADERS.CSRF], headers);
    const body = { user: formData };

    cleanupAuthState();
    dispatch({ type: LOADING_STARTED });
    const resp = await supervise_rq(() =>
      axios.put(`${API_PATHS.AUTH_UPDATE_PASSWORD}/${reset_token}`, body, {
        headers,
      })
    );

    if (resp.status === STATUS.SUCCESS) {
      dispatch({
        type: AUTH_ACTIONS.AUTH_UPDATE_PASSWORD,
        payload: "Password updated.",
      });
    } else {
      dispatch({
        type: AUTH_ACTIONS.AUTH_ERROR,
        payload: "Oops, something went wrong. Pleas try again later.",
      });
    }
  }

  // user data fetched here
  async function getUserData() {
    const resp = await supervise_rq(() => axios(API_PATHS.AUTH_WHOAMI));

    if (resp.status === STATUS.SUCCESS) {
      dispatch({
        type: AUTH_ACTIONS.AUTH_GET_USER,
        payload: resp.data,
      });
    }
    return resp.data;
  }

  // this needed to clean state before performing some actions
  // or when some components do unmount
  function cleanupAuthState() {
    dispatch({ type: LOADING_ENDED });
  }

  // group all values that we wish to share/provide in context
  const values = {
    signUp,
    confirmEmail,
    signIn,
    signOut,
    requestResetPassword,
    // verifyResetPasswordToken,
    updatePassword,
    cleanupAuthState,
    getUserData,
    loading: state.loading,
    status: state.status,
    message: state.message,
    email_confirmed: state.email_confirmed,
    user: state.user,
  };

  return <authContext.Provider value={values}>{children}</authContext.Provider>;
};

export default AuthContextProvider;
