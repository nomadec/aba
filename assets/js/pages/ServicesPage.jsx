import React from "react";
import { Link } from "react-router-dom";
import ServicesList from "../components/Services/ServicesList";
import { URL_PATHS } from "../helpers/consts";
import MainLayout from "../Layouts/MainLayout";

const ServicesPage = () => {
  return (
    <MainLayout>
      <ServicesList />
    </MainLayout>
  );
};

export default ServicesPage;
