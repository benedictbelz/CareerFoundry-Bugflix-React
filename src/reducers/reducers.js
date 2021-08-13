import {combineReducers} from 'redux';
import {
	SET_FILTER,
	SET_DIRECTORS,
	SET_GENRES,
	SET_MOVIES,
	SET_USER,
	UPDATE_USER,
} from '../actions/actions';

function filter(state = '', action) {
	switch (action.type) {
		case SET_FILTER:
			console.log('REDUCER SET_FILTER');
			return action.value;
		default:
			return state;
	}
}

function directors(state = [], action) {
	switch (action.type) {
		case SET_DIRECTORS:
			console.log('REDUCER SET_DIRECTORS');
			return action.value;
		default:
			return state;
	}
}

function genres(state = [], action) {
	switch (action.type) {
		case SET_GENRES:
			console.log('REDUCER SET_GENRES');
			return action.value;
		default:
			return state;
	}
}

function movies(state = [], action) {
	switch (action.type) {
		case SET_MOVIES:
			console.log('REDUCER SET_MOVIES');
			return action.value;
		default:
			return state;
	}
}

function user(state = [], action) {
	switch (action.type) {
		case SET_USER:
			console.log('REDUCER SET_USER');
			return action.value;
		case UPDATE_USER:
			console.log('REDUCER UPDATE_USER');
			return action.value;
		default:
			return state;
	}
}

const bugflixReducer = combineReducers({
	filter,
	genres,
	directors,
	movies,
    user
});

export default bugflixReducer;
