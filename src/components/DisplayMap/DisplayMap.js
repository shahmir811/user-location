import React, { useContext, useEffect } from 'react';
import { Button, Spinner } from 'react-bootstrap';

import './DisplayMap.css';
import BuildingContext from '../../context/building/buildingContext';

const DisplayMap = () => {
	const buildingContext = useContext(BuildingContext);
	const { selectedBuilding, loading } = buildingContext;

	useEffect(() => {
		if (selectedBuilding && !loading) {
			renderMap();
		}
	}, [selectedBuilding]);

	if (loading) {
		return (
			<Spinner animation="border" role="status">
				<span className="sr-only">Loading...</span>
			</Spinner>
		);
	}

	if (!selectedBuilding) {
		return null;
	}

	const renderMap = () => {
		let key = process.env.GOOGLE_MAP_API;
		let url = `https://maps.googleapis.com/maps/api/js?key=${key}&callback=initMap&libraries=&v=weekly`;
		loadScript(url);
		window.initMap = initMap;
	};

	const initMap = () => {
		let LatLng = {
			lat: selectedBuilding.position[0],
			lng: selectedBuilding.position[1],
		};
		let markerTitle = `${selectedBuilding.buildingName} is located in ${selectedBuilding.name}`;

		let map = new window.google.maps.Map(document.getElementById('map'), {
			center: LatLng,
			zoom: 5,
		});

		let marker = new window.google.maps.Marker({
			position: LatLng,
			map: map,
			title: markerTitle,
		});
	};

	return (
		<main className="displayMap-component-wrapping-div">
			<div id="map"></div>
		</main>
	);
};

const loadScript = (url) => {
	var index = window.document.getElementsByTagName('script')[0];
	var script = window.document.createElement('script');
	script.src = url;
	script.async = true;
	script.defer = true;
	index.parentNode.insertBefore(script, index);
};

export default DisplayMap;
