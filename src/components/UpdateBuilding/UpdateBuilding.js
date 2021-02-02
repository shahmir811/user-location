import React, { useContext, useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

import './UpdateBuilding.css';
import countries from '../../dummyData/countries.json';
import BuildingContext from '../../context/building/buildingContext';
import ClientContext from '../../context/client/clientContext';

const UpdateBuilding = () => {
	const clientContext = useContext(ClientContext);
	const { selectedClient } = clientContext;

	const buildingContext = useContext(BuildingContext);
	const {
		errors,
		updateBuildingRecordFn,
		selectedBuilding,
		editBuildingRecordFn,
		showBuildingWindowFn,
	} = buildingContext;

	const { buildingName, id } = selectedBuilding;

	const [name, setName] = useState('');
	const [country, setCountry] = useState('');

	useEffect(() => {
		setName(buildingName);
		setCountry(id);

		return () => {
			setName('');
			setCountry('');
		};
	}, [id, buildingName]);

	const onChangeHandler = (e) => {
		let id = e.target.value;
		const getCountry = countries.find((country) => country.id === id);

		setCountry(getCountry);
	};

	const onSubmitHandler = async (e) => {
		e.preventDefault();
		try {
			let data = {
				clientId: selectedClient.id,
				buildingId: selectedBuilding.buildingId,
				building: {
					name,
					country,
				},
			};
			await updateBuildingRecordFn(data);
			editBuildingRecordFn(false);
			showBuildingWindowFn(false);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="update-building-wrapper-div">
			<h2 className="update-building-component-topHeader">Update Building</h2>
			<Form onSubmit={onSubmitHandler}>
				<Form.Group controlId="formBasicName">
					<Form.Label>Name</Form.Label>
					<Form.Control
						type="text"
						placeholder="Building name"
						value={name}
						onChange={(e) => setName(e.target.value)}
						isInvalid={!!errors.name}
					/>
					{!!errors.name && (
						<Form.Control.Feedback type="invalid">
							{errors.name}
						</Form.Control.Feedback>
					)}
				</Form.Group>

				<Form.Group controlId="formBasicCountrySelect">
					<Form.Label>Select Country</Form.Label>
					{country && (
						<Form.Control
							as="select"
							defaultValue={country}
							onChange={(e) => onChangeHandler(e)}
							isInvalid={!!errors.country}
						>
							{countries.map((country) => (
								<option value={country.id} key={country.id}>
									{country.name}
								</option>
							))}
						</Form.Control>
					)}
					{!!errors.country && (
						<Form.Control.Feedback type="invalid">
							{errors.country}
						</Form.Control.Feedback>
					)}
				</Form.Group>
				<Button variant="primary" type="submit">
					Submit
				</Button>
			</Form>
		</div>
	);
};

export default UpdateBuilding;
