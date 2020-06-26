import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import Loader from 'react-loader-spinner';
import { NavLink } from 'react-router-dom';
import { deleteService } from '../actions/actionCreators';

function ServiceItem({ item }) {
  const dispatch = useDispatch();
  const [isFetching, setIsFetching] = useState(false);

  const {
    id, name, price,
  } = item;

  const handleRemove = (itemId) => {
    dispatch(deleteService(itemId, setIsFetching));
  };

  return (

    <li className="ServiceItem__li styled-block">
      <div className="ServiceItem__li_element">{name}</div>
      <div className="ServiceItem__li_element">
        {price}
        {' '}
        Ꝑ
      </div>

      <div className="ServiceItem__li_element_button-block">
        {isFetching
          ? <Loader type="ThreeDots" color="ffffff" height={20} width={20} />
          : (
            <div>
              <NavLink
                className="button button-primary icon-btn"
                to={`/services/${id}`}
              >
                <span className="material-icons">
                  create
                </span>
              </NavLink>
              <button
                type="button"
                className="button button-delete icon-btn"
                onClick={() => handleRemove(id)}
              >
                <span className="material-icons">
                  delete_outline
                </span>
              </button>
            </div>
          )}
      </div>

    </li>

  );
}

export default ServiceItem;

ServiceItem.propTypes = {
  item: PropTypes.exact({
    id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
};
