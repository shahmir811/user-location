import React, { useState, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';

import './AddClient.css';

import ClientContext from '../../context/client/clientContext';

const AddClient = () => {
	const clientContext = useContext(ClientContext);
	const { addNewClient } = clientContext;

	const [client, setClient] = useState('');

	const onSubmitHandler = (e) => {
		e.preventDefault();
		addNewClient(client);
		setClient('');
	};

	return (
		<div>
			<Form onSubmit={onSubmitHandler}>
				<Form.Label>Add Client</Form.Label>
				<Form.Control
					type="text"
					placeholder="Enter client name"
					value={client}
					onChange={(e) => setClient(e.target.value)}
				/>

				<Button
					variant="primary"
					type="submit"
					className="btn btn-primary btn-sm submit-button-style"
				>
					Submit
				</Button>
			</Form>
		</div>
	);
};

export default AddClient;
