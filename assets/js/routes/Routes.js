import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ROLE_PROVIDER, URL_PATHS } from "./../helpers/consts";
import HomePage from "../Pages/HomePage";
import SignUpPage from "../Pages/SignUpPage";
import ConfirmEmailPage from "../pages/ConfirmEmailPage";
import SignInPage from "../Pages/SignInPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import ServicesPage from "../pages/ServicesPage";
import ProtectedRoute from "./ProtectedRoute";
import ServicesCreatePage from "../pages/ServicesCreatePage";
import ServicesShowPage from "../pages/ServicesShowPage";
import ServicesEditPage from "../pages/ServicesEditPage";
import AppointmentsPage from "../pages/AppointmentsPage";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={URL_PATHS.HOME} component={HomePage} />
        <Route exact path={URL_PATHS.SERVICES} component={ServicesPage} />
        <Route
          exact
          path={`${URL_PATHS.SERVICE_SHOW}/:id`}
          component={ServicesShowPage}
        />
        <ProtectedRoute
          exact
          path={URL_PATHS.SERVICE_CREATE}
          component={ServicesCreatePage}
          role={ROLE_PROVIDER}
        />
        <ProtectedRoute
          exact
          path={`${URL_PATHS.SERVICE_EDIT}/:id`}
          component={ServicesEditPage}
          role={ROLE_PROVIDER}
        />

        <ProtectedRoute
          exact
          path={URL_PATHS.APPOINTMENTS}
          component={AppointmentsPage}
        />
        <ProtectedRoute
          exact
          path={URL_PATHS.CHAT}
          component={AppointmentsPage}
        />
        <ProtectedRoute
          exact
          path={URL_PATHS.FAVORITES}
          component={AppointmentsPage}
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
