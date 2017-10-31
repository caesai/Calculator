import React from 'react';
import ReactDOM from 'react-dom';
import { connect, Provider } from 'react-redux';

import configureStore from './store';

let store = configureStore({});

import AddItem from './components/AddItem';
import Basket from './components/Basket';
import Discounter from './components/Discounter';

const goods = [
  {
    name: 'Телефон',
    price: 100,
    discount: 99
  },
  {
    name: 'Магнитофон',
    price: 200,
    discount: 198
  },
  {
    name: 'Миелофон',
    price: 400,
    discount: 396
  },
];

const actions = {
  getList: (list) => ({
    type: 'GET_GOODS_LIST',
    list
  })
}

export default class App extends React.Component{
  componentDidMount() {
    store.dispatch(actions.getList(goods));
  }
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
