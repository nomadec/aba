import axios from "axios";
import React, { createContext, useContext, useReducer } from "react";
import { useHistory } from "react-router-dom";
import {
  API_PATHS,
  APPOINTMENTS_CREATE,
  APPOINTMENTS_GET,
  APPOINTMENTS_GET_DETAILS,
  COMMENTS_GET,
  LOADING_STARTED,
  PER_PAGE,
  ROLE_PROVIDER,
  SERVICES_CREATE,
  SERVICES_DROP_DETAILS,
  SERVICES_GET,
  SERVICES_GET_DETAILS,
  STATUS,
} from "../helpers/consts";
import { supervise_rq } from "../helpers/utils";
import { useAuth } from "./AuthContext";

const dataContext = createContext();

export const useData = () => {
  return useContext(dataContext);
};

const INIT_STATE = {
  loading: false,
  status: null,
  message: null,
  services: [],
  serviceDetails: {},
  servicesTotalPages: 1,
  servicesTotalCount: 0,
  servicesFilters: {},
  appointments: [],
  appointmentDetails: {},
  comments: [],
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case LOADING_STARTED:
      return {
        ...state,
        loading: true,
      };

    case SERVICES_CREATE:
      return {
        ...state,
        loading: false,
        serviceDetails: action.payload,
      };
    case SERVICES_GET:
      return {
        ...state,
        loading: false,
        services: action.payload.services,
        servicesTotalPages: action.payload.paginate.total_pages,
        servicesTotalCount: action.payload.paginate.total_count,
        servicesFilters: action.payload.filters,
      };
    case SERVICES_GET_DETAILS:
      return {
        ...state,
        loading: false,
        serviceDetails: action.payload,
      };
    case SERVICES_DROP_DETAILS:
      return {
        ...state,
        serviceDetails: {},
      };

    case APPOINTMENTS_CREATE:
      return {
        ...state,
        loading: false,
        appointmentDetails: action.payload,
      };
    case APPOINTMENTS_GET:
      return {
        ...state,
        loading: false,
        appointments: action.payload,
      };
    case APPOINTMENTS_GET_DETAILS:
      return {
        ...state,
        loading: false,
        appointmentDetails: action.payload,
      };

    case COMMENTS_GET:
      return {
        ...state,
        loading: false,
        comments: action.payload,
      };

    default:
      return state;
  }
};

const DataContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);
  const history = useHistory();
  const { user } = useAuth();

  // function to check if data (comment, service, appointment and etc) createad by user in session
  // with this check we can display or hide Edit/Delete buttons for owned or not items
  const verifyOwnership = (object) => user && object.user_id === user.id;

  // fetch list of services from API
  async function getServices() {
    const search = new URLSearchParams(history.location.search);
    search.set("_limit", PER_PAGE);
    history.push(`${history.location.pathname}?${search.toString()}`);

    dispatch({ type: LOADING_STARTED });
    const resp = await supervise_rq(() =>
      axios(`${API_PATHS.SERVICES}/${window.location.search}`)
    );
    console.log(resp);

    if (resp.status === STATUS.SUCCESS) {
      dispatch({
        type: SERVICES_GET,
        payload: resp.data,
      });
    }
  }

  // get service details from API
  async function getServiceDetails(id) {
    dispatch({ type: LOADING_STARTED });
    const resp = await supervise_rq(() => axios(`${API_PATHS.SERVICES}/${id}`));

    if (resp.status === STATUS.SUCCESS) {
      dispatch({
        type: SERVICES_GET_DETAILS,
        payload: resp.data,
      });
    }
  }

  // drop service details on component unmount
  function dropServiceDetails() {
    dispatch({
      type: SERVICES_DROP_DETAILS,
    });
  }

  // post new service to API
  async function createService(formData) {
    const body = { service: formData };

    dispatch({ type: LOADING_STARTED });
    const resp = await supervise_rq(() => axios.post(API_PATHS.SERVICES, body));

    if (resp.status === STATUS.SUCCESS) {
      dispatch({
        type: SERVICES_CREATE,
        payload: resp.data,
      });
      return resp.data;
    }
  }

  // send service changes to API
  async function editService(id, formData) {
    const body = { service: formData };

    dispatch({ type: LOADING_STARTED });
    const resp = await supervise_rq(() =>
      axios.put(`${API_PATHS.SERVICES}/${id}`, body)
    );

    if (resp.status === STATUS.SUCCESS) {
      dispatch({
        type: SERVICES_GET_DETAILS,
        payload: resp.data,
      });
    }
  }

  // delete Service
  async function deleteService(id) {
    const resp = await supervise_rq(() =>
      axios.delete(`${API_PATHS.SERVICES}/${id}`)
    );

    console.log(resp);
  }

  // create new Appointment on selected Service
  async function createAppointment(formData) {
    const body = { appointment: formData };

    dispatch({ type: LOADING_STARTED });
    const resp = await supervise_rq(() =>
      axios.post(API_PATHS.APPOINTMENTS, body)
    );

    if (resp.status === STATUS.SUCCESS) {
      dispatch({
        type: APPOINTMENTS_CREATE,
        payload: resp.data,
      });
      return resp.data;
    }
  }

  // fetch list of Appointments from API
  async function getAppointments() {
    // need to add a validation to request data that user is allowed to view
    // if user role is provider, then get appointments that are linked to Services of this provider
    // if user role is consumer, then get appointments that are linked to this user_id
    // let params;
    // if (user.role === ROLE_PROVIDER) {
    //   params =
    // }

    dispatch({ type: LOADING_STARTED });
    const resp = await supervise_rq(() => axios(API_PATHS.APPOINTMENTS));

    console.log(resp);

    if (resp.status === STATUS.SUCCESS) {
      dispatch({
        type: APPOINTMENTS_GET,
        payload: resp.data,
      });
    }
  }

  // get Appointment details from API
  async function getAppointmentDetails(id) {
    dispatch({ type: LOADING_STARTED });
    const resp = await supervise_rq(() =>
      axios(`${API_PATHS.APPOINTMENTS}/${id}`)
    );

    if (resp.status === STATUS.SUCCESS) {
      dispatch({
        type: APPOINTMENTS_GET_DETAILS,
        payload: resp.data,
      });
    }
  }

  // save Appointment changes
  async function editAppointment(id, formData) {
    const body = { service: formData };

    dispatch({ type: LOADING_STARTED });
    const resp = await supervise_rq(() =>
      axios.put(`${API_PATHS.APPOINTMENTS}/${id}`, body)
    );

    if (resp.status === STATUS.SUCCESS) {
      dispatch({
        type: APPOINTMENTS_GET_DETAILS,
        payload: resp.data,
      });
    }
  }

  // fetch list of Comments from API
  async function getComments(serviceId) {
    dispatch({ type: LOADING_STARTED });
    const resp = await supervise_rq(() =>
      axios(`${API_PATHS.COMMENTS}?_service_id=${serviceId}`)
    );

    if (resp.status === STATUS.SUCCESS) {
      dispatch({
        type: COMMENTS_GET,
        payload: resp.data,
      });
    }
  }

  // add new Comment for Service in view
  async function createComment(formData) {
    const body = { comment: formData };

    dispatch({ type: LOADING_STARTED });
    const resp = await supervise_rq(() => axios.post(API_PATHS.COMMENTS, body));

    if (resp.status === STATUS.SUCCESS) {
      await getComments(state.serviceDetails.id);
    }
  }

  // save changes on a Comment
  async function editComment(formData) {
    const body = { comment: formData };

    dispatch({ type: LOADING_STARTED });
    const resp = await supervise_rq(() =>
      axios.put(`${API_PATHS.COMMENTS}/${formData.id}`, body)
    );

    if (resp.status === STATUS.SUCCESS) {
      await getComments(state.serviceDetails.id);
    }
  }

  // delete Comment
  async function deleteComment(id) {
    const resp = await supervise_rq(() =>
      axios.delete(`${API_PATHS.COMMENTS}/${id}`)
    );
    if (resp.status === STATUS.SUCCESS) {
      await getComments(state.serviceDetails.id);
    }
    console.log(resp);
  }

  const values = {
    loading: state.loading,

    services: state.services,
    serviceDetails: state.serviceDetails,
    servicesTotalPages: state.servicesTotalPages,
    servicesTotalCount: state.servicesTotalCount,
    servicesFilters: state.servicesFilters,
    appointments: state.appointments,
    appointmentDetails: state.appointmentDetails,
    comments: state.comments,

    verifyOwnership,

    createService,
    getServices,
    getServiceDetails,
    dropServiceDetails,
    editService,
    deleteService,

    createAppointment,
    getAppointments,
    getAppointmentDetails,
    editAppointment,

    createComment,
    getComments,
    editComment,
    deleteComment,
  };

  return <dataContext.Provider value={values}>{children}</dataContext.Provider>;
};

export default DataContextProvider;
