import React from 'react';

export default class Search extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			search: ''
		};
	}

	updateSearch(event){
		this.setState({
			search: event.target.value.substr(0, 20)
		});
	}

	render(){
		let filteredContacts = this.props.contacts;
		let contact = filteredContacts.map( (contact, i)=>{
			return(
				<li key={contact.id}>{contact.name} | {contact.phone}</li>
			);
		});

		return(
			<div>
				<ul>
					{contact}
				</ul>
				<input type="text" value={this.state.search} onChange={this.updateSearch.bind(this)} />
			</div>	
		);
	}
}