/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
// import Close from '@material-ui/icons/Close';
import { ReactComponent as Union } from '../../assets/drag.svg';
import { ReactComponent as Deletes } from '../../assets/Delete.svg';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import DragAndDropField from '../DragAndDropField';

const ArticleMediaDraggable = () => {
	return (
		<>
			{' '}
			<Draggable
				key={data.id}
				draggableId={`draggable-${data.id}`}
				index={index}
				//	isDragDisabled={uploadeddatas.length <= 1}
			>
				{(provided) => (
					<div
						key={index}
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
								<div className={classes.wrapperHeading}>{heading}</div>
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
								<DragAndDropField
									uploadedFiles={form.uploadedFiles}
									// isEdit={isEdit}
									handleDeleteFile={handleDeleteFile}
									setPreviewBool={setPreviewBool}
									setPreviewFile={setPreviewFile}
									imgEl={imgEl}
									videoRef={videoRef}
									imageOnload={() => {
										setFileWidth(imgEl.current.naturalWidth);
										setFileHeight(imgEl.current.naturalHeight);
									}}
									onLoadedVideodata={() => {
										setFileWidth(videoRef.current.videoWidth);
										setFileHeight(videoRef.current.videoHeight);
									}}
									isArticle
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

export default ArticleMediaDraggable;
