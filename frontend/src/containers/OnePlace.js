import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchPlaceById } from "../store/actions";

class OnePlace extends Component {
	
	componentDidMount() {
		if (this.props.match.params.id) {
			this.props.fetchPlaceById(this.props.match.params.id);
		}
	}
	
	render() {
		console.log(this.props.place);
		return (
			<div>
				здфсу
			</div>
		);
	}
}

const mapStateToProps = state => ({
	place: state.places.currentPlace,
});

const mapDispatchToProps = dispatch => {
	return bindActionCreators({
		fetchPlaceById
	},
	dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(OnePlace);
