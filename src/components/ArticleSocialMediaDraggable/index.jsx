/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useStyles as globalUseStyles } from '../../styles/global.style';
import { TextField } from '@material-ui/core';
import { useStyles } from './index.style';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { ReactComponent as Union } from '../../assets/drag.svg';
import { ReactComponent as Deletes } from '../../assets/Delete.svg';
const ArticleSocialMediaDraggable = ({
	item,
	key,
	index,
	sendDataToParent,
	setIsOpen
	// WidthHeightCallback,
	// handleDeleteFile,
	// initialData
}) => {
	const classes = useStyles();
	const globalClasses = globalUseStyles();
	const [clickExpandIcon, setClickExpandIcon] = useState(item?.isOpen);
	const [postUrl, setPostUrl] = useState('');

	const clickExpand = () => {
		setClickExpandIcon(!clickExpandIcon);
		setIsOpen(!clickExpandIcon);
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
								{' '}
								<div className={classes.socialmediaDrags}>
									<h6> URL</h6>
									<TextField
										value={postUrl}
										onChange={(e) => {
											setPostUrl(e.target.value);
											sendDataToParent({
												[`${item.element_type}_post_url}`]: e.target.value
											});
										}}
										placeholder={'Please drop the URL here'}
										className={classes.textField}
										multiline
										maxRows={2}
										InputProps={{
											disableUnderline: true,
											className: classes.textFieldInput
										}}
									/>
								</div>
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

ArticleSocialMediaDraggable.propTypes = {
	item: PropTypes.number,
	key: PropTypes.number,
	index: PropTypes.number,
	sendDataToParent: PropTypes.func.isRequired,
	// WidthHeightCallback: PropTypes.func,
	// handleDeleteFile: PropTypes.func,
	// initialData: PropTypes.object,
	setIsOpen: PropTypes.func
};

export default ArticleSocialMediaDraggable;
