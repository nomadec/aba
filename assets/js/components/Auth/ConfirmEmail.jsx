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

const ConfirmEmail = () => {
  const classes = useStyles();
  const history = useHistory();

  const { confirmation_token } = useParams();
  const { email_confirmed, confirmEmail } = useAuth();

  useEffect(() => {
    if (email_confirmed) {
      history.push(URL_PATHS.SIGN_IN);
    } else {
      confirmEmail(confirmation_token);
    }
  }, [email_confirmed]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Confirming Email
        </Typography>
      </div>
    </Container>
  );
};

export default ConfirmEmail;
