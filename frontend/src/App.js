import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";
import * as UserListActions from "src/store/actions/users";
import Routes from "./routes";
import { Footer, Header } from "src/components";

class App extends Component {
	static propTypes = {
		user: PropTypes.object,
		actions: PropTypes.shape({
			logoutUser: PropTypes.func.isRequired,
		}).isRequired,
	};
	
	render() {
		const {actions: {logoutUser}} = this.props;
		return (
			<Fragment>
				<NotificationContainer/>
				<Header logout={logoutUser} user={this.props.user}/>
				<div className="container">
					<Routes user={this.props.user}/>
				</div>
				<Footer/>
			</Fragment>
		);
	}
}

const mapStateToProps = state => ({
	user: state.user.user,
});

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(UserListActions, dispatch)
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));