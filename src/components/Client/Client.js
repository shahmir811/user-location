import React, { useContext, useEffect } from 'react';
import { Form } from 'react-bootstrap';

import './Client.css';

import ClientContext from '../../context/client/clientContext';
import BuildingContext from '../../context/building/buildingContext';

const Client = (props) => {
	const clientContext = useContext(ClientContext);
	const { clientsList, fetchClients, onClientSelection } = clientContext;

	const buildingContext = useContext(BuildingContext);
	const {
		fetchClientBuildingFn,
		selectBuidlingRecordFn,
		showBuildingWindowFn,
		editBuildingRecordFn,
	} = buildingContext;

	useEffect(() => {
		fetchClients();
	}, []);

	const onChangeHandler = (e) => {
		const id = e.target.value;
		const clientRecord = clientsList.find((client) => client.id === id);
		onClientSelection(clientRecord);
		showBuildingWindowFn(false);
		editBuildingRecordFn(false);
		fetchClientBuildingFn(id).then((id) => {
			if (id) {
				selectBuidlingRecordFn(id);
			}
		});
	};

	return (
		<div>
			<Form.Group controlId="ClientSelectForm">
				<Form.Label>Select Client</Form.Label>
				<Form.Control
					as="select"
					defaultValue=""
					onChange={(e) => onChangeHandler(e)}
				>
					<option value="" disabled>
						Select
					</option>
					{clientsList.map((client) => (
						<option value={client.id} key={client.id}>
							{client.name}
						</option>
					))}
				</Form.Control>
			</Form.Group>
		</div>
	);
};

export default Client;
