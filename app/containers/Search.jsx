import React from 'react';
import PostOption from './PostOption'

export default class Search extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			search: '',
			data: []
		};
	}

	fetchData(query){
		let restUrl = 'https://lospleyers.com/wp-json/wp/v2/posts?search='+query+'&per_page=20';
		fetch(restUrl)
		.then(response=>response.json())
		.then(response=>{
			this.setState({
				data: response
			})
		});
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
				<input type="text" value={this.state.search} onChange={this.updateSearch.bind(this)} />
				<ul>
				{
					this.state.data.map((post, i)=>{
						return(
							<PostOption key={'post_'+i} post={post} />
						);		
					})
				}
				</ul>
			</div>	
		);
	}
}