import React from 'react';
import { connect } from 'react-redux';
import { Col } from 'react-bootstrap';
import Filter from '../filter/filter';
import { MovieCard } from '../movie-card/movie-card';

function MovieList(props) {
	const { filter, movies, user } = props;
	let filteredMovies = movies;

	if (filter !== '') filteredMovies = movies.filter(m => m.Title.toLowerCase().includes(filter.toLowerCase()));
	
	if (!movies) return;

	return (
		<>
			<Col className='p-2' md={12}>
				<Filter filter={filter} />
			</Col>
			{filteredMovies.map(movie => (
				<Col className='p-2' md={3} key={movie._id}>
					<MovieCard
						favorite={user.Favorites.includes(movie._id)}
						movie={movie}
						addFavorite={movie => props.addFavorite(movie)}
                        removeFavorite={movie => props.removeFavorite(movie)}
					/>
				</Col>
			))}
		</>
	);
}

const mapStateToProps = state => {
	return { 
		filter: state.filter
	};
};

export default connect(mapStateToProps)(MovieList);