import React, { useContext, Fragment } from 'react';
import { Button, Spinner } from 'react-bootstrap';

import './Building.css';
import BuildingContext from '../../context/building/buildingContext';
import ClientContext from '../../context/client/clientContext';

const Building = () => {
	const buildingContext = useContext(BuildingContext);
	const {
		showBuildingWindowFn,
		buildingList,
		loading,
		deleteClientBuildingFn,
		selectBuidlingRecordFn,
		selectedBuilding,
		editBuildingRecordFn,
	} = buildingContext;

	const clientContext = useContext(ClientContext);
	const { selectedClient } = clientContext;

	const addNewBuilding = () => {
		showBuildingWindowFn(true);
		editBuildingRecordFn(false);
	};

	const showClientBuildings = () => {
		if (loading) {
			return (
				<Spinner animation="border" role="status">
					<span className="sr-only">Loading...</span>
				</Spinner>
			);
		}

		const deleteBuilding = (id) => {
			deleteClientBuildingFn(selectedClient.id, id);
		};

		const editBuildingRecord = (id) => {
			selectBuidlingRecordFn(id);
			showBuildingWindowFn(true).then(() => {
				editBuildingRecordFn(true);
			});
		};

		return (
			<Fragment>
				{buildingList.map((building) => (
					<p
						value={building.id}
						key={building.buildingId}
						className={`buildings-component-building-name ${
							selectedBuilding &&
							building.buildingId === selectedBuilding.buildingId
								? 'selected'
								: ''
						}`}
						onClick={() => selectBuidlingRecordFn(building.buildingId)}
					>
						<span>{building.buildingName}</span>

						<span className="buildings-component-edit-delete-icons">
							<span onClick={() => editBuildingRecord(building.buildingId)}>
								<i className="fa fa-file" aria-hidden="true"></i>
							</span>
							<span onClick={() => deleteBuilding(building.buildingId)}>
								<i className="fa fa-trash" aria-hidden="true"></i>
							</span>
						</span>
					</p>
				))}
			</Fragment>
		);
	};

	return (
		<div className="building-component-wrapping-div">
			<div className="building-component-buildings-list">
				<h2 className="building-component-topHeader">Buildings</h2>
				{selectedClient && showClientBuildings()}
			</div>
			<div>
				{selectedClient && (
					<Button
						className="btn btn-success add-building-btn"
						onClick={() => addNewBuilding()}
					>
						Add Building
					</Button>
				)}
			</div>
		</div>
	);
};

export default Building;
