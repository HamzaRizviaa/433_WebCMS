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
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { DragIcon, DeleteIcon } from '../../../assets/svg-icons';
import { useDraggableCardLayoutStyles } from './index.style';

const DraggableCardLayout = ({
	title,
	item,
	index,
	onDeleteIconClick,
	largeIconsAndLabel = false,
	disableActions = false,
	children,
	key
}) => {
	const [expanded, setExpanded] = useState(item?.isOpen || true);

	const toggleExpand = () => setExpanded(!expanded);

	const classes = useDraggableCardLayoutStyles({
		largeIconsAndLabel,
		disableActions
	});

	return (
		<Draggable draggableId={`draggable-${index}`} index={index} key={key}>
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
										{disableActions ? (
											<span>
												<DragIcon className={classes.grabIcon} />
											</span>
										) : (
											<span {...provided.dragHandleProps}>
												<DragIcon className={classes.grabIcon} />
											</span>
										)}
									</div>
									<Typography className={classes.heading}>{title}</Typography>
								</div>
								<Box className={classes.rightDiv}>
									<div
										className={`${classes.rightIconsWrapper} ${classes.deleteIconWrapper}`}
									>
										<DeleteIcon
											className={classes.deleteIcon}
											onClick={() => {
												if (!disableActions) onDeleteIconClick(item, index);
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
	largeIconsAndLabel: PropTypes.bool,
	disableActions: PropTypes.bool
};

export default DraggableCardLayout;
