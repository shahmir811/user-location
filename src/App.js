import React from 'react';

import './App.css';

import ClientContext from './context/client/ClientState';
import BuildingContext from './context/building/BuildingState';

import Root from './components/Root';

const App = () => {
	return (
		<div>
			<ClientContext>
				<BuildingContext>
					<Root />
				</BuildingContext>
			</ClientContext>
		</div>
	);
};

export default App;
