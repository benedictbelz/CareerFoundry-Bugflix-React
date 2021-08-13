import { combineReducers } from "redux";
import { SET_FILTER, SET_DIRECTORS, SET_GENRES, SET_MOVIES, SET_USER, SET_TOKEN } from "../actions/actions";

function filter(state = '', action) {
  	switch (action.type){
		case SET_FILTER: return action.value;
		default: return state;
  	}
}

function directors(state = [], action) {
	switch (action.type) {
		case SET_DIRECTORS: return action.value;
		default: return state;
	}
}

function genres(state = [], action) {
	switch (action.type) {
		case SET_GENRES: return action.value;
		default: return state;
	}
}

function movies(state = [], action){
  	switch (action.type) {
		case SET_MOVIES: return action.value;
		default: return state;
  	}
}


function user(state = '', action) {
  	switch (action.type) {
		case SET_USER: return action.value;
		default: return state;
	}
}

function token(state = '', action) {
	switch (action.type) {
	  case SET_TOKEN: return action.value;
	  default: return state;
  }
}

const bugflixReducer = combineReducers({
	filter,
	directors,
	genres,
  	movies,
  	user,
	token
});

export default bugflixReducer;