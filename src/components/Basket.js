import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  basket: state.reducer.basket,
  discount: state.reducer.discount
});

const actions = {
  removeItem: (item) => ({
    type: 'REMOVE_FROM_BASKET',
    item
  }),
  countDiscount: (discount) => ({
    type: 'COUNT_DISCOUNT',
    discount
  })
}

class Basket extends React.Component{

  render() {
    return(
      <div>
        <h2>Корзина</h2>
        <table cellPadding='0' cellSpacing='0'>
          <thead>
            <tr>
              <th>Продукт</th>
              <th>Цена</th>
              <th>Цена со скидкой</th>
            </tr>
          </thead>
          <tbody>
            {this.props.basket ? this.props.basket.map((item, key) => {
              return <tr key={key} onClick={()=>{
                let discount = this.props.discount - (item.price - item.discount);

                this.props.dispatch(actions.removeItem(key));
                this.props.dispatch(actions.countDiscount(discount));
              }}>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.discount}</td>
              </tr>
            }): null}

          </tbody>
        </table>
      </div>
    )
  }
}

Basket = connect(mapStateToProps)(Basket);

export default Basket;
