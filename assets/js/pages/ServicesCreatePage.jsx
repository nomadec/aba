import React from "react";
import ServiceForm from "../components/Services/ServiceForm";
import MainLayoutFooterLess from "../Layouts/MainLayoutFooterLess";

const ServicesCreatePage = () => {
  return (
    <MainLayoutFooterLess>
      <ServiceForm action={"new"} />
    </MainLayoutFooterLess>
  );
};

export default ServicesCreatePage;
