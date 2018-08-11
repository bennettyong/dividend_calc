import React from 'react';
import Autosuggest from 'react-autosuggest';
import {languages} from '../list/NYSE'
import StockCard from './StockCard'
import { Button, Form, Grid } from 'semantic-ui-react'

// Imagine you have a list of languages that you'd like to autosuggest.
/* const languages = [
  {
    name: 'Apple'
  },
  {
    name: 'Banana'
  },
  {
    name: 'Cherry'
  },
  {
    name: 'Grapefruit'
  },
  {
    name: 'Lemon'
  }

]; */


languages.sort(function(a,b) {return (a.Symbol > b.Symbol) ? 1 : ((b.Symbol > a.Symbol) ? -1 : 0);} );

// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0 ? [] : languages.filter(lang =>
    lang.name.toLowerCase().slice(0, inputLength) === inputValue
  );
};

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.Symbol;

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
  <div>
    {suggestion.name}
  </div>
);

class Suggestion extends React.Component {
  constructor() {
    super();

    this.state = {
      value: '',
      stocks: [],
      suggestions: []
    };    

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e){
    e.preventDefault();
    if (this.state.value == "") {
      return null
    }

    let term = this.state.value.toUpperCase()
    //const key = "G412PZKNR09GEDK4"
    /* const url = `https://www.alphavantage.co/query?function=BATCH_STOCK_QUOTES&symbols=${term}&apikey=${key}`; */
    const url = `https://api.iextrading.com/1.0/stock/${term}/quote`;
    fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log(data)
      let stock = {
          name: data["companyName"],
          symbol: data["symbol"],
          market : data["primaryExchange"],
          price: data["latestPrice"],
          volume: data["latestVolume"],
          time: data["latestTime"]
        }
      this.setState((prevState) => ({
        stocks: [...prevState.stocks, stock]
      }))
      console.log(this.state.stocks)
    })
    .catch(err => 
      this.setState({
        value: "Invalid Symbol"
      })
    )
  }

  onChange = (event, { newValue, method }) => {
    this.setState({
      value: newValue
    });
  };
  
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: "Enter Company Name",
      value,
      onChange: this.onChange
    };

    return (
      <div style={{
        'text-align':'center'
        }}>
      <Autosuggest 
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps} />
      <Button onClick = {this.handleClick}>Search</Button>
      <Grid columns={3} divided style={{
            'margin-top': '2rem',
            'margin-left': '5rem'
            }}>
            {this.state.stocks.map(stock => 
                <StockCard key={stock.name} stocks = {stock}/>
              )}  
          </Grid>
       
      </div>
    );
  }
}

export default Suggestion