import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';
import {
	Accordion,
	Box,
	AccordionSummary,
	AccordionDetails,
	Typography
} from '@material-ui/core';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { DragIcon, DeleteIcon } from '../../../assets/svg-icons';
import { useDraggableCardLayoutStyles } from './index.style';

const DraggableCardLayout = ({
	title,
	item,
	index,
	onDeleteIconClick,
	largeIconsAndLabel = false,
	children
}) => {
	const [expanded, setExpanded] = useState(item?.isOpen || true);

	const toggleExpand = () => setExpanded(!expanded);

	const classes = useDraggableCardLayoutStyles({ largeIconsAndLabel });

	return (
		<Draggable draggableId={`draggable-${index}`} index={index}>
			{(provided) => (
				<div
					ref={provided.innerRef}
					{...provided.draggableProps}
					style={{
						...provided.draggableProps.style
					}}
				>
					<div className={classes.accordionRoot}>
						<Accordion expanded={expanded}>
							<AccordionSummary className={classes.accordionSummary}>
								<div className={classes.leftDiv}>
									<div className={classes.grabIconDiv}>
										<span {...provided.dragHandleProps}>
											<DragIcon
												style={{ cursor: 'grab' }}
												className={classes.grabIcon}
											/>
										</span>
									</div>
									<Typography className={classes.heading}>{title}</Typography>
								</div>
								<Box className={classes.rightDiv}>
									<div className={classes.rightIconsWrapper}>
										<DeleteIcon
											className={classes.deleteIcon}
											onClick={() => {
												onDeleteIconClick(item, index);
											}}
										/>
									</div>
									<div className={classes.rightIconsWrapper}>
										{expanded ? (
											<ExpandLessIcon onClick={toggleExpand} />
										) : (
											<ExpandMoreIcon onClick={toggleExpand} />
										)}
									</div>
								</Box>
							</AccordionSummary>
							<AccordionDetails>
								<div className={classes.accordianDetail}>{children}</div>
							</AccordionDetails>
						</Accordion>
					</div>
				</div>
			)}
		</Draggable>
	);
};

DraggableCardLayout.propTypes = {
	item: PropTypes.object,
	index: PropTypes.number,
	key: PropTypes.number,
	children: PropTypes.element,
	onDeleteIconClick: PropTypes.func,
	title: PropTypes.string,
	largeIconsAndLabel: PropTypes.bool
};

export default DraggableCardLayout;
