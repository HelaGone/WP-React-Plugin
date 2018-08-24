import React from 'react';
import PropTypes from 'prop-types';

export default class Notice extends React.Component{

	componentDidMount(){
		if(this.props.duration > 0){
			this.dismissTimeout = window.setTimeout(this.props.onDismissClick, this.props.duration);
		}
	}

	componentWillUnmount(){
		if(this.dismissTimeout){
			window.clearTimeout(this.dismissTimeout);
		}
	}

	render(){
		let dismiss;
		if(this.props.showDismiss){
			dismiss = (
				<span tabIndex="0" className="notice_dismiss" onClick={this.props.onDismissClick}>
					<span className="dashicons dashicons-dismiss"></span>
					<span className="screen-reader-text">Dismiss</span>
				</span>
			);
		}
		return(
			<div className={ `notice is-dismissible notice-${this.props.notice.type}` }>
				<p><strong>{this.props.notice.message}</strong></p>
				{dismiss}
			</div>
		);
	}
}

Notice.defaultProps = {
	duration: 4000,
	showDismiss: true,
	onDismissClick: null
};

Notice.propTypes = {
	duration: PropTypes.number,
	showDismiss: PropTypes.bool,
	onDismissClick: PropTypes.func,
	notice: PropTypes.oneOfType([
		PropTypes.bool,
		PropTypes.shape({
			type:PropTypes.string,
			message: PropTypes.string
		})
	])
};