import React from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';

const DraggableLayoutWrapper = ({ onDragEnd, children }) => {
	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Droppable droppableId='droppable'>
				{(provided) => (
					<div {...provided.droppableProps} ref={provided.innerRef}>
						{children}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</DragDropContext>
	);
};

DraggableLayoutWrapper.propTypes = {
	onDragEnd: PropTypes.func.isRequired,
	children: PropTypes.element
};

export default DraggableLayoutWrapper;
