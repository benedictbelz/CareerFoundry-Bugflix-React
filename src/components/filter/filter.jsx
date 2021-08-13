import React from 'react';
import { connect } from 'react-redux';
import { Form } from 'react-bootstrap';
import { setFilter } from '../../actions/actions';

//function component Visibility Filter Input
function Filter(props) {
	return (
		<Form.Control onChange={e => props.setFilter(e.target.value)} value={props.filter} placeholder='Filter Movies' />
	);
}

export default connect(null, { setFilter })(Filter)