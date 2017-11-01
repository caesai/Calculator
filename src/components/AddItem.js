import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  goods: state.reducer.goods,
  basket: state.reducer.basket,
  discount: state.reducer.discount,
  total: state.reducer.total
});

const actions = {
  addToBasket: (basket) => ({
    type: 'ADD_TO_BASKET',
    basket
  }),
  countDiscount: (discount) => ({
    type: 'COUNT_DISCOUNT',
    discount
  })
}

let itemId = 0;

class AddItem extends React.Component{
  render() {
    return(
      <form onSubmit={(e)=>{
        e.preventDefault();
        let nameValue = this.refs.item.value;
        let priceValue = this.refs.price.value;
        let discount = priceValue - priceValue*0.01;
        let discountValue = this.props.discount + (priceValue - discount.toFixed(0));
        itemId++;
        let item = {
          id: itemId,
          name: nameValue,
          price: priceValue,
          discount: discount.toFixed(0)
        }
        if ((nameValue !== '')&&(priceValue !=='')&&(this.props.total == 0)){
          this.props.dispatch(actions.addToBasket(item));
          this.props.dispatch(actions.countDiscount(discountValue));
        }
      }}>
        <div className='inputs'>
          <p>Продукт</p>
          <input type='text' disabled={this.props.total>0?true: null} ref='item'/>
        </div>
        <div className='inputs'>
          <p>Цена</p>
          <p><input type='text' ref='price' disabled={this.props.total>0?true: null} onKeyPress={(e)=>{
            if (isNaN(e.key)) {
              e.preventDefault();
            }
            if (e.key == 'Enter') {
              this.refs.button.click();
            }
          }}/></p>
        </div>
        <button ref='button' className={this.props.total>0? 'inactive': ''} type='submit'>Добавить</button>
      </form>
    )
  }
}

AddItem = connect(mapStateToProps)(AddItem);

export default AddItem;
