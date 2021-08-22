import React from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useData } from "../../contexts/DataContext";
import { URL_PATHS } from "../../helpers/consts";

const ServicesBody = () => {
  const { getServices, deleteService, services } = useData();
  const history = useHistory();

  useEffect(() => {
    getServices();
  }, []);

  function handleShow(id) {
    history.push(`${URL_PATHS.SERVICE_SHOW}/${id}`);
  }
  function handleEdit(id) {
    history.push(`${URL_PATHS.SERVICE_EDIT}/${id}`);
  }
  function handleDelete(id) {
    deleteService(id);
    getServices();
  }

  return (
    <div>
      <h1>Catalogue</h1>
      {services.length === 0 ? (
        <p>No Records Found</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Location</th>
              <th>Duration</th>
              <th>Description</th>
              <th>Provider</th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {services.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.location}</td>
                <td>{item.duration}</td>
                <td>{item.description}</td>
                <td>{item.user_id}</td>
                <td>
                  <button onClick={() => handleShow(item.id)}>Show</button>
                </td>
                <td>
                  <button onClick={() => handleEdit(item.id)}>Edit</button>
                </td>
                <td>
                  <button onClick={() => handleDelete(item.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ServicesBody;
