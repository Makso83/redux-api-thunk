import {
  EDIT_MODE_GET_REQUEST, 
  EDIT_MODE_GET_SUCCESS, 
  EDIT_MODE_GET_FAILURE, 
  EDIT_MODE_CHANGE_FIELD, 
  EDIT_MODE_SUBMIT_REQUEST, 
  EDIT_MODE_SUBMIT_SUCCESS,
  EDIT_MODE_SUBMIT_FAILURE,
  EDIT_MODE_REDIRECT,
} from '../actions/actionTypes';

const initialState = {
  id: 0,
  name: '',
  price: '',
  content: '',
  loading: false,
  error: null,
  saving: false,
  redirect: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case EDIT_MODE_GET_REQUEST: {
      return { ...state, loading: true };
    }

    case EDIT_MODE_GET_SUCCESS: {
      const {
        id, content, name, price,
      } = action.payload;
      return {
        ...state, id, name, price, content, loading: false,
      };
    }

    case EDIT_MODE_GET_FAILURE: {
      const { error } = action.payload;
      return { ...state, error, loading: false };
    }

    case EDIT_MODE_CHANGE_FIELD: {
      const { name, value } = action.payload;
      return { ...state, [name]: value };
    }

    case EDIT_MODE_SUBMIT_REQUEST: {
      return { ...state, saving: true };
    }

    case EDIT_MODE_SUBMIT_SUCCESS: {
      return { ...initialState, redirect: true };
    }

    case EDIT_MODE_SUBMIT_FAILURE: {
      const { error } = action.payload;
      return { ...state, error, saving: false };
    }

    case EDIT_MODE_REDIRECT: {
      return {...initialState}
    }

    default: {
      return state;
    }
  }
};
