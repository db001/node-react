import { FETCH_USER } from "../actions/types";

const authReducer = (state = null, action) => {
	switch (action.type) {
		case FETCH_USER:
			// return action.payload || false;
			return isEmpty(action.payload) ? false : action.payload;
		default:
			return state;
	}
};

export default authReducer;

function isEmpty(obj) {
	for (let key in obj) {
		if (obj.hasOwnProperty(key)) return false;
	}
	return true;
}
