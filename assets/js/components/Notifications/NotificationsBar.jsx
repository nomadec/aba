import React, { useState } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import Slide from "@material-ui/core/Slide";
import { useEffect } from "react";
import { Alert, AlertTitle } from "@material-ui/lab";
import { useAuth } from "../../contexts/AuthContext";

function TransitionLeft(props) {
  return <Slide {...props} direction="left" />;
}

function TransitionUp(props) {
  return <Slide {...props} direction="up" />;
}

function TransitionRight(props) {
  return <Slide {...props} direction="right" />;
}

function TransitionDown(props) {
  return <Slide {...props} direction="down" />;
}

//  this is a universal Notifications component to display and
//  inform about some event status and/or update to user
//  in order to watch for new messages, add another useEffect and define which variable you wish to depend on
const NotificationsBar = () => {
  const { status, message, cleanupAuthState } = useAuth();
  const [open, setOpen] = useState(false);
  const [transition, setTransition] = useState(undefined);

  //  watch for message changes from Auth to trigger re-render of Snackbar
  useEffect(() => {
    setTransition(() => TransitionDown);
    setOpen(true);
  }, [message]);

  function handleClose() {
    cleanupAuthState();
    setOpen(false);
  }

  return (
    <>
      {message && (
        <Snackbar
          open={open}
          autoHideDuration={5000}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          onClose={handleClose}
          TransitionComponent={transition}
          key={transition ? transition.name : ""}
        >
          <Alert severity={status}>{message}</Alert>
        </Snackbar>
      )}
    </>
  );
};

export default NotificationsBar;
