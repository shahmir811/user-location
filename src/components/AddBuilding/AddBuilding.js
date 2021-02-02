import React, { useContext, useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

import './AddBuilding.css';
import countries from '../../dummyData/countries.json';
import BuildingContext from '../../context/building/buildingContext';
import ClientContext from '../../context/client/clientContext';

const AddBuilding = () => {
	const clientContext = useContext(ClientContext);
	const { selectedClient } = clientContext;

	const buildingContext = useContext(BuildingContext);
	const { errors, addNewBuildingFn } = buildingContext;

	const [name, setName] = useState('');
	const [country, setCountry] = useState('');

	useEffect(() => {
		return () => {
			setName('');
			setCountry('');
		};
	}, []);

	const onChangeHandler = (e) => {
		let id = e.target.value;
		const getCountry = countries.find((country) => country.id === id);
		setCountry(getCountry);
	};

	const onSubmitHandler = async (e) => {
		e.preventDefault();
		try {
			let data = {
				client: selectedClient,
				building: {
					name,
					country,
				},
			};
			await addNewBuildingFn(data);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="add-building-wrapper-div">
			<h2 className="add-building-component-topHeader">Add Building</h2>
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
					<Form.Control
						as="select"
						defaultValue={country}
						onChange={(e) => onChangeHandler(e)}
						isInvalid={!!errors.country}
					>
						<option value="" disabled>
							Select Country
						</option>
						{countries.map((country) => (
							<option value={country.id} key={country.id}>
								{country.name}
							</option>
						))}
					</Form.Control>
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

export default AddBuilding;
