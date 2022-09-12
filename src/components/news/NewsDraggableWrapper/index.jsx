import React from 'react';
import PropTypes from 'prop-types';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

const NewsDraggable = ({ children, onDragEnd }) => {
	return (
		<div>
			<DragDropContext onDragEnd={onDragEnd}>
				<Droppable droppableId='newsDroppable-1'>
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

NewsDraggable.propTypes = {
	children: PropTypes.node,
	onDragEnd: PropTypes.func
};

export default NewsDraggable;
