import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import "src/styles/LoginPage.scss";
import { Input, Button } from "src/components";
import { loginUser } from "../store/actions";

class LoginPage extends Component {
	
	static propTypes = {
		loginUser: PropTypes.func.isRequired,
		loginError: PropTypes.object,
	};
	
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
		this.props.loginUser(this.state);
	};
	
	render() {
		const {loginError} = this.props;
		let username = "";
		let password = "";
		if (loginError && loginError.error) {
			username = loginError.error.username || null;
			password = loginError.error.password || null;
		}
		
		return (
			<div className="login-page">
				<h1>Login</h1>
				<div className="login-page_form">
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
							<Button>Sign In</Button>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	loginError: state.errors.loginError,
});

const mapDispatchToProps = dispatch => {
	return bindActionCreators({
		loginUser,
	},
	dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
