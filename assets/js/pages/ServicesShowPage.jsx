import React from "react";
import ServiceForm from "../components/Services/ServiceForm";
import MainLayout from "../Layouts/MainLayout";

const ServicesShowPage = () => {
  return (
    <MainLayout>
      <ServiceForm action={"show"} />
    </MainLayout>
  );
};

export default ServicesShowPage;
