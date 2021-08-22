import moment from "moment";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useData } from "../../contexts/DataContext";

const AppointmentsBody = () => {
  const { getAppointments, appointments } = useData();
  const { history } = useHistory();

  useEffect(() => {
    getAppointments();
  }, []);

  // function handleShow(id) {
  //   history.push(`${URL_PATHS.SERVICE_SHOW}/${id}`);
  // }
  // function handleEdit(id) {
  //   history.push(`${URL_PATHS.SERVICE_EDIT}/${id}`);
  // }
  // function handleDelete(id) {
  //   deleteService(id);
  //   getAppointments();
  // }

  return (
    <div>
      <h1>Agenda</h1>
      {appointments.length === 0 ? (
        <p>No Records Found</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Price</th>
              <th>Location</th>
              <th>Duration</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{moment(item.date_time).format("ll")}</td>
                <td>{moment(item.date_time).format("LT")}</td>
                <td>{item.price}</td>
                <td>{item.location}</td>
                <td>{item.duration}</td>
                {/* <td>
                  <button onClick={() => handleShow(item.id)}>Show</button>
                </td>
                <td>
                  <button onClick={() => handleEdit(item.id)}>Edit</button>
                </td> */}
                {/* <td>
                  <button onClick={() => handleDelete(item.id)}>Delete</button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AppointmentsBody;
