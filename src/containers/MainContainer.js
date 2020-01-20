import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {
  state = {
    allStocks: [],
    portStocks: [],
    sort: '',
    filter: 'None'
  }

  componentDidMount() {
    fetch(`http://localhost:3000/stocks`)
    .then(resp => resp.json())
    .then(data => {
      this.setState({allStocks: data})
    })
  }

  stockClick = (stock) => {
    if (this.state.portStocks.find((portstock) => portstock.name === stock.name)) {
      this.setState({portStocks: this.state.portStocks.filter(portstock => portstock.name !== stock.name)})
    } else {
      this.setState({portStocks: [...this.state.portStocks, stock]})
    }
  }

  buyStock = (stock) => {
    if (this.state.portStocks.find((portstock) => portstock.name === stock.name)) {
    } else {
      this.setState({portStocks: [...this.state.portStocks, stock]})
    }
  }

  sellStock = (stock) => {
    this.setState({portStocks: this.state.portStocks.filter(portstock => portstock.name !== stock.name)})
  }

  filterChange = (e) => {
    this.setState({filter: e.target.value})
  }

  sortChange = (e) => {
    this.setState({sort: e.target.value})
  }

  render() {
    let displayStocks = [...this.state.allStocks]
    if (this.state.filter !== 'None') {
      displayStocks = displayStocks.filter((stock) => stock.type === this.state.filter)
    }
    if (this.state.sort === 'Alphabetically') {
      displayStocks = displayStocks.sort((sOne, sTwo) => (sOne.ticker > sTwo.ticker) ? 1 : -1)
    }
    if (this.state.sort === 'Price') {
      displayStocks = displayStocks.sort((sOne, sTwo) => (sOne.price > sTwo.price) ? 1 : -1)
    }
    return (
      <div>
        <SearchBar
          filterChange={this.filterChange}
          sort={this.state.sort}
          sortChange={this.sortChange}
        />

          <div className="row">
            <div className="col-8">

              <StockContainer
                displayStocks={displayStocks}
                buyStock={this.buyStock}
              />

            </div>
            <div className="col-4">

              <PortfolioContainer
                portStocks={this.state.portStocks}
                sellStock={this.sellStock}
              />

            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
