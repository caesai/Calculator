import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

const reducerState = {
  goods: [],
  basket: [],
  discount: 0,
  total: 0
}

export function reducer (state = reducerState, action) {
  switch (action.type) {
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
    case 'APPLY_DISCOUNT':
      state.basket.map((item, key) => {
        if (item.id == action.basket.id) {
            state.basket[key] = action.basket;
        }
      })
      return Object.assign({}, ...state, {
        basket: state.basket
      })
    case 'TOTAL_COUNT':
      state.basket.map((item, key) => {
        state.total =+ item.price;
      })
      return Object.assign({}, ...state, {
        basket: state.basket,
        total: state.total
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
