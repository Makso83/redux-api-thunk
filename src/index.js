import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './store';
import EditItem from './components/EditItem';
import Services from './components/Services';

ReactDOM.render(
  // eslint-disable-next-line react/jsx-filename-extension
  <BrowserRouter>
    <Provider store={store}>
      <Route exact path="/">
        <App />
      </Route>
      <Route path="/services" exact component={Services} />
      <Route path="/services/:servId" component={EditItem} />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root'),
);

serviceWorker.unregister();
