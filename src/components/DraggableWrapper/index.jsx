/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
// import Close from '@material-ui/icons/Close';
import Editor from '../Editor';
import { useStyles } from './index.style';
import ArticleTextDraggable from '../ArticleTextDraggable';
import { ReactComponent as Union } from '../../assets/drag.svg';
import { ReactComponent as Deletes } from '../../assets/Delete.svg';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const DraggableWrapper = ({ heading, children, data, ItemToAdd }) => {
	// const reorder = (list, startIndex, endIndex) => {
	// 	const result = Array.from(list);
	// 	const [removed] = result.splice(startIndex, 1);
	// 	result.splice(endIndex, 0, removed);
	// 	return result;
	// };
	// const data = [{ id: 1 }, { id: 2 }];
	const [clickExpandIcon, setClickExpandIcon] = useState(false);
	const classes = useStyles();
	const onDragEnd = (result) => {
		if (!result.destination) {
			return;
		}
		// const items = reorder(
		// 	bannerData,
		// 	result.source.index, // pick
		// 	result.destination.index // drop
		// );

		// setBannerData(items);
	};
	// - autocomplete ends

	const clickExpand = () => {
		setClickExpandIcon(!clickExpandIcon);
	};
	console.log('data', data);
	console.log(ItemToAdd, '============ItemToAdd');
	return (
		<div>
			<DragDropContext onDragEnd={onDragEnd}>
				<Droppable droppableId='droppable-1'>
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
	ItemToAdd: PropTypes.object
	// handleClose: PropTypes.func.isRequired,
};

export default DraggableWrapper;
