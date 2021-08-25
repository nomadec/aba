import { Divider } from "@material-ui/core";
import React from "react";
import AppointmentBookingForm from "../components/Appointments/AppointmentBookingForm";
import ServiceForm from "../components/Services/ServiceForm";
import { useAuth } from "../contexts/AuthContext";
import { permittedRole } from "../helpers/utils";
import MainLayoutFooterLess from "../Layouts/MainLayoutFooterLess";

const ServicesShowPage = () => {
  const { user } = useAuth();
  return (
    <MainLayoutFooterLess>
      <div className="service_show_page">
        <ServiceForm action={"show"} />
        {permittedRole(user, "consumer") ? (
          <>
            <Divider />
            <AppointmentBookingForm />
          </>
        ) : null}
      </div>
    </MainLayoutFooterLess>
  );
};

export default ServicesShowPage;
