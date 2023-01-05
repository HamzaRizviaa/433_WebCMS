import React from 'react';
import PropTypes from 'prop-types';
import { useStyles } from './index.style';
import TemplateSVG from '../../../../assets/TemplateAdd.svg';
import { Grid } from '@material-ui/core';
import TemplateCard from './index';

const TemplateCardListing = ({ data, emptyCardText, onCardClick }) => {
	const classes = useStyles();

	return (
		<div className={classes.cardModal}>
			<Grid container>
				<Grid item md={4}>
					<div className={classes.newCard} onClick={() => onCardClick()}>
						<img src={TemplateSVG} className={classes.templateSVG} />
						{emptyCardText}
					</div>
				</Grid>

				{data.map((item, index) => {
					return (
						<Grid item md={4} key={index}>
							<TemplateCard data={item} key={index} onCardClick={onCardClick} />
						</Grid>
					);
				})}
			</Grid>
		</div>
	);
};

export default TemplateCardListing;

TemplateCardListing.propTypes = {
	data: PropTypes.array.isRequired,
	emptyCardText: PropTypes.string.isRequired,
	onCardClick: PropTypes.func.isRequired
};
