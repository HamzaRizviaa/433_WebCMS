import React from 'react';
import { PropTypes } from 'prop-types';
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Typography
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useAccordionLayoutStyles } from './index.style';

const AccordianLayout = ({
	title,
	largeIconsAndLabel,
	children,
	SecondIcon,
	onSecondIconClick
}) => {
	const classes = useAccordionLayoutStyles({ largeIconsAndLabel });

	return (
		<div className={classes.accordionRoot}>
			<Accordion defaultExpanded>
				<AccordionSummary expandIcon={<ExpandMoreIcon />}>
					<Typography>{title}</Typography>
					{!!SecondIcon && (
						<div className={classes.rightSide}>
							<SecondIcon
								className={classes.secondIcon}
								onClick={onSecondIconClick}
							/>
						</div>
					)}
				</AccordionSummary>
				<AccordionDetails>
					<div className={classes.accordianDetail}>{children}</div>
				</AccordionDetails>
			</Accordion>
		</div>
	);
};

AccordianLayout.propTypes = {
	title: PropTypes.string.isRequired,
	largeIconsAndLabel: PropTypes.bool,
	children: PropTypes.element.isRequired,
	SecondIcon: PropTypes.element.isRequired,
	onSecondIconClick: PropTypes.func.isRequired
};

export default AccordianLayout;
