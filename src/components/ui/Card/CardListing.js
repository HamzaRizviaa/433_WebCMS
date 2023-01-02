import React from 'react';
import { useStyles } from './index.style';
import PropTypes from 'prop-types';
import TemplateSVG from '../../../assets/TemplateAdd.svg';
import Card from './index';

const CardListing = ({ data, emptyCardClick, emptyCardText }) => {
	const classes = useStyles();

	return (
		<div className={classes.cardModal}>
			<div className={classes.newCard} onClick={() => emptyCardClick()}>
				<img src={TemplateSVG} className={classes.templateSVG} />
				{emptyCardText}
			</div>

			{data.map((item, index) => {
				return <Card data={item} key={index} />;
			})}
		</div>
	);
};

export default CardListing;

CardListing.propTypes = {
	emptyCardClick: PropTypes.func.isRequired,
	emptyCardText: PropTypes.string.isRequired,
	data: PropTypes.array.isRequired
};
