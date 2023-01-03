import React from 'react';
import PropTypes from 'prop-types';
import { useStyles } from './index.style';
import TemplateSVG from '../../../../assets/TemplateAdd.svg';
import TemplateCard from './index';

const TemplateCardListing = ({ data, emptyCardText, onCardClick }) => {
	const classes = useStyles();

	return (
		<div className={classes.cardModal}>
			<div className={classes.newCard} onClick={() => onCardClick()}>
				<img src={TemplateSVG} className={classes.templateSVG} />
				{emptyCardText}
			</div>

			{data.map((item, index) => (
				<TemplateCard data={item} key={index} onCardClick={onCardClick} />
			))}
		</div>
	);
};

export default TemplateCardListing;

TemplateCardListing.propTypes = {
	data: PropTypes.array.isRequired,
	emptyCardText: PropTypes.string.isRequired,
	onCardClick: PropTypes.func.isRequired
};
