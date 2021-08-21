import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuth } from "./../contexts/AuthContext";
import { URL_PATHS } from "./../helpers/consts";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { user } = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
          <Component />
        ) : (
          <Redirect
            to={{ pathname: URL_PATHS.SIGN_IN, state: { from: location } }}
          />
        )
      }
    />
  );
};

export default ProtectedRoute;
