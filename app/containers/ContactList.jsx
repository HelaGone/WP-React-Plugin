import React from 'react';
import Contact from './Contact';

export default class ContactList extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			search: '',
			contacts: props.contacts
		}
	}

	updateSearch(event){
		this.setState({
			search: event.target.value,
		})
	}

	addContact(event){
		event.preventDefault();
		let id = Math.floor((Math.random()*100) + 1);
		let name = this.refs.name.value;
		let phone = this.refs.phone.value;
		this.setState({
			contacts: this.state.contacts.concat({id, name, phone})
		});

		this.refs.name.value = '';
		this.refs.phone.value = '';

	}

	render(){
		let filteredContacts = this.state.contacts.filter(
			(contact) => {
				return contact.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
			}
		);
		return(
			<div>
				<input placeholder="Search" type="text" value={this.state.search} onChange={this.updateSearch.bind(this)} />

				<form onSubmit={this.addContact.bind(this)} >
					<input placeholder="name" type="text" ref="name" />
					<input placeholder="phone" type="text" ref="phone" />
					<button type="submit">Add Contact</button>
				</form>

				<ul>
					{filteredContacts.map((contact)=>{
						return(<Contact key={contact.id} contact={contact}/>);
					})}
				</ul>
			</div>
		);
	}
}