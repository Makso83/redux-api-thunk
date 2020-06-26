import {
  CHANGE_SERVICE_FIELD,
  FETCH_SERVICES_REQUEST,
  FETCH_SERVICES_FAILURE,
  FETCH_SERVICES_SUCCESS,
  ADD_SERVICE_REQUEST,
  ADD_SERVICE_FAILURE,
  ADD_SERVICE_SUCCESS,
  REMOVE_SERVICE,
  EDIT_MODE_GET_REQUEST,
  EDIT_MODE_GET_FAILURE,
  EDIT_MODE_GET_SUCCESS,
  EDIT_MODE_CHANGE_FIELD,
  EDIT_MODE_SUBMIT_REQUEST,
  EDIT_MODE_SUBMIT_SUCCESS,
  EDIT_MODE_SUBMIT_FAILURE,
  EDIT_MODE_REDIRECT,
} from './actionTypes';

export const fetchServicesRequest = () => ({
  type: FETCH_SERVICES_REQUEST,
});

export const fetchServicesFailure = (error) => ({
  type: FETCH_SERVICES_FAILURE,
  payload: {
    error,
  },
});

export const fetchServicesSuccess = (items) => ({
  type: FETCH_SERVICES_SUCCESS,
  payload: {
    items,
  },
});

export const addServiceRequest = (name, price) => ({
  type: ADD_SERVICE_REQUEST,
  payload: {
    name,
    price,
  },
});

export const addServiceFailure = (error) => ({
  type: ADD_SERVICE_FAILURE,
  payload: {
    error,
  },
});

export const addServiceSuccess = () => ({
  type: ADD_SERVICE_SUCCESS,
});

export const changeServiceField = (name, value) => ({
  type: CHANGE_SERVICE_FIELD,
  payload: {
    name,
    value,
  },
});

export const removeService = (id) => ({
  type: REMOVE_SERVICE,
  payload: {
    id,
  },
});

export const getServiceDetails = () => ({
  type: EDIT_MODE_GET_REQUEST,
});

export const getServiceDetailsFailed = (error) => ({
  type: EDIT_MODE_GET_FAILURE,
  payload: { error },
});

export const getServiceDetailsSuccess = (data) => ({
  type: EDIT_MODE_GET_SUCCESS,
  payload: data,
});

export const editModeFieldChanged = (name, value) => ({
  type: EDIT_MODE_CHANGE_FIELD,
  payload: { name, value },
});

export const editModeSubmit = () => ({
  type: EDIT_MODE_SUBMIT_REQUEST,
});

export const editModeSubmitSuccess = () => ({
  type: EDIT_MODE_SUBMIT_SUCCESS,
});

export const editModeSubmitFailure = (error) => ({
  type: EDIT_MODE_SUBMIT_FAILURE,
  payload: error,
});

export const editModeReset = () => ({
  type: EDIT_MODE_REDIRECT,
});

export const fetchServices = () => async (dispatch) => {
  dispatch(fetchServicesRequest());
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}`);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    dispatch(fetchServicesSuccess(data));
  } catch (e) {
    dispatch(fetchServicesFailure(e.message));
  }
};

export const deleteService = (id, loadSetter) => async (dispatch) => {
  loadSetter(true);
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
  } catch (e) {
    dispatch(addServiceFailure(e.message));
  } finally {
    dispatch(removeService(id));
    loadSetter(false);
  }
};

export const addService = (name, price) => async (dispatch) => {
  dispatch(addServiceRequest());
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, price, id: 0 }),
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    dispatch(addServiceSuccess());
  } catch (e) {
    dispatch(addServiceFailure(e.message));
  }
  dispatch(fetchServices());
};

export const getServiceById = (id) => async (dispatch) => {
  dispatch(getServiceDetails());
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/${id}`);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    dispatch(getServiceDetailsSuccess(data));
  } catch (e) {
    dispatch(getServiceDetailsFailed(e.message));
  }
};

export const postServiceDetails = (data) => async (dispatch) => {
  dispatch(editModeSubmit());
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    dispatch(editModeSubmitSuccess());
  } catch (e) {
    dispatch(editModeSubmitFailure(e.message));
  }
};
