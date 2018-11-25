import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    barGraph: [],
    results: [],
    rates: '',
    base: '',
  }
  componentDidMount() {
    this.fetchCurrencies();
  }

  fetchCurrencies = (base = 'USD') => {
    fetch(`https://api.exchangeratesapi.io/latest?symbols=USD,EUR,GBP,AUD&base=${base}`)
    .then(response => response.json())
    .then(data => {
      console.log("got data", data);
      const rateValues = Object.values(data.rates);
      const highestRate = Math.max(...rateValues);
      this.setState({
        rates: data.rates,
        highestRate: highestRate,
      });
    });
  }

  onSubmit = () => {
    this.fetchCurrencies();

  }

  updateBase = (ev) => {
    this.setState({
      base: ev.target.value,
    });
    this.fetchCurrencies(ev.target.value);
  }

  render() {
    return (
      <div className="App">
        <div className="">
          <ul className="bar-graph">
            {
              Object.keys(this.state.rates).map(key => (
                <li className="bar" key={key} style={{height: ((this.state.rates[key] / this.state.highestRate) * 100) + '%'}}>
                  {this.state.rates[key]}
                  <br></br>  
                  {key}
                </li>
              ))
  
            }
          </ul>
          <select onChange={this.updateBase} value={this.state.base}>
              <option value="USD">US Dollar</option>
              <option value="AUD">Australian Dollar</option>
              <option value="GBP">British Pound</option>
          </select>
        </div>
      </div>
    );
  }
}
export default App;
