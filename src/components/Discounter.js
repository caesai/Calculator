import React from 'react';
import {connect} from 'react-redux';

const mapStateToProps = (state) => ({
  discount: state.reducer.discount
});

class Discounter extends React.Component{
  render() {
    return (
      <div>
        <p>Применить скидку {this.props.discount}</p>
        <button>Применить</button>
      </div>
    )
  }
}

Discounter = connect(mapStateToProps)(Discounter);

export default Discounter;
