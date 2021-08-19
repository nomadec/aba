import React from "react";
import NotificationsBar from "../components/Notifications/NotificationsBar";

const MainLayout = ({ children }) => {
  return (
    <>
      <div>Header</div>
      <div>{children}</div>
      <div>Footer</div>
      <NotificationsBar />
    </>
  );
};

export default MainLayout;
