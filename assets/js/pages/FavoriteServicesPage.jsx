import React from "react";
import ServicesList from "../components/Services/ServicesList";
import MainLayout from "../Layouts/MainLayout";

const FavoriteServicesPage = () => {
  return (
    <MainLayout>
      <ServicesList />
    </MainLayout>
  );
};

export default FavoriteServicesPage;
