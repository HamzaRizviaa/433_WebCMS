/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
// import Close from '@material-ui/icons/Close';
import { useStyles } from './index.styles';
import Editor from '../Editor';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { ReactComponent as Union } from '../../assets/drag.svg';
import { ReactComponent as Deletes } from '../../assets/Delete.svg';
const ArticleTextDraggable = ({
	item,
	key,
	index,
	sendFileToParent,
	setIsOpen
	// WidthHeightCallback,
	// handleDeleteFile,
	// initialData
}) => {
	console.log(item, 'item', setIsOpen);
	const classes = useStyles();
	const [clickExpandIcon, setClickExpandIcon] = useState(item?.isOpen);

	// const [newFile, setNewFile] = useState(initialData ? [initialData] : []);

	const clickExpand = () => {
		setClickExpandIcon(!clickExpandIcon);
		setIsOpen(!clickExpandIcon);
	};

	const handleEditorChange = () => {
		const editorTextContent = tinymce?.activeEditor?.getContent();
		sendFileToParent(editorTextContent);
		// setEditorTextChecker(editorTextContent); // to check yellow button condition
	};

	return (
		<>
			<Draggable
				draggableId={`draggable-${item?.id}`}
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
						{clickExpandIcon ? (
							<div>
								hello
								<Editor
									description={'abc'}
									// onMouseEnter={() => setDisableDropdown(false)}
									// onBlur={() => setDisableDropdown(true)}
									handleEditorChange={() => {
										handleEditorChange;
									}}
								/>
							</div>
						) : (
							<div></div>
						)}
					</div>
				)}
			</Draggable>
		</>
	);
};

ArticleTextDraggable.propTypes = {
	item: PropTypes.number,
	key: PropTypes.number,
	index: PropTypes.number,
	sendFileToParent: PropTypes.func.isRequired,
	// WidthHeightCallback: PropTypes.func,
	// handleDeleteFile: PropTypes.func,
	// initialData: PropTypes.object,
	setIsOpen: PropTypes.func
};

export default ArticleTextDraggable;
