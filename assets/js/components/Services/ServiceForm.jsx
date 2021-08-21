import { Button, Container, Paper, TextField } from "@material-ui/core";
import React from "react";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useData } from "../../contexts/DataContext";
import { URL_PATHS } from "../../helpers/consts";

const ServiceForm = ({ action, id }) => {
  const {
    createService,
    editService,
    getServiceDetails,
    serviceDetails,
    dropServiceDetails,
  } = useData();
  const history = useHistory();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  console.log(form);
  const form = {
    editable: false,
    title: "Detailed View",
    button: null,

    name: "",
    price: "",
    duration: "",
    location: "",
    description: "",
  };
  console.log(form);

  useEffect(() => {
    if (action === "show" || action === "edit") {
      getServiceDetails(id);
    }

    return () => {
      dropServiceDetails();
    };
  }, [id]);

  useEffect(() => {
    form.name = serviceDetails.name;
    form.price = serviceDetails.price;
    form.duration = serviceDetails.duration;
    form.location = serviceDetails.location;
    form.description = serviceDetails.description;
  }, [serviceDetails]);

  if (action === "new") {
    form.editable = true;
    form.title = "Create Service";
    form.button = "Create";
  } else if (action === "edit") {
    form.editable = true;
    form.title = "Edit Service";
    form.button = "Save Changes";
  }

  async function submitForm(formData) {
    if (action === "new") {
      const newService = await createService(formData);
      console.log(newService);
      handleShow(newService.id);
    } else if (action === "edit") {
      // formData.id = id;
      editService(id, formData);
      dropServiceDetails();
      handleShow(id);
    }
  }

  function handleEdit(id) {
    history.push(URL_PATHS.SERVICE_EDIT(id));
  }
  function handleShow(id) {
    history.push(URL_PATHS.SERVICE_SHOW(id));
  }

  const renderViewForm = (
    <div>
      <h4>{form.title}</h4>
      <p>{form.name}</p>
      <p>{form.price}</p>
      <p>{form.duration}</p>
      <p>{form.location}</p>
      <p>{form.description}</p>
      <button onClick={() => handleEdit(id)}>Edit</button>
    </div>
  );

  const renderEditableForm = serviceDetails.name ? (
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
            defaultValue={form.name}
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
            defaultValue={form.price}
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
            defaultValue={form.duration}
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
            defaultValue={form.location}
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
            defaultValue={form.description}
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
