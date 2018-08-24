import React from 'react';
import fetchWP from '../utils/fetchWP';

export default class HomeOptions extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			posts: [],
			savedSettings: []
		}

		this.fetchWP = new fetchWP({
			restURL: this.props.wpObject.api_url,
			restNonce: this.props.wpObject.api_nonce
		});

	}

	getSetting = () =>{
		this.fetchWP.get('admin')
		.then(
			(json)=>this.setState({
				savedSettings:json.value
			}),
			(err)=>console.log('error', err)
		)
	}

	componentDidMount(){
		let resturl = 'https://localhost/lospleyers/wp-json/wp/v2/posts?_embed&per_page=10&page=2';
		fetch(resturl)
		.then( response => response.json())
		.then( response=> {
			this.setState({
				posts: response
			})
		})
	}

	render(){
		let optionsList = this.state.posts.map( (post, i) => {
			return(
				<option key={'opcion_'+i}>{post.title.rendered}</option>
			);
		})

		const espacios_a = ['Espacio1', 'Espacio2', 'Espacio3', 'Espacio4'];
		const espacios_bc = ['Espacio1', 'Espacio2', 'Espacio3'];
		const espacios_a_List = espacios_a.map( (espacio, i) => <select key={'espacio_'+i} className="select-espacios">{optionsList}</select> );
		const espacios_bc_list = espacios_bc.map( (espacio, i) => <select key={'espacio_'+i} className="select-espacios">{optionsList}</select> );

		return(
			<div className="wrapper">
				<h1>Home Options</h1>
				<form onSubmit={this.handleSubmit}>
					<h2>Barra A</h2>
					{espacios_a_List}

					<h2>Barra B</h2>
					{espacios_bc_list}

					<h2>Barra C</h2>
					{espacios_bc_list}

					<input id="save" className="button button-primary" value="Guardar"/>
				</form>
			</div>	
		);
	}
}
