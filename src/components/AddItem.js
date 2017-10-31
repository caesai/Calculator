import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  goods: state.reducer.goods,
  item: state.reducer.item,
  basket: state.reducer.basket,
  discount: state.reducer.discount
});

const actions = {
  chooseItem: (item) => ({
    type: 'CHOOSE_ITEM',
    item
  }),
  addToBasket: (basket) => ({
    type: 'ADD_TO_BASKET',
    basket
  }),
  countDiscount: (discount) => ({
    type: 'COUNT_DISCOUNT',
    discount
  })
}

class AddItem extends React.Component{
  render() {
    return(
      <div>
        <div>
          <p>Продукт</p>
          <ul onClick={(e) => {
              e.currentTarget.classList.toggle('active');
              e.target.classList.toggle('active');
          }}>
          {this.props.goods ?
            this.props.goods.map((item,key) => {
              return <li key={key} className={key == 0 ? 'active' : ''} onClick={(e) => {
                this.props.dispatch(actions.chooseItem(item));
              }}>{item.name}</li>
            }) : null}
            </ul>
        </div>
        <div>
          <p>Цена</p>
          <p><span>{this.props.item ? this.props.item.price : null}</span></p>
        </div>
        <button onClick={() => {
          let sendItem = this.props.item;
          let discount = this.props.discount + (sendItem.price - sendItem.discount);
          console.log(this.props.discount);
          this.props.dispatch(actions.addToBasket(sendItem));
          this.props.dispatch(actions.countDiscount(discount));
        }}>Добавить</button>
      </div>
    )
  }
}

AddItem = connect(mapStateToProps)(AddItem);

export default AddItem;
