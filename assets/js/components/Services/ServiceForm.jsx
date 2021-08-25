import {
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@material-ui/core";
import React from "react";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import { useData } from "../../contexts/DataContext";
import { SERVICE_CATEGORIES, URL_PATHS } from "../../helpers/consts";
import ServiceDetails from "./ServiceDetails";

const ServiceForm = ({ action }) => {
  const history = useHistory();
  const { id } = useParams();
  const {
    loading,
    createService,
    editService,
    deleteService,
    getServiceDetails,
    serviceDetails,
    dropServiceDetails,
    createComment,
    getComments,
    comments,
    verifyOwnership,
  } = useData();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const form = {
    editable: false,
    editMode: "",
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
    form.editMode = true;
    form.title = "Edit Service";
    form.button = "Save Changes";
  }

  useEffect(() => {
    if (action === "show" || action === "edit") {
      getServiceDetails(id);
      getComments(id);
    }

    return () => {
      dropServiceDetails();
    };
  }, [id]);

  async function submitForm(formData) {
    if (action === "new") {
      const newService = await createService(formData);
      handleShow(newService.id);
    } else if (action === "edit") {
      await editService(id, formData);
      await dropServiceDetails();
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
    <ServiceDetails
      serviceDetails={serviceDetails}
      handleEdit={handleEdit}
      handleDelete={deleteService}
      createComment={createComment}
      comments={comments}
      verifyOwnership={verifyOwnership}
    />
  );

  const renderEditableForm = loading ? (
    <p>loading...</p>
  ) : (
    <div className="service_editable_form">
      <Paper className="service_editable_form_paper">
        <Container>
          <form
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(submitForm)}
          >
            <Controller
              name="name"
              required={true}
              control={control}
              defaultValue={form.editMode && serviceDetails.name}
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
              name="category"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <FormControl
                  variant="outlined"
                  required
                  style={{ width: 195, marginBottom: 10 }}
                >
                  <InputLabel id="category_label">Category</InputLabel>
                  <Select
                    {...field}
                    labelId="category_label"
                    id="category"
                    label="category"
                  >
                    {SERVICE_CATEGORIES.map((cat) => (
                      <MenuItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />

            <Controller
              name="price"
              required={true}
              control={control}
              defaultValue={form.editMode && serviceDetails.price}
              render={({ field }) => (
                <TextField
                  {...field}
                  name="price"
                  variant="outlined"
                  label="Price $"
                  style={{ marginBottom: 10 }}
                />
              )}
            />
            <Controller
              name="duration"
              required={true}
              control={control}
              defaultValue={form.editMode && serviceDetails.duration}
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
              defaultValue={form.editMode && serviceDetails.location}
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
              name="image"
              required={true}
              control={control}
              defaultValue={form.editMode && serviceDetails.image}
              render={({ field }) => (
                <TextField
                  {...field}
                  name="image"
                  variant="outlined"
                  label="Image"
                  style={{ marginBottom: 10 }}
                />
              )}
            />
            <Controller
              name="description"
              required={true}
              control={control}
              defaultValue={form.editMode && serviceDetails.description}
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
    </div>
  );

  return form.editable ? renderEditableForm : renderViewForm;
};

export default ServiceForm;
