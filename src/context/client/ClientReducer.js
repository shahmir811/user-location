import {
	ADD_CLIENT,
	FETCH_CLIENT,
	CLIENT_SELECTED,
	SET_LOADING,
} from './ClientTypes';

export default (state, action) => {
	const { type, payload } = action;

	switch (type) {
		case FETCH_CLIENT:
			return { ...state, clientsList: payload, loading: false };

		case ADD_CLIENT:
			return { ...state, clientsList: [...state.clientsList, payload] };

		case CLIENT_SELECTED:
			return { ...state, selectedClient: payload, loading: false };

		case SET_LOADING:
			return { ...state, loading: payload };

		default:
			return state;
	}
};
