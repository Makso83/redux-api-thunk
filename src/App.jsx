import React from 'react';
import { Redirect } from 'react-router-dom';
import './App.css';
// import ServiceAddClassBased from './components/ServiceAddClassBased';
// import ServiceListClassBased from './components/ServiceListClassBased';

function App() {
  return (
    <Redirect to="/services" />
  );
}

export default App;
