import moment from "moment";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useData } from "../../contexts/DataContext";

const AppointmentsBody = () => {
  const { getAppointments, appointments } = useData();

  useEffect(() => {
    getAppointments();
  }, []);

  return (
    <div className="appointments_list">
      {appointments.length === 0 ? (
        <p>No Appointments Found</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Duration</th>
              <th>Service Name</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((item) => (
              <tr key={item.id}>
                <td>
                  <div>{moment(item.date_time).format("ll")}</div>
                  <div>{moment(item.date_time).format("LT")}</div>
                </td>
                <td>{item.service?.duration}min</td>
                <td>
                  <div>{item.service?.name}</div>
                  <div>{item.service?.location}</div>
                </td>
                <td>${item.service?.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AppointmentsBody;
