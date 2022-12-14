import './App.css';
import { React, useEffect, useState } from 'react';
import Error404 from './components/Error404';
import SearchForm from './components/SearchForm';
import Navigation from './components/Navigation';
import PhotoList from './components/PhotoList';
import apiKey from './config';
import axios from 'axios';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const App = () => {
	const [photos, setPhotos] = useState([]);
	const [flowers, setFlowers] = useState([]);
	const [waterfalls, setWaterfalls] = useState([]);
	const [rainbows, setRainbows] = useState([]);
	const [loading, setLoading] = useState(true);
	const [query, setQuery] = useState('ocean');

	const performSearch = (query) => {
		const flickrUrl = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`;

		axios
			.get(flickrUrl)
			.then((response) => {
				setPhotos(response.data.photos.photo);
				setQuery(query);
				setLoading(false);
				if (query === 'flowers') {
					setFlowers(response.data.photos.photo);
					setQuery(query);
					setLoading(false);
				}
				if (query === 'rainbows') {
					setRainbows(response.data.photos.photo);
					setQuery(query);
					setLoading(false);
				}
				if (query === 'waterfalls') {
					setWaterfalls(response.data.photos.photo);
					setQuery(query);
					setLoading(false);
				}
			})
			.catch((error) => {
				console.log('Error fetching and parsing data', error);
			});
	};

	useEffect(() => {
		performSearch('flowers');
		performSearch('rainbows');
		performSearch('waterfalls');
		performSearch(query);
	}, []);

	// console.log(photos)
	return (
		<div>
			<BrowserRouter>
				<h1>React Gallery</h1>
				<SearchForm onSearch={performSearch} />
				<Navigation />
				{loading ? (
					<p>Loading...</p>
				) : (
					<Routes>
						<Route
							exact
							path="/"
							element={
								<PhotoList
									data={photos}
									performSearch={performSearch}
								/>
							}
						/>
						<Route
							path="/flowers"
							element={<PhotoList data={flowers} />}
						/>
						<Route
							path="/waterfalls"
							element={<PhotoList data={waterfalls} />}
						/>
						<Route
							path="/rainbows"
							element={<PhotoList data={rainbows} />}
						/>
						<Route
							path="/:search"
							exact
							element={
								<PhotoList
									data={photos}
									performSearch={performSearch}
								/>
							}
						/>
						<Route path="*" element={<Error404 />} />
					</Routes>
				)}
			</BrowserRouter>
		</div>
	);
};

export default App;
