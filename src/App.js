import React, {Component} from 'react';
import axios from 'axios';
import parse from 'html-react-parser'
import { BrowserRouter, Route, Link } from "react-router-dom";

export default class App extends Component {
	
	constructor() {
		super();
		this.state = {
			dataMovies: []
		}
	}
	
	fetchData() {
		axios.get('http://api.tvmaze.com/search/shows?q=avengers')
		.then(res => {
			this.setState({
				dataMovies: res['data']
			});
			console.log(this.state.dataMovies);
		})
	}
	
	componentDidMount() {
		this.fetchData();
	}
	
	renderList = () => {
		return this.state.dataMovies.map(item => {
			return (
				<div className='col-lg-4 col-md-6 p-2'>

					<div className="card h-100 p-3">
						<img className="img-fluid rounded mx-auto" src={item['show']['image']['original']} alt={item['show']['name']}/>
						<div className="card-body text-center d-flex justify-content-between flex-column">
							<h3 className="card-title mb-2">{item['show']['name']}</h3>
							<h5 className="card-title mb-4">Rating: {item['show']['rating']['average']}</h5>
							<small className="card-text small text-justify">
								{parse(item['show']['summary'].slice(0,300))}
							</small>
							<h6>
								Genres: <p>{item['show']['genres'].join(', ')}</p>
							</h6>
							<a href={item['show']['url']} target="_blank" className="btn btn-primary text-white">Details</a>
						</div>
					</div>

				</div>
			)
		})
	};
	
	render() {
		return(
				<div className='container'>
					<div className='row'>
						{this.renderList()}
					</div>
				</div>
		)
	}

}
