import React from 'react';
import PostOption from './PostOption';
import Checkbox from './Checkbox';


let selectedCheckboxes = new Set();
export default class Search extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			search: '',
			data: []
		};
	}

	// componentWillMount(){
	// 	this.selectedCheckboxes = new Set();
	// }

	toggleCheckbox(label) {
		if(selectedCheckboxes.has(label)){
			selectedCheckboxes.delete(label);
		}else{
			selectedCheckboxes.add(label);
		}
	}

	handleFormSubmit(formSubmitEvent){
		formSubmitEvent.preventDefault();

		for(const checkbox of selectedCheckboxes){
			console.log('selected: ', checkbox);
		}
	}

	fetchData(query){
		let restUrl = 'https://lospleyers.com/wp-json/wp/v2/posts?search='+query+'&per_page=20';
		if(query.length > 2){
			fetch(restUrl)
			.then(response=>response.json())
			.then(response=>{
				this.setState({
					data: response
				})
			});
		}
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
				<label>Barra A</label>
				<input placeholder="Buscar publicaciones" type="text" value={this.state.search} onChange={this.updateSearch.bind(this)} />
				<form onSubmit={this.handleFormSubmit}>
					{
						this.state.data.map((post, i)=>{
							return(
									<Checkbox label={post.title.rendered} handleCheckboxChange={this.toggleCheckbox} key={'option_'+i} />
							);		
						})
					}
					<button className="btn btn-default" type="submit" >Save</button>
				</form>
			</div>	
		);
	}
}