import React from 'react';
import PostOption from './PostOption';
import Checkbox from './Checkbox';

// let selectedCheckboxes;
export default class Search extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			search: '',
			data: []
		};
	}

	componentWillMount(){
		this.selectedCheckboxes = new Set();
	}

	toggleCheckbox(label) {
		if(this.selectedCheckboxes.has(label)){
			this.selectedCheckboxes.delete(label);
		}else{
			this.selectedCheckboxes.add(label);
		}
	}

	handleFormSubmit(formSubmitEvent){
		formSubmitEvent.preventDefault();
		for(const checkbox of this.selectedCheckboxes){
			console.log('selected: ', checkbox);
		}
	}

	fetchData(query){
		let restUrl = 'https://lospleyers.com/wp-json/wp/v2/posts?search='+query+'&per_page=20';
		if(query.length >= 3){
			fetch(restUrl)
			.then(response=>response.json())
			.then(response=>{
				this.setState({
					data: response
				})
			});
		}

		// Comprobar Set con resultados de búsqueda y determinar existencia de publicaciones en 
		// el Set para quitar o dejar marcados los checkboxes
		
		// console.log(this.selectedCheckboxes);
		// console.log(this.state.data);
	}

	updateSearch(event){
		this.fetchData(event.target.value);
		this.setState({
			search: event.target.value
		});
	}

	render(){
		return(
			<div>
				<label htmlFor="searchId">Barra A</label>
				<input id="searchId" placeholder="Buscar publicaciones" type="text" value={this.state.search} onChange={this.updateSearch.bind(this)} />
				<form onSubmit={this.handleFormSubmit.bind(this)}>
					{
						this.state.data.map((post, i)=>{
							return(
								<Checkbox label={post.title.rendered} handleCheckboxChange={this.toggleCheckbox.bind(this)} key={'option_'+i} />
							);		
						})
					}
					<button className="btn btn-default" type="submit" >Save</button>
				</form>
			</div>	
		);
	}
}

