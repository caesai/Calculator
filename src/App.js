import React from 'react';
import ReactDOM from 'react-dom';
import { connect, Provider } from 'react-redux';

import configureStore from './store';

let store = configureStore({});

import AddItem from './components/AddItem';
import Basket from './components/Basket';
import Discounter from './components/Discounter';

export default class App extends React.Component{
  render() {
    return(
      <Provider store={store}>
        <div>
          <AddItem />
          <Basket />
          <Discounter />
        </div>
      </Provider>
    )
  }
}

ReactDOM.render(
  <App  />,
  document.getElementById('app')
);
