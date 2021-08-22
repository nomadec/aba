import axios from "axios";
import React, { createContext, useContext, useReducer } from "react";
import {
  API_PATHS,
  APPOINTMENTS_CREATE,
  APPOINTMENTS_GET,
  APPOINTMENTS_GET_DETAILS,
  LOADING_STARTED,
  SERVICES_CREATE,
  SERVICES_DROP_DETAILS,
  SERVICES_GET,
  SERVICES_GET_DETAILS,
  STATUS,
} from "../helpers/consts";
import { supervise_rq } from "../helpers/utils";

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
  appointments: [],
  appointmentDetails: {},
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
        services: action.payload,
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

    default:
      return state;
  }
};

const DataContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  // fetch list of services from API
  async function getServices() {
    dispatch({ type: LOADING_STARTED });
    const resp = await supervise_rq(() => axios(API_PATHS.SERVICES));

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

  // delete service
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
    dispatch({ type: LOADING_STARTED });
    const resp = await supervise_rq(() => axios(API_PATHS.APPOINTMENTS));

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

  const values = {
    loading: state.loading,

    services: state.services,
    serviceDetails: state.serviceDetails,
    appointments: state.appointments,
    appointmentDetails: state.appointmentDetails,

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
  };

  return <dataContext.Provider value={values}>{children}</dataContext.Provider>;
};

export default DataContextProvider;
