import React from "react";
import NotificationsBar from "../components/Notifications/NotificationsBar";

const AuthLayout = ({ children }) => {
  return (
    <>
      {children}
      <NotificationsBar />
    </>
  );
};

export default AuthLayout;
