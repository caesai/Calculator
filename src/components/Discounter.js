import React from 'react';
import {connect} from 'react-redux';

const mapStateToProps = (state) => ({
  basket: state.reducer.basket,
  discount: state.reducer.discount,
  total: state.reducer.total
});

const actions = {
  applyDiscount: (basket) => ({
    type: 'APPLY_DISCOUNT',
    basket
  }),
  totalCount: () => ({
    type: 'TOTAL_COUNT'
  })
}

class Discounter extends React.Component{
  render() {
    return (
      <div>
        {this.props.total > 0 ?
          <div>
            <p>Скидка {this.props.discount} руб.</p>
            <p>Итого: {this.props.total} руб.</p>
          </div>
          :<p>Применить скидку {this.props.discount} руб.</p>
        }
        <button className={this.props.total > 0 ? 'inactive' : ''}
          onClick={(e)=>{
            let max = 0;
            let maxItem = {};
            this.props.basket.map((item, key) => {
              if (item.price > max) {
                max = item.price;
                maxItem = item;
              }
            });
            maxItem.price = maxItem.price - this.props.discount;
            this.props.dispatch(actions.applyDiscount(maxItem))
            this.props.dispatch(actions.totalCount());
          }}>Применить</button>
      </div>
    )
  }
}

Discounter = connect(mapStateToProps)(Discounter);

export default Discounter;
