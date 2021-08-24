import React, { useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { useAuth } from "./../../contexts/AuthContext";
import { URL_PATHS } from "./../../helpers/consts";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const ResetPassword = () => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const { control, handleSubmit } = useForm();

  const { from } = location.state || { from: { pathname: "/" } };

  const { reset_token } = useParams();
  const { requestResetPassword, updatePassword } = useAuth();
  const show_request_form = reset_token === "new";

  // currently not possible to check
  // function verifyToken() {
  //   if (reset_token === "new") {
  //     return true;
  //   } else {
  //     return !verifyResetPasswordToken(reset_token);
  //   }
  // }

  // useEffect(() => {
  //   if (reset_token === "new") {
  //     history.push(URL_PATHS.SIGN_IN);
  //   } else {
  //     confirmEmail(confirmation_token);
  //   }
  // }, [email_confirmed]);

  // useEffect(() => {
  //   if (user) {
  //     history.replace(from);
  //   }
  // }, [user]);

  function onSubmit(data) {
    if (show_request_form) {
      requestResetPassword(data);
    } else {
      updatePassword(data, reset_token);
      history.push(URL_PATHS.SIGN_IN);
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Reset Password
        </Typography>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={classes.form}
          noValidate
        >
          {show_request_form ? (
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
              )}
            />
          ) : (
            <>
              <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />
                )}
              />
              <Controller
                name="password_confirmation"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant="outlined"
                    required
                    fullWidth
                    name="password_confirmation"
                    label="Repeat Password"
                    type="password"
                    id="password_confirmation"
                    autoComplete="current-password"
                  />
                )}
              />
            </>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {show_request_form ? "Request a link" : "Update password"}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to={URL_PATHS.SIGN_IN} variant="body2">
                Back to Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default ResetPassword;
