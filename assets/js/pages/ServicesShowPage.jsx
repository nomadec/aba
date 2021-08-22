import React from "react";
import AppointmentBookingForm from "../components/Appointments/AppointmentBookingForm";
import ServiceForm from "../components/Services/ServiceForm";
import MainLayout from "../Layouts/MainLayout";

const ServicesShowPage = () => {
  return (
    <MainLayout>
      <ServiceForm action={"show"} />
      <AppointmentBookingForm />
    </MainLayout>
  );
};

export default ServicesShowPage;
