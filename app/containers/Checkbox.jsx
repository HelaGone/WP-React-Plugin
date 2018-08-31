import React from 'react';
import PropTypes from 'prop-types';

export default class Checkbox extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			isChecked: false,
		}
	}

	toggleCheckboxChange = () => {
		const {handleCheckboxChange, label} = this.props;

		this.setState(({isChecked}) => ({
			isChecked: !isChecked,
		}));

		handleCheckboxChange(label);
	}

	render(){
		return(
			<div className="checkbox">
				<label>
					<input type="checkbox" value={this.props.label} checked={this.state.isChecked} onChange={this.toggleCheckboxChange} />
					{this.props.label}
				</label>
			</div>
		);
	}
}

Checkbox.propTypes = {
	label: PropTypes.string.isRequired,
	handleCheckboxChange: PropTypes.func.isRequired
}