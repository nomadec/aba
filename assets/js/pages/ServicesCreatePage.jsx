import React from "react";
import ServiceForm from "../components/Services/ServiceForm";
import MainLayout from "../Layouts/MainLayout";

const ServicesCreatePage = () => {
  return (
    <MainLayout>
      <ServiceForm action={"new"} />
    </MainLayout>
  );
};

export default ServicesCreatePage;
