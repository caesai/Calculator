import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

const reducerState = {
  goods: [],
  item: {},
  basket: [],
  discount: 0
}

export function reducer (state = reducerState, action) {
  switch (action.type) {
    case 'GET_GOODS_LIST':
      return Object.assign({}, state, {
        goods: action.list
      })
    case 'CHOOSE_ITEM':
      return Object.assign({}, state, {
        item: action.item
      })
    case 'ADD_TO_BASKET':
      return Object.assign({}, state, {
        basket: state.basket.concat(action.basket)
      })
    case 'REMOVE_FROM_BASKET':
      return Object.assign({}, state, {
        basket: [...state.basket.slice(0, action.item), ...state.basket.slice(action.item + 1)]
      })
    case 'COUNT_DISCOUNT':
      return Object.assign({}, state, {
        discount: action.discount
      })
    default:
      return Object.assign({}, state, {
        goods: []
      })
  }
}

const rootReducer = combineReducers({reducer});

export default function configureStore(initialState) {
  let middleware = applyMiddleware(thunkMiddleware);
  let createStoreWithMiddleware = compose(middleware,(typeof window !== 'undefined') && window.devToolsExtension ? window.devToolsExtension() : f => f)(createStore);

  const store = createStoreWithMiddleware(rootReducer, initialState);

  return store;
}
