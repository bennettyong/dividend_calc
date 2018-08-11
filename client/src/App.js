import React, { Component } from 'react';
import './App.css';
import Stock from './Components/Stock'
import StockCard from './Components/StockCard'
import Suggestion from './Components/Suggestion'
import { Grid } from 'semantic-ui-react'
import {SectionsContainer, Section} from 'react-fullpage';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      stocks: [],
      term: null,
      value: ''
      };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleChange(e) {
    console.log(e)
    this.setState({
      value: e.target.value
    });
    console.log(this.state)
  }

  handleSubmit(e){
    e.preventDefault();
    if (this.state.value == "") {
      return null
    }
    /* this.setState({
      value: '',
      term: this.state.value
    }); */
    console.log(this.state)

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


  render() {
    let options = {
      sectionClassName:     'section',
      anchors:              ['sectionOne'],
      scrollBar:            true,
      navigation:           true,
      verticalAlign:        false,
      sectionPaddingTop:    '50px',
      sectionPaddingBottom: '50px',
      arrowNavigation:      true
    };
    const style = {
      'font-size': '133px',
      'text-align': 'center',
    }
    return (
      <SectionsContainer {...options}>
        <Section color='#4286f4'>
          <h1 style={style}>
            tomi.
          </h1>
          <h2 style={{'text-align': 'center'}}>Dividend Calculator</h2>
          <h3 style={{'text-align': 'center'}}>Scroll down</h3>
        </Section>
        <Section>
          {/* <Stock
            onChange={this.handleChange}
            value = {this.state.value}  
            onSubmit={this.handleSubmit}
          /> */}
          <Suggestion />
          {/* <Grid columns={3} divided style={{
            'margin-top': '2rem',
            'margin-left': '5rem'
            }}>
            {this.state.stocks.map(stock => 
                <StockCard key={stock.name} stocks = {stock}/>
              )}  
          </Grid> */}
        </Section>
      </SectionsContainer>

    );
  }
}

export default App;
