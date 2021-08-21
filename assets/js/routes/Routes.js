import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { URL_PATHS } from "./../helpers/consts";
import HomePage from "../Pages/HomePage";
import SignUpPage from "../Pages/SignUpPage";
import ConfirmEmailPage from "../pages/ConfirmEmailPage";
import SignInPage from "../Pages/SignInPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import ServicesPage from "../pages/ServicesPage";
import ProtectedRoute from "./ProtectedRoute";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={URL_PATHS.HOME} component={HomePage} />
        <Route exact path={URL_PATHS.SERVICES} component={ServicesPage} />

        <ProtectedRoute
          exact
          path={`${URL_PATHS.SERVICES}/:action`}
          component={ServicesPage}
        />
        <Route
          exact
          path={`${URL_PATHS.SERVICES}/:action/:id`}
          component={ServicesPage}
        />

        <Route exact path={URL_PATHS.SIGN_UP} component={SignUpPage} />
        <Route
          exact
          path={URL_PATHS.CONFIRM_EMAIL}
          component={ConfirmEmailPage}
        />
        <Route exact path={URL_PATHS.SIGN_IN} component={SignInPage} />
        <Route
          exact
          path={`${URL_PATHS.RESET_PASSWORD}/:reset_token`}
          component={ResetPasswordPage}
        />

        {/* <Route component={Page404} /> */}
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
