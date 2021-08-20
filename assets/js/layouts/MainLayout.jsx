import React, { useEffect } from "react";
import Header from "../components/Header/Header";
import NotificationsBar from "../components/Notifications/NotificationsBar";
import { useAuth } from "../contexts/AuthContext";

const MainLayout = ({ children }) => {
  const { user, getUserData } = useAuth();

  useEffect(() => {
    if (!user) {
      getUserData();
    }
  }, []);

  return (
    <>
      <Header />
      <div>{children}</div>
      <div>Footer</div>
      <NotificationsBar />
    </>
  );
};

export default MainLayout;
