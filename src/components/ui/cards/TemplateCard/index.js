import React from 'react';
import { isEmpty } from 'lodash';
import { useStyles } from './index.style';
import PropTypes from 'prop-types';
import { getDateTime } from '../../../../data/utils';

const TemplateCard = ({ data, onCardClick, index }) => {
	const classes = useStyles();

	if (isEmpty(data)) return null;

	return (
		<div className={classes.card} key={index} onClick={() => onCardClick(data)}>
			<div>
				<div className={classes.author}>{data.user}</div>
				<div className={classes.title}>{data.template_name}</div>
			</div>
			<div className={classes.dateBlock}>
				Last edited
				<div className={classes.date}>{getDateTime(data.last_edited)}</div>
			</div>
		</div>
	);
};

export default TemplateCard;

TemplateCard.propTypes = {
	data: PropTypes.object.isRequired,
	onCardClick: PropTypes.func,
	index: PropTypes.any
};
