import React from "react";
import AppointmentBookingForm from "../components/Appointments/AppointmentBookingForm";
import CommentsList from "../components/Comments/CommentsList";
import ServiceForm from "../components/Services/ServiceForm";
import MainLayout from "../Layouts/MainLayout";

const ServicesShowPage = () => {
  return (
    <MainLayout>
      <ServiceForm action={"show"} />
      <CommentsList />
      <AppointmentBookingForm />
    </MainLayout>
  );
};

export default ServicesShowPage;
