import React, { useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { permittedRole } from "../helpers/utils";
import { useAuth } from "./../contexts/AuthContext";
import { URL_PATHS } from "./../helpers/consts";

const ProtectedRoute = ({ component: Component, role, ...rest }) => {
  const { user, getUserData } = useAuth();

  // fetching user data is normally done at MainLayout level,
  // however on page reloads for Protected routes user data is late to fetch
  // and the redirect is triggered
  useEffect(() => {
    if (!user) {
      getUserData();
    }
  }, []);

  const redirect = ({ path, location }) => (
    <Redirect to={{ pathname: path, state: { from: location } }} />
  );

  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
          permittedRole(user, role) ? (
            <Component />
          ) : (
            redirect({ path: URL_PATHS.HOME, location })
          )
        ) : (
          redirect({ path: URL_PATHS.SIGN_IN, location })
        )
      }
    />
  );
};

export default ProtectedRoute;
