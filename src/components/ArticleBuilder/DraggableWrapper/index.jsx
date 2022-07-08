import React from 'react';
import PropTypes from 'prop-types';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

const DraggableWrapper = ({ children, onDragEnd }) => {
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
	onDragEnd: PropTypes.func
};

export default DraggableWrapper;
