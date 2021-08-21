import axios from "axios";
import React, { createContext, useContext, useReducer } from "react";
import {
  API_PATHS,
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
        serviceDetails: action.payload,
      };
    case SERVICES_GET:
      return {
        ...state,
        services: action.payload,
      };
    case SERVICES_GET_DETAILS:
      return {
        ...state,
        serviceDetails: action.payload,
      };
    case SERVICES_DROP_DETAILS:
      return {
        ...state,
        serviceDetails: {},
      };

    default:
      return state;
  }
};

const DataContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  // featch list of services from API
  async function getServices() {
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
    const resp = await supervise_rq(() =>
      axios.put(`${API_PATHS.SERVICES}/${id}`, body)
    );

    if (resp.status === STATUS.SUCCESS) {
      dispatch({
        type: SERVICES_GET_DETAILS,
        payload: resp.data,
      });
    }

    console.log(resp);
  }

  // delete service
  async function deleteService(id) {
    const resp = await supervise_rq(() =>
      axios.delete(`${API_PATHS.SERVICES}/${id}`)
    );

    console.log(resp);
  }

  const values = {
    getServices,
    getServiceDetails,
    dropServiceDetails,
    createService,
    editService,
    deleteService,
    services: state.services,
    serviceDetails: state.serviceDetails,
  };

  return <dataContext.Provider value={values}>{children}</dataContext.Provider>;
};

export default DataContextProvider;
