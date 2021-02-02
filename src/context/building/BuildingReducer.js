import {
	SHOW_BUILDING_WINDOW,
	SET_LOADING,
	SET_ERRORS,
	REMOVE_ERRORS,
	FETCH_CLIENT_BUILDINGS,
	REMOVE_BUILDING,
	SELECT_BUILDING,
	EDIT_BUILDING_RECORDS,
	UPDATE_BUILDING_RECORDS,
} from './BuildingTypes';

export default (state, action) => {
	const { type, payload } = action;

	switch (type) {
		case SHOW_BUILDING_WINDOW:
			return { ...state, showBuildingWindow: payload };

		case SET_ERRORS:
			return { ...state, errors: payload };

		case REMOVE_BUILDING:
			return {
				...state,
				buildingList: state.buildingList.filter(
					(b) => b.buildingId !== payload
				),
				loading: false,
			};

		case SELECT_BUILDING:
			return {
				...state,
				selectedBuilding: state.buildingList.find(
					(b) => b.buildingId === payload
				),
			};

		case UPDATE_BUILDING_RECORDS:
			return {
				...state,
				// buildingList: state.buildingList.map((building) => {
				// 	if (building.buildingId === payload.buildingId) {
				// 		building.buildingName = payload.buildingName;
				// 		building.id = payload.country.id;
				// 		building.name = payload.country.name;
				// 		building.position = payload.country.position;
				// 	}
				// }),
				buildingList: state.buildingList.map((building) =>
					building.buildingId === payload.buildingId
						? {
								...building,
								buildingName: payload.name,
								id: payload.country.id,
								name: payload.country.name,
								position: payload.country.position,
						  }
						: building
				),
			};

		case EDIT_BUILDING_RECORDS:
			return { ...state, editRecord: payload };

		case REMOVE_ERRORS:
			return { ...state, errors: {} };

		case FETCH_CLIENT_BUILDINGS:
			return { ...state, buildingList: payload, loading: false };

		case SET_LOADING:
			return { ...state, loading: payload };

		default:
			return state;
	}
};
