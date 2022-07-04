/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import { useStyles as globalUseStyles } from '../../../styles/global.style';
import { ReactComponent as Union } from '../../../assets/drag.svg';
import { useStyles } from './index.styles';

const NewsSlide = () => {
	const classes = useStyles();
	const globalClasses = globalUseStyles();

	return (
		<div>
			<Draggable draggableId={`draggable-0`}>
				{(provided) => (
					<div
						ref={provided.innerRef}
						{...provided.draggableProps}
						style={{
							...provided.draggableProps.style
						}}
					>
						<div className={globalClasses.accordionRoot}>
							<Accordion>
								<AccordionSummary expandIcon={<ExpandMoreIcon />}>
									<div className={classes.leftDiv}>
										<div className={classes.grabIconDiv}>
											<span {...provided.dragHandleProps}>
												<Union
													style={{ cursor: 'grab' }}
													className={classes.grabIcon}
												/>
											</span>
										</div>
									</div>
									<Typography>News Slide</Typography>
								</AccordionSummary>

								<AccordionDetails>ggg</AccordionDetails>
							</Accordion>
						</div>
					</div>
				)}
			</Draggable>
		</div>
	);
};

NewsSlide.propTypes = {};

export default NewsSlide;
