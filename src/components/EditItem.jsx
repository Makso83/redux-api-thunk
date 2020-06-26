import React, { useEffect } from 'react';
import Loader from 'react-loader-spinner';
import { NavLink, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getServiceById, editModeFieldChanged, postServiceDetails, 
} from '../actions/actionCreators';
import ErrorMessage from './ErrorMessage';

function EditItem({ match }) {
  const dispatch = useDispatch();
  const {
    name, price, content, loading, error, id, saving, redirect,
  } = useSelector((state) => state.editMode);

  useEffect(() => {
    dispatch(getServiceById(match.params.servId));
  }, [match.params.servId, dispatch]);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    dispatch(editModeFieldChanged(name, value));
  };

  const handleSubmit = () => {
    dispatch(postServiceDetails({
      id, name, price, content,
    }));
  };

  const onSaving = () => {
    if (saving) {
      return (
        <div className="centered">
          <Loader type="TailSpin" color="#000000" height={25} width={25} />
        </div>
      );
    }
    return (
      <div>
        <NavLink to="/" className="button button-primary">Отмена</NavLink>
        <button
          onClick={handleSubmit}
          type="button"
          className="button button-primary"
        >
          Сохранить
        </button>
      </div>

    );
  };

  if (loading) {
    return (
      <div className="centered">
        <Loader type="TailSpin" color="#000000" height={50} width={50} />
      </div>
    );
  }

  if (error) {
    return (
      <ErrorMessage>
        Возникла ошибка (
        {error}
        ). Перезагрузите страницу или попробуйте позднее..
      </ErrorMessage>
    );
  }

  return (
    <>
      <h1>Редактирование услуги</h1>
      <hr />
      <form className="EditItem__form">
        <label htmlFor="service">
          Название
        </label>
        <input
          className="EditItem__form_input styled-block"
          type="textarea"
          name="service"
          value={name}
          onChange={handleChange}
        />

        <label htmlFor="price">
          Стоимость
        </label>
        <input
          className="EditItem__form_input styled-block"
          type="textarea"
          name="price"
          value={price}
          onChange={handleChange}
        />

        <label htmlFor="content">
          Описание
        </label>
        <input
          className="EditItem__form_input styled-block"
          type="textarea"
          name="content"
          value={content}
          onChange={handleChange}
        />
        {onSaving()}
      </form>
      {redirect && <Redirect to="/" />}
    </>
  );
}

export default EditItem;
