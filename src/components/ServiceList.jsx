import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Loader from 'react-loader-spinner';
import { fetchServices, editModeReset } from '../actions/actionCreators';
import ServiceItem from './ServiceItem';
import ErrorMessage from './ErrorMessage';

function ServiceList() {
  const { items, loading, error } = useSelector((state) => state.serviceList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchServices());
    dispatch(editModeReset());
  }, [dispatch]);

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
        Something went wrong. Please, try again later.
      </ErrorMessage>
    );
  }

  return (
    <ul className="ServiceList__ul">
      {items.map((o) => (
        <ServiceItem key={o.id} item={{ ...o, price: Number(o.price) }} />
      ))}
    </ul>
  );
}

export default ServiceList;
