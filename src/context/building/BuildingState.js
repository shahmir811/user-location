import React, { useReducer } from 'react';
import uuid from 'uuid';

import {
	SET_LOADING,
	SHOW_BUILDING_WINDOW,
	SET_ERRORS,
	REMOVE_ERRORS,
	FETCH_CLIENT_BUILDINGS,
	REMOVE_BUILDING,
	SELECT_BUILDING,
	EDIT_BUILDING_RECORDS,
	UPDATE_BUILDING_RECORDS,
} from './BuildingTypes';

import BuildingContext from './buildingContext';
import BuildingReducer from './BuildingReducer';

const BuildingState = (props) => {
	const initialState = {
		loading: false,
		buildingList: [],
		showBuildingWindow: false,
		selectedBuilding: null,
		editRecord: false,
		errors: {},
	};

	const [state, dispatch] = useReducer(BuildingReducer, initialState);

	// ****************************************************** //

	const setLoading = (status) => {
		dispatch({ type: SET_LOADING, payload: status });
	};

	// ****************************************************** //

	const showBuildingWindowFn = (status) => {
		return new Promise((resolve, reject) => {
			dispatch({ type: SHOW_BUILDING_WINDOW, payload: status });
			resolve();
		});
	};

	// ****************************************************** //

	const editBuildingRecordFn = (status) => {
		dispatch({ type: EDIT_BUILDING_RECORDS, payload: status });
	};

	// ****************************************************** //

	const fetchClientBuildingFn = (clientId) => {
		return new Promise((resolve, reject) => {
			setLoading(true);

			let clientBuildings = [];

			const buildingsJSON = localStorage.getItem('buildings');
			if (buildingsJSON !== null) {
				const records = JSON.parse(buildingsJSON);
				const clientRecordIndex = records.findIndex(
					(record) => record.id === clientId
				);

				if (clientRecordIndex !== -1) {
					clientBuildings = records[clientRecordIndex].buildings;
				}
			}

			setTimeout(() => {
				dispatch({
					type: FETCH_CLIENT_BUILDINGS,
					payload: clientBuildings,
				});
				if (clientBuildings.length > 0) {
					resolve(clientBuildings[0].buildingId);
				} else {
					resolve(null);
				}
			}, 2000);

			// dispatch({
			// 	type: FETCH_CLIENT_BUILDINGS,
			// 	payload: clientBuildings,
			// });
		});
	};

	// ****************************************************** //

	const addNewBuildingFn = (data) => {
		return new Promise((resolve, reject) => {
			dispatch({ type: REMOVE_ERRORS });

			const { building } = data;

			if (!building.name || !building.country) {
				let errors = {};
				if (!building.name) errors.name = 'Building name is required';
				if (!building.country) errors.country = 'Select country from dropdown';

				dispatch({ type: SET_ERRORS, payload: errors });

				reject(errors);
				return;
			}

			// Check if buildings are already saved in localStorage
			const buildingsJSON = localStorage.getItem('buildings');

			let buildingDetails = {
				buildingName: data.building.name,
				buildingId: uuid(),
				...data.building.country,
			};
			let newBuilding = {
				id: data.client.id,
				username: data.client.name,
				buildings: [buildingDetails],
			};

			if (buildingsJSON !== null) {
				let records = JSON.parse(buildingsJSON);
				let clientId = data.client.id;

				// check if we already have a record of similar client
				const getIndex = records.findIndex((record) => record.id === clientId);

				if (getIndex !== -1) {
					// it means we have a record
					records[getIndex].buildings.push(buildingDetails);
					localStorage.setItem('buildings', JSON.stringify(records));
					resolve('success');
				} else {
					// add new record in existing building records
					records.push(newBuilding);
					localStorage.setItem('buildings', JSON.stringify(records));
					resolve('success');
				}

				// check whether this user records exit
			} else {
				localStorage.setItem('buildings', JSON.stringify([newBuilding]));
				resolve('success');
			}

			fetchClientBuildingFn(data.client.id).then(() => {
				selectBuidlingRecordFn(buildingDetails.buildingId);
			});
			showBuildingWindowFn(false);
		});
	};

	// ****************************************************** //

	const deleteClientBuildingFn = (clientId, buildingId) => {
		setLoading(true);

		const buildingsJSON = localStorage.getItem('buildings');
		let records = JSON.parse(buildingsJSON);
		let userRecord = records.find((record) => record.id === clientId);
		let buildingList = userRecord.buildings.filter(
			(b) => b.buildingId !== buildingId
		);
		userRecord.buildings = buildingList;

		localStorage.setItem('buildings', JSON.stringify(records));

		setTimeout(() => {
			dispatch({
				type: REMOVE_BUILDING,
				payload: buildingId,
			});
		}, 1000);
	};

	// ****************************************************** //

	const selectBuidlingRecordFn = (buildingId) => {
		dispatch({
			type: SELECT_BUILDING,
			payload: buildingId,
		});
	};

	// ****************************************************** //

	const updateBuildingRecordFn = (data) => {
		setLoading(true);
		const { clientId, buildingId, building } = data;

		return new Promise((resolve, reject) => {
			const buildingsJSON = localStorage.getItem('buildings');
			let records = JSON.parse(buildingsJSON);
			// let index = records.findIndex((record) => record.id === clientId);
			let userRecord = records.find((record) => record.id === clientId);

			let index = userRecord.buildings.findIndex(
				(b) => b.buildingId === buildingId
			);

			userRecord.buildings[index].buildingName = building.name;
			userRecord.buildings[index].id = building.country.id;
			userRecord.buildings[index].name = building.country.name;
			userRecord.buildings[index].position = building.country.position;

			localStorage.setItem('buildings', JSON.stringify(records));

			let payload = {
				buildingId,
				...building,
			};

			dispatch({
				type: UPDATE_BUILDING_RECORDS,
				payload,
			});

			selectBuidlingRecordFn(buildingId);
			setLoading(false);

			resolve();
		});
	};

	return (
		<BuildingContext.Provider
			value={{
				buildingList: state.buildingList,
				loading: state.loading,
				errors: state.errors,
				editRecord: state.editRecord,
				selectedBuilding: state.selectedBuilding,
				showBuildingWindow: state.showBuildingWindow,
				showBuildingWindowFn,
				addNewBuildingFn,
				fetchClientBuildingFn,
				deleteClientBuildingFn,
				selectBuidlingRecordFn,
				editBuildingRecordFn,
				updateBuildingRecordFn,
			}}
		>
			{props.children}
		</BuildingContext.Provider>
	);
};

export default BuildingState;
