import React, { useContext } from 'react';
import { Row, Col, Container } from 'react-bootstrap';

import AddClient from './AddClient/AddClient';
import Client from './Client/Client';
import Building from './Building/Building';
import AddBuilding from './AddBuilding/AddBuilding';
import UpdateBuilding from './UpdateBuilding/UpdateBuilding';
import DisplayMap from './DisplayMap/DisplayMap';

import BuildingContext from '../context/building/buildingContext';

import './Root.css';

const Root = () => {
	const buildingContext = useContext(BuildingContext);
	const { showBuildingWindow, editRecord } = buildingContext;

	const renderComponent = () => {
		if (editRecord) {
			return <UpdateBuilding />;
		}

		return showBuildingWindow ? <AddBuilding /> : <DisplayMap />;
	};

	return (
		<Container fluid>
			<Row className="client-selection-row">
				<Col md={4}>
					<Client />
				</Col>
				<Col md={{ span: 4, offset: 4 }}>
					<AddClient />
				</Col>
			</Row>
			<Row className="building-and-map-wrapping-div">
				<Col md={{ span: 3, offset: 1 }}>
					<Building />
				</Col>
				<Col md={{ span: 8 }}>{renderComponent()}</Col>
			</Row>
		</Container>
	);
};

export default Root;
