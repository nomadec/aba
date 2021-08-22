import React from "react";
import ServiceForm from "../components/Services/ServiceForm";
import MainLayout from "../Layouts/MainLayout";

const ServicesEditPage = () => {
  return (
    <MainLayout>
      <ServiceForm action={"edit"} />
    </MainLayout>
  );
};

export default ServicesEditPage;
