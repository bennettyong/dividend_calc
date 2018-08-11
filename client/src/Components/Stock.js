import React from 'react';
//Styling Library
import { Button, Form } from 'semantic-ui-react'

class Stock extends React.Component{
	render(){
		return(
			<Form onSubmit = {this.props.onSubmit} 
				style={{
	              'text-align':'center'
              	}}>
				<Form.Field>
				<input
					placeholder = 'Enter Stock Symbol'  
					onChange={this.props.onChange}
					value = {this.props.value}
					style = {{
						'width':'auto'
						}}
					/>
				</Form.Field>
				<Button type='submit' disabled={!this.props.value}>Submit</Button>
			</Form>
		)
	}
}

export default Stock;