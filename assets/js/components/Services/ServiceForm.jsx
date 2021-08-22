import { Button, Container, Paper, TextField } from "@material-ui/core";
import React from "react";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import { useData } from "../../contexts/DataContext";
import { URL_PATHS } from "../../helpers/consts";

const ServiceForm = ({ action }) => {
  const history = useHistory();
  const { id } = useParams();
  const {
    loading,
    createService,
    editService,
    getServiceDetails,
    serviceDetails,
    dropServiceDetails,
  } = useData();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const form = {
    editable: false,
    title: "Detailed View",
    button: null,
  };
  if (action === "new") {
    form.editable = true;
    form.title = "Create Service";
    form.button = "Create";
  }
  if (action === "edit") {
    form.editable = true;
    form.title = "Edit Service";
    form.button = "Save Changes";
  }
  console.log(action, id, form);

  useEffect(() => {
    if (action === "show" || action === "edit") {
      getServiceDetails(id);
    }

    return () => {
      dropServiceDetails();
    };
  }, [id]);

  async function submitForm(formData) {
    if (action === "new") {
      const newService = await createService(formData);
      console.log(newService);
      handleShow(newService.id);
    } else if (action === "edit") {
      editService(id, formData);
      dropServiceDetails();
      handleShow(id);
    }
  }

  function handleEdit(id) {
    history.push(`${URL_PATHS.SERVICE_EDIT}/${id}`);
  }
  function handleShow(id) {
    history.push(`${URL_PATHS.SERVICE_SHOW}/${id}`);
  }

  const renderViewForm = loading ? (
    <div>loading...</div>
  ) : (
    <div>
      <h4>{form.title}</h4>
      <p>{serviceDetails.name}</p>
      <p>{serviceDetails.price}</p>
      <p>{serviceDetails.duration}</p>
      <p>{serviceDetails.location}</p>
      <p>{serviceDetails.description}</p>
      <button onClick={() => handleEdit(id)}>Edit</button>
    </div>
  );

  const renderEditableForm = loading ? (
    <p>loading...</p>
  ) : (
    <Paper>
      <Container>
        <h4>{form.title}</h4>
        <form noValidate autoComplete="off" onSubmit={handleSubmit(submitForm)}>
          <Controller
            name="name"
            required={true}
            control={control}
            defaultValue={serviceDetails.name}
            render={({ field }) => (
              <TextField
                {...field}
                name="name"
                variant="outlined"
                label="Service Name"
                style={{ marginBottom: 10 }}
              />
            )}
          />
          <Controller
            name="price"
            required={true}
            control={control}
            defaultValue={serviceDetails.price}
            render={({ field }) => (
              <TextField
                {...field}
                name="price"
                variant="outlined"
                label="Price"
                style={{ marginBottom: 10 }}
              />
            )}
          />
          <Controller
            name="duration"
            required={true}
            control={control}
            defaultValue={serviceDetails.duration}
            render={({ field }) => (
              <TextField
                {...field}
                name="duration"
                variant="outlined"
                label="Duration"
                style={{ marginBottom: 10 }}
              />
            )}
          />
          <Controller
            name="location"
            required={true}
            control={control}
            defaultValue={serviceDetails.location}
            render={({ field }) => (
              <TextField
                {...field}
                name="location"
                variant="outlined"
                label="Location"
                style={{ marginBottom: 10 }}
              />
            )}
          />
          <Controller
            name="description"
            required={true}
            control={control}
            defaultValue={serviceDetails.description}
            render={({ field }) => (
              <TextField
                {...field}
                name="description"
                variant="outlined"
                label="Description"
                style={{ marginBottom: 10 }}
              />
            )}
          />

          <Button variant="contained" color="secondary" type="submit">
            {form.button}
          </Button>
        </form>
      </Container>
    </Paper>
  );

  return form.editable ? renderEditableForm : renderViewForm;
};

export default ServiceForm;
