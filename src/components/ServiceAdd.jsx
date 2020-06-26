import React from 'react';
import Loader from 'react-loader-spinner';
import { useSelector, useDispatch } from 'react-redux';
import { changeServiceField, addService } from '../actions/actionCreators';
import ErrorMessage from './ErrorMessage';

function ServiceAdd() {
  const { item, loading, error } = useSelector((state) => state.serviceAdd);
  const dispatch = useDispatch();

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    dispatch(changeServiceField(name, value));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(addService(item.name, item.price));
  };

  return (
    <form className="ServiceAdd__form styled-block" onSubmit={handleSubmit}>
      <input
        className="ServiceAdd__form_input"
        name="name"
        onChange={handleChange}
        value={item.name}
        placeholder="Наименование услуги..."
      />
      <input
        className="ServiceAdd__form_input"
        name="price"
        onChange={handleChange}
        value={item.price}
        placeholder="Стоимость услуги..."
      />
      <button
        type="submit"
        className="button button-primary"
        disabled={loading}
      >
        {loading
          ? <Loader type="ThreeDots" color="ffffff" height={20} width={20} />
          : <span className="material-icons">playlist_add</span>}
      </button>
      {error
      && (
      <ErrorMessage>
        Something went wrong. Please, try again later
      </ErrorMessage>
      )}
    </form>
  );
}

export default ServiceAdd;
