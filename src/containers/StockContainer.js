import React, { Component } from 'react';
import Stock from '../components/Stock'

class StockContainer extends Component {
  
  render() {
    return (
      <div>
        <h2>Stocks</h2>
        {
            this.props.displayStocks.map((stock) => {
              return (
                <Stock
                  key={stock.id}
                  stock={stock}
                  buyStock={this.props.buyStock}
                />
              )
            })
        }
      </div>
    );
  }
}

export default StockContainer;
