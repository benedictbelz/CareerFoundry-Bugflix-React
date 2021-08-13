import PropTypes from 'prop-types';
import React from 'react';
import './favorite.scss';

export function Favorite(props) {
    return (
        <div 
            className={props.favorite?'favorite active':'favorite'}
            onClick={() => 
                props.favorite
                    ? props.removeFavorite()
                    : props.addFavorite()
            }
        >
            <svg className='star' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/2000/xlink' viewBox='0 0 21 20' width='100%' height='100%'>
                <path d='M0,0.054V20h21V0.054H0z M15.422,18.129l-5.264-2.768l-5.265,2.768l1.006-5.863L1.64,8.114l5.887-0.855
	                    l2.632-5.334l2.633,5.334l5.885,0.855l-4.258,4.152L15.422,18.129z'/>
            </svg>
        </div>
    );
}

Favorite.propTypes = {
    favorite: PropTypes.bool.isRequired,
    addFavorite: PropTypes.func.isRequired,
    removeFavorite: PropTypes.func.isRequired
};