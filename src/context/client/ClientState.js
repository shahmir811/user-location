import React, { useReducer } from 'react';
import uuid from 'uuid';

import ClientContext from './clientContext';
import ClientReducer from './ClientReducer';
import {
	ADD_CLIENT,
	FETCH_CLIENT,
	CLIENT_SELECTED,
	SET_LOADING,
} from './ClientTypes';

const UserState = (props) => {
	const initialState = {
		clientsList: [],
		selectedClient: null,
		loading: false,
	};

	const [state, dispatch] = useReducer(ClientReducer, initialState);

	// ****************************************************** //

	const setLoading = (status) => {
		dispatch({
			type: SET_LOADING,
			payload: status,
		});
	};

	// ****************************************************** //

	const fetchClients = () => {
		const records = localStorage.getItem('clients');
		let clients = records ? JSON.parse(records) : [];

		dispatch({
			type: FETCH_CLIENT,
			payload: clients,
		});
	};

	// ****************************************************** //

	const onClientSelection = (data) => {
		setLoading(true);

		dispatch({
			type: CLIENT_SELECTED,
			payload: data,
		});
	};

	// ****************************************************** //

	const addNewClient = (name) => {
		const data = { id: uuid(), name };

		// Check if clients are already saved in localStorage
		const clientsJSON = localStorage.getItem('clients');
		let clients = [];

		if (clientsJSON !== null) {
			clients = JSON.parse(clientsJSON);
			clients.push(data);
			localStorage.setItem('clients', JSON.stringify(clients));
		} else {
			clients.push(data);
			const json = JSON.stringify(clients);
			localStorage.setItem('clients', json);
		}

		dispatch({
			type: ADD_CLIENT,
			payload: data,
		});
	};

	// ****************************************************** //

	return (
		<ClientContext.Provider
			value={{
				clients: state.clients,
				clientsList: state.clientsList,
				selectedClient: state.selectedClient,
				loading: state.loading,
				fetchClients,
				addNewClient,
				onClientSelection,
			}}
		>
			{props.children}
		</ClientContext.Provider>
	);
};

export default UserState;
