import React from 'react';
import { useStyles } from './index.style';
import PropTypes from 'prop-types';

const Card = ({ data, index }) => {
	const classes = useStyles();

	return (
		<div className={classes.card} key={index}>
			<div>
				<div className={classes.author}>{data.username}</div>
				<div className={classes.title}>{data.title}</div>
			</div>
			<div className={classes.dateBlock}>
				Last edited
				<div className={classes.date}>{data.last_edited}</div>
			</div>
		</div>
	);
};

export default Card;

Card.propTypes = {
	data: PropTypes.obj,
	index: PropTypes.any
};
