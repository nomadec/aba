import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { URL_PATHS } from "./../helpers/consts";
import HomePage from "../Pages/HomePage";
import SignInPage from "../Pages/SignInPage";
import SignUpPage from "../Pages/SignUpPage";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={URL_PATHS.HOME} component={HomePage} />
        <Route exact path={URL_PATHS.SIGN_IN} component={SignInPage} />
        <Route exact path={URL_PATHS.SIGN_UP} component={SignUpPage} />

        {/* <Route component={Page404} /> */}
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
