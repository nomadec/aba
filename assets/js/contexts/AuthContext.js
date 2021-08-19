import axios from "axios";
import React, { createContext, useContext, useReducer } from "react";
import { API_AUTH_SIGN_UP, AUTH_ACTIONS, STATUS } from "../helpers/consts";
import { supervise } from "../helpers/utils";

const authContext = createContext();

export const useAuth = () => {
  return useContext(authContext);
};

const INIT_STATE = {
  user: null,
  loading: false,
  status: null,
  message: null,
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.AUTH_LOADING:
      return {
        ...state,
        loading: true,
      };
    case AUTH_ACTIONS.AUTH_SUCCESS:
      return {
        ...state,
        loading: false,
        status: STATUS.success,
        message: `Hi, ${action.payload.user_first_name}. Sign-in is successful!`,
        user: action.payload,
      };
    case AUTH_ACTIONS.AUTH_ERROR:
      return {
        ...state,
        loading: false,
        status: STATUS.ERROR,
        message: action.payload,
        user: null,
      };
    case AUTH_ACTIONS.CLEAR_AUTH_STATE:
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

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  async function signUp(userForm) {
    const user = {
      email: userForm.email,
      password: userForm.password,
      password_confirmation: userForm.password,
      first_name: userForm.firstName,
      last_name: userForm.lastName,
      role: "consumer",
    };

    dispatch({ type: AUTH_ACTIONS.CLEAR_AUTH_STATE });
    dispatch({ type: AUTH_ACTIONS.AUTH_LOADING });
    const resp = await supervise(() => axios.post(API_AUTH_SIGN_UP, { user }));
    console.log(resp);
    if (resp.status === "success") {
      dispatch({
        type: AUTH_ACTIONS.AUTH_SUCCESS,
        payload: resp.data,
      });
    } else {
      dispatch({
        type: AUTH_ACTIONS.AUTH_ERROR,
        payload: resp.data,
      });
    }
  }

  function clearAuthState() {
    dispatch({ type: AUTH_ACTIONS.CLEAR_AUTH_STATE });
  }

  const values = {
    signUp,
    clearAuthState,
    loading: state.loading,
    status: state.status,
    message: state.message,
  };
  return <authContext.Provider value={values}>{children}</authContext.Provider>;
};

export default AuthContextProvider;
