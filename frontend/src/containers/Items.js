import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as WorkspaceListActions from "../store/actions/items";
import "src/styles/Items.scss";

class Items extends Component {
	render() {
		return (
			<div>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad adipisci, asperiores consequatur dicta excepturi explicabo laborum
				maiores natus nobis non nostrum obcaecati optio quod soluta unde vel voluptatem! Placeat, sed.
			</div>
		);
	}
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({actions: bindActionCreators(WorkspaceListActions, dispatch)});

export default connect(mapStateToProps, mapDispatchToProps)(Items);