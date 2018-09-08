import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import "src/styles/RegisterPage.scss";
import { Input, Button } from "src/components";
import { registerUser, deleteErrors } from "../store/actions";

class RegisterPage extends Component {
	
	static propTypes = {
		registerUser: PropTypes.func.isRequired,
		deleteErrors: PropTypes.func.isRequired,
		registerError: PropTypes.object
	};
	
	componentDidMount() {
		this.props.deleteErrors();
	}
	
	state = {
		username: "",
		password: ""
	};
	
	inputChangeHandler = event => {
		const {name, value} = event.target;
		this.setState({[name]: value});
	};
	
	submitFormHandler = event => {
		event.preventDefault();
		this.props.registerUser(this.state);
	};
	
	render() {
		const {registerError} = this.props;
		let username = "";
		let password = "";
		if (registerError && registerError.errors) {
			username = registerError.errors.username ? registerError.errors.username.message || null : null;
			password = registerError.errors.password ? registerError.errors.password.message || null : null;
		}
		
		return (
			<div className="register-page">
				<h1>Register</h1>
				<div className="register-page_form">
					<form onSubmit={this.submitFormHandler}>
						<div className="row">
							<Input
								value={this.state.username}
								onChange={this.inputChangeHandler}
								name="username"
								type="text"
								labelText="Username"
								error={username}
							/>
						</div>
						<div className="row">
							<Input
								value={this.state.password}
								onChange={this.inputChangeHandler}
								name="password"
								type="password"
								labelText="Password"
								error={password}
							/>
						</div>
						<div className="row">
							<Button>Sign Up</Button>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	registerError: state.errors.registerError,
});

const mapDispatchToProps = dispatch => {
	return bindActionCreators({
		registerUser,
		deleteErrors,
	},
	dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
