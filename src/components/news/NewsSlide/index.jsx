import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const NewsSlide = () => {
	return (
		<div>
			<Draggable draggableId={`draggable-${index}`} index={index} key={key}>
				{(provided) => (
					<div
						ref={provided.innerRef}
						{...provided.draggableProps}
						style={{
							...provided.draggableProps.style
						}}
					></div>
				)}
			</Draggable>
		</div>
	);
};

NewsSlide.propTypes = {};

export default NewsSlide;
