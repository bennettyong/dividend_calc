import React from 'react';
import { Card, Form, Button } from 'semantic-ui-react'

class StockCard extends React.Component{
	constructor(props){
	    super(props)
	    this.state = {
	      stocks: this.props.stocks.symbol,
	      dividend: null,
	      total:null,
	      value: null
	      };
	    this.handleChange = this.handleChange.bind(this);
	    this.handleSubmit = this.handleSubmit.bind(this);
  	}

  	handleChange(e) {
	    this.setState({
	      value: e.target.value
	    });
	    console.log(this.state.value)
	    e.preventDefault();
			if (this.state.value == "") {
			return null
		}
		/* this.setState({
			value: '',
			total: this.state.value
		}); */
		let term = this.state.stocks
		//const key = "G412PZKNR09GEDK4"
		//const url = `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol=${term}&apikey=${key}`;
		const url =`https://api.iextrading.com/1.0/stock/${term}/dividends/3m`
		fetch(url)
		.then(res => res.json())
		.then(data => {
		/* let stock = {
			name: data["Stock Quotes"][0]["1. symbol"],
			price: data["Stock Quotes"][0]["2. price"],
			volume: data["Stock Quotes"][0]["3. volume"],
			time: data["Stock Quotes"][0]["4. timestamp"]
		}
		this.setState((prevState) => ({
			stocks: [...prevState.stocks, stock]
		})) */
		console.log(data)
		let count = data[0];
		var sum = count.amount;
		var value = this.state.value
		var total = (this.state.value*sum).toFixed(2);
		this.setState({
			dividend: sum,
			total: total,
			stmt: "Dividend of "+ value +" shares paid $" + total +" in the last quarter"
		});
		})
		.catch(err => this.setState({
			stmt: "No Dividend for this Stock"
		}))
		

  	}

	handleSubmit(e){
		e.preventDefault();
			if (this.state.value == "") {
			return null
		}
		/* this.setState({
			value: '',
			total: this.state.value
		}); */
		let term = this.state.stocks
		//const key = "G412PZKNR09GEDK4"
		//const url = `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol=${term}&apikey=${key}`;
		const url =`https://api.iextrading.com/1.0/stock/${term}/dividends/3m`
		fetch(url)
		.then(res => res.json())
		.then(data => {
		/* let stock = {
			name: data["Stock Quotes"][0]["1. symbol"],
			price: data["Stock Quotes"][0]["2. price"],
			volume: data["Stock Quotes"][0]["3. volume"],
			time: data["Stock Quotes"][0]["4. timestamp"]
		}
		this.setState((prevState) => ({
			stocks: [...prevState.stocks, stock]
		})) */
		console.log(data)
		let count = data[0];
		var sum = count.amount;
		var value = this.state.value
		var total = this.state.value*sum;
		this.setState({
			dividend: sum,
			total: total,
			stmt: "Dividend of "+ value +" shares paid $" + total +" in the last quarter"
		});
		console.log(this.state)
		}
		)

	}

	

	render(){
		return(
			<div style={{
					'padding-bottom':'1rem'
					}}>
				<Card>
					<Card.Content header={this.props.stocks.name} />
					<Card.Content description ={"Price: $"+this.props.stocks.price} />
					<Card.Content extra>
						<div className='ui volume'>
							{/* {"Volume: "+this.props.stocks.volume} */}
							<Form onSubmit = {this.handleSubmit}>
								<Form.Field>
								<label>Dividend Calculator:</label>
								<input
									placeholder = 'Number of shares owned'
									type='number'
									onChange={this.handleChange}
									value = {this.state.value}
									/>
								</Form.Field>
							</Form>
							{this.state.stmt}
							<div>
								{this.props.stocks.market}
							</div>
						</div>
					</Card.Content>
					<Card.Content meta={"Time: "+ this.props.stocks.time}/>
				</Card>
       			{/* <label>Dividend Calculator:</label><br/>
       			<input 
       				type='number'
       				onChange={this.handleChange}
					value = {this.state.value}
				/><br/>
       			<button onClick = {this.handleSubmit}>Calculate</button><br/>
       			<span>Dividend of {this.state.value} shares paid ${this.state.total} in the last quarter</span> */}
       			</div>
		)
	}
}

export default StockCard;