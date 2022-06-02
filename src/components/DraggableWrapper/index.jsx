/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
// import Close from '@material-ui/icons/Close';
import Editor from '../Editor';
import { useStyles } from './index.style';
import { ReactComponent as Union } from '../../assets/drag.svg';
import { ReactComponent as Deletes } from '../../assets/Delete.svg';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
const DraggableWrapper = ({
	heading,
	children,
	data,
	ItemToAdd,
	onDragEnd
}) => {
	// const data = [{ id: 1 }, { id: 2 }];
	const [clickExpandIcon, setClickExpandIcon] = useState(false);
	const classes = useStyles();

	// - autocomplete ends

	const clickExpand = () => {
		setClickExpandIcon(!clickExpandIcon);
	};
	return (
		<div>
			<DragDropContext onDragEnd={onDragEnd}>
				<Droppable droppableId='articleDroppable-1'>
					{(provided) => (
						<div {...provided.droppableProps} ref={provided.innerRef}>
							{children}
							{provided.placeholder}
						</div>
					)}
				</Droppable>
			</DragDropContext>
		</div>
	);
};

DraggableWrapper.propTypes = {
	children: PropTypes.node,
	heading: PropTypes.string.isRequired,
	data: PropTypes.array,
	ItemToAdd: PropTypes.object,
	onDragEnd: PropTypes.func
	// handleClose: PropTypes.func.isRequired,
};

export default DraggableWrapper;
