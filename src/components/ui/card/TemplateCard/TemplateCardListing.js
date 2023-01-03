import React from 'react';
import { useStyles } from './index.style';
import PropTypes from 'prop-types';
import TemplateSVG from '../../../../assets/TemplateAdd.svg';
import { Grid } from '@material-ui/core';
import Card from './index';

const TemplateCardListing = ({ data, emptyCardClick, emptyCardText }) => {
	const classes = useStyles();

	return (
		<div className={classes.cardModal}>
			<Grid container>
				<Grid item md={4}>
					<div className={classes.newCard} onClick={() => emptyCardClick()}>
						<img src={TemplateSVG} className={classes.templateSVG} />
						{emptyCardText}
					</div>
				</Grid>

				{data.map((item, index) => {
					return (
						<Grid item md={4} key={index}>
							<Card data={item} key={index} />
						</Grid>
					);
				})}
			</Grid>
		</div>
	);
};

export default TemplateCardListing;

TemplateCardListing.propTypes = {
	emptyCardClick: PropTypes.func.isRequired,
	emptyCardText: PropTypes.string.isRequired,
	data: PropTypes.array.isRequired
};
