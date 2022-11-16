import React from 'react';
import PropTypes from 'prop-types';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

/**
 * Draggable Component
 * @component
 */
const DraggableLayoutWrapper = ({ children, onDragEnd }) => {
	return (
		<div>
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
		</div>
	);
};

DraggableLayoutWrapper.propTypes = {
	children: PropTypes.node,
	onDragEnd: PropTypes.func
};

export default DraggableLayoutWrapper;
