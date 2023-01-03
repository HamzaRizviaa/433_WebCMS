import React from 'react';
import { useStyles } from './index.style';
import PropTypes from 'prop-types';

const TemplateCard = ({ data, index }) => {
	const classes = useStyles();

	return (
		<div className={classes.card} key={index}>
			<div>
				<div className={classes.author}>{data.user}</div>
				<div className={classes.title}>{data.template_name}</div>
			</div>
			<div className={classes.dateBlock}>
				Last edited
				<div className={classes.date}>{data.last_edited}</div>
			</div>
		</div>
	);
};

export default TemplateCard;

TemplateCard.propTypes = {
	data: PropTypes.obj,
	index: PropTypes.any
};
