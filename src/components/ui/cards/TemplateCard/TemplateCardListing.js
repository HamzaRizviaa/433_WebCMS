import React from 'react';
import { useStyles } from './index.style';
import PropTypes from 'prop-types';
import TemplateSVG from '../../../../assets/TemplateAdd.svg';
import TemplateCard from './index';

const TemplateCardListing = ({ data, emptyCardClick, emptyCardText }) => {
	const classes = useStyles();

	return (
		<div className={classes.cardModal}>
			<div className={classes.newCard} onClick={() => emptyCardClick()}>
				<img src={TemplateSVG} className={classes.templateSVG} />
				{emptyCardText}
			</div>

			{data.map((item, index) => {
				return <TemplateCard data={item} key={index} />;
			})}
		</div>
	);
};

export default TemplateCardListing;

TemplateCardListing.propTypes = {
	emptyCardClick: PropTypes.func.isRequired,
	emptyCardText: PropTypes.string.isRequired,
	data: PropTypes.array.isRequired
};
