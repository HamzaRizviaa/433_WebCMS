import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import { useStyles } from './index.style';
import TemplateSVG from '../../../../assets/TemplateAdd.svg';
import TemplateCard from './index';
import TemplatingCardsSkeleton from './TemplatingCardsSkeleton';

const TemplateCardListing = ({
	data,
	emptyCardText,
	onCardClick,
	onPreviewClick,
	loading = false
}) => {
	const classes = useStyles();

	if (loading) return <TemplatingCardsSkeleton />;

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
							<TemplateCard
								data={item}
								key={index}
								onCardClick={onCardClick}
								onPreviewClick={onPreviewClick}
							/>
						</Grid>
					);
				})}
			</Grid>
		</div>
	);
};

TemplateCardListing.propTypes = {
	data: PropTypes.array.isRequired,
	emptyCardText: PropTypes.string.isRequired,
	onCardClick: PropTypes.func.isRequired,
	onPreviewClick: PropTypes.func,
	loading: PropTypes.bool
};

export default TemplateCardListing;
