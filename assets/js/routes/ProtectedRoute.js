import React, { useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuth } from "./../contexts/AuthContext";
import { URL_PATHS } from "./../helpers/consts";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { user, getUserData } = useAuth();

  // fetching user data is normally done at MainLayout level,
  // however on page reloads for Protected routes user data is late to fetch
  // and the redirect is triggered
  useEffect(() => {
    if (!user) {
      getUserData();
    }
  }, []);

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
