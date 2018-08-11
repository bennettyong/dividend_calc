import { Button, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, AutoComplete } from 'antd';
import React from 'react';

class Register extends React.Component{
	constructor(props) {
    	super(props);
    	this.state = {
    		user : '',
    		email : ''
    	};

    	this.handleChange = this.handleChange.bind(this);
    	this.handleSubmit = this.handleSubmit.bind(this);
  	}

  	handleChange(e){
  		const name = e.target.name;

  		this.setState({
  			[name] : e.target.value
  		})
  	}

	handleSubmit(e){
		alert(this.state.user + "entered an email of " + this.state.email)
	}
	render(){
		return(
			<form onSubmit = {this.handleSubmit}>
				<label>Username:</label>
				<input type='text' name = 'user' value = {this.state.user} onChange ={this.handleChange}/><br/>
				<label>Email:</label>
				<input type='email' name = 'email' value = {this.state.email} onChange = {this.handleChange}/><br/>
				<label>Password:</label>
				<input type='password'/><br/>
				<label>Re-enter password:</label>
				<input type='password'/><br/>
				<label>Read and Agree to the TOC</label>
				<input type='checkbox'/><br/>
				<input type='submit' />
			</form>
		)
	}
}

export default Register;