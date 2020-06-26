import React from 'react';
import ServiceAdd from './ServiceAdd';
import ServiceList from './ServiceList';

function Services() {
  return (
    <>
      <h1>Прайс-лист</h1>
      <hr />
      <h2>Добавление новой услуги в прайс лист</h2>
      <ServiceAdd />
      <h2>Актуальный прайс-лист</h2>
      <ServiceList />
    </>
  );
}

export default Services;
