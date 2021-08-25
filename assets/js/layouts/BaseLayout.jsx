import React from "react";
import NotificationsBar from "../components/Notifications/NotificationsBar";

const BaseLayout = ({ children }) => {
  return (
    <div
      style={{
        margin: "0 15px",
        padding: "20px 0",
        borderRadius: 16,
        minHeight: "100vh",
      }}
    >
      {children}
      <NotificationsBar />
    </div>
  );
};

export default BaseLayout;
