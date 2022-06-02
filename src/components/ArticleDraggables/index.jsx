/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
// import Close from '@material-ui/icons/Close';
import { useStyles } from './index.style';
import { ReactComponent as Union } from '../../assets/drag.svg';
import { ReactComponent as Deletes } from '../../assets/Delete.svg';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const ArticleDraggables = ({ item, key, index, children }) => {
	const classes = useStyles();
	const [clickExpandIcon, setClickExpandIcon] = useState(false);
	const clickExpand = () => {
		setClickExpandIcon(!clickExpandIcon);
	};
	return (
		<>
			<Draggable
				draggableId={`draggable-${item.id}`}
				index={index}
				key={key}
				//	isDragDisabled={uploadeddatas.length <= 1}
			>
				{(provided) => (
					<div
						ref={provided.innerRef}
						{...provided.draggableProps}
						style={{
							...provided.draggableProps.style
						}}
						className={classes.articleBuilder}
					>
						<div className={classes.draggableWrapperHead}>
							<div className={classes.leftDiv}>
								<div className={classes.grabIconDiv}>
									<span {...provided.dragHandleProps}>
										<Union
											style={{ cursor: 'grab' }}
											className={classes.grabIcon}
										/>
									</span>
								</div>
								<div className={classes.wrapperHeading}>{item.heading}</div>
							</div>
							<div className={classes.rightDiv}>
								<div className={classes.deleteIconDiv}>
									<Deletes className={classes.deleteIcon} />
								</div>
								<div
									className={classes.expandIconDiv}
									onClick={() => {
										clickExpand();
									}}
								>
									{clickExpandIcon ? <ExpandLessIcon /> : <ExpandMoreIcon />}
								</div>
							</div>
						</div>
						{clickExpandIcon ? <div>{children}</div> : <div></div>}
					</div>
				)}
			</Draggable>
		</>
	);
};

ArticleDraggables.propTypes = {
	item: PropTypes.number,
	key: PropTypes.number,
	index: PropTypes.number,
	children: PropTypes.node
};

export default ArticleDraggables;
