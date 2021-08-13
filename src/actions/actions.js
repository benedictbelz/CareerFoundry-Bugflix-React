export const SET_FILTER = 'SET_FILTER';
export const SET_DIRECTORS = 'SET_DIRECTORS';
export const SET_GENRES = 'SET_GENRES';
export const SET_MOVIES = 'SET_MOVIES';
export const SET_USER = 'SET_USER';
export const UPDATE_USER = 'UPDATE_USER';

export function setFilter(value) {
    console.log('ACTION SET_FILTER');
    return { 
        type: SET_FILTER,
        value
    };
}

export function setDirectors(value) {
    console.log('ACTION SET_DIRECTORS');
    return { 
        type: SET_DIRECTORS,
        value
    };
}

export function setGenres(value) {
    console.log('ACTION SET_GENRES');
    return { 
        type: SET_GENRES,
        value
    };
}

export function setMovies(value) {
    console.log('ACTION SET_MOVIES');
    return { 
        type: SET_MOVIES,
        value
    };
}

export function setUser(value) {
    console.log('ACTION SET_USER');
    return { 
        type: SET_USER,
        value 
    };
  }
  
  export function updateUser(value) {
    console.log('ACTION UPDATE_USER');
    return { 
        type: UPDATE_USER,
        value 
    };
}