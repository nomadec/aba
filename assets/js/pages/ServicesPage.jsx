import React from "react";
import { Link, useParams } from "react-router-dom";
import ServiceForm from "../components/Services/ServiceForm";
import ServicesBody from "../components/Services/ServicesBody";
import { URL_PATHS } from "../helpers/consts";
import MainLayout from "../Layouts/MainLayout";

const ServicesPage = () => {
  const { action, id } = useParams();
  console.log(action, id);
  const form_is_open = Boolean(action);

  return (
    <MainLayout>
      {form_is_open ? (
        <ServiceForm action={action} id={id} />
      ) : (
        <>
          <Link to={URL_PATHS.SERVICE_CREATE}>Create Service</Link>
          <ServicesBody />
        </>
      )}
    </MainLayout>
  );
};

export default ServicesPage;
