import React, { useEffect } from "react";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import NotificationsBar from "../components/Notifications/NotificationsBar";
import { useAuth } from "../contexts/AuthContext";
import DataContextProvider from "../contexts/DataContext";

const MainLayout = ({ children }) => {
  const { user, getUserData } = useAuth();

  // we fetch user data (if authenticated and if user is empty ) at this layout only,
  // as only components under MainLayout do require user data
  useEffect(() => {
    if (!user) {
      getUserData();
    }
  }, []);

  return (
    <DataContextProvider>
      <Header />
      {children}
      <Footer />
      <NotificationsBar />
    </DataContextProvider>
  );
};

export default MainLayout;
