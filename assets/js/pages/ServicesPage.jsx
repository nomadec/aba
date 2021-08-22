import React from "react";
import { Link } from "react-router-dom";
import ServicesBody from "../components/Services/ServicesBody";
import { URL_PATHS } from "../helpers/consts";
import MainLayout from "../Layouts/MainLayout";

const ServicesPage = () => {
  return (
    <MainLayout>
      <Link to={URL_PATHS.SERVICE_CREATE}>Create Service</Link>
      <ServicesBody />
    </MainLayout>
  );
};

export default ServicesPage;
