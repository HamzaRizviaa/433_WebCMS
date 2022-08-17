/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';
import { useStyles } from './index.styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { ReactComponent as Union } from '../../../assets/drag.svg';
import { ReactComponent as Deletes } from '../../../assets/Delete.svg';
import {
	TabPanelUnstyled,
	TabsListUnstyled,
	TabsUnstyled,
	TabUnstyled
} from '@mui/material';
import ArticleQuestionUpload from '../ArticleQuestionUpload';

const ArticleQuestionDraggable = ({
	item,
	key,
	index,
	sendDataToParent,
	setIsOpen,
	initialData,
	// WidthHeightCallback,
	handleDeleteFile,
	setDisableDropdown,
	handleDeleteData,
	status, //   publish / draft
	isEdit //    true / false
}) => {
	const classes = useStyles();
	const [clickExpandIcon, setClickExpandIcon] = useState(item?.isOpen);
	const clickExpand = () => {
		setClickExpandIcon(!clickExpandIcon);
		setIsOpen(!clickExpandIcon);
	};
	const [qtype, setQtype] = useState('poll');

	const muiClasses = useStyles();

	return (
		<>
			<Draggable
				draggableId={`draggable-${index}`}
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
									<Deletes
										className={classes.deleteIcon}
										onClick={() => {
											handleDeleteFile(item.sortOrder);
										}}
									/>
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
							<div className={muiClasses.root}>
								<TabsUnstyled defaultValue={0} className={muiClasses.tabRoot}>
									{!initialData?.question_id ? (
										<>
											<TabsListUnstyled className={muiClasses.tabMainDiv}>
												<TabUnstyled onClick={() => setQtype('poll')}>
													Add Poll
												</TabUnstyled>
												<TabUnstyled onClick={() => setQtype('quiz')}>
													Add Quiz
												</TabUnstyled>
											</TabsListUnstyled>
										</>
									) : (
										<div className={classes.wrapperHeading}>
											{item?.data && item?.data?.question_type === 'poll'
												? 'Edit Poll'
												: 'Edit Quiz'}
										</div>
									)}
									{initialData?.question_id &&
									item?.data?.question_type === 'poll' ? (
										<TabPanelUnstyled value={0}>
											<ArticleQuestionUpload
												setDisableDropdown={setDisableDropdown}
												item={item}
												key={key}
												index={index}
												sendDataToParent={sendDataToParent}
												handleDeleteData={(uploadedFiles) => {
													handleDeleteData(uploadedFiles);
												}}
												initialData={initialData}
												setIsOpen={setIsOpen}
												handleDeleteFile={handleDeleteFile}
												handleClose={() => {
													handleClose();
												}}
												status={status}
												isEdit={isEdit}
												type='poll'
												qtype={qtype}
											/>
										</TabPanelUnstyled>
									) : initialData?.question_id &&
									  item?.data?.question_type === 'quiz' ? (
										<TabPanelUnstyled value={0}>
											<ArticleQuestionUpload
												item={item}
												key={key}
												index={index}
												status={status}
												isEdit={isEdit}
												sendDataToParent={sendDataToParent}
												handleDeleteData={(uploadedFiles) => {
													handleDeleteData(uploadedFiles);
												}}
												initialData={initialData}
												setIsOpen={setIsOpen}
												handleDeleteFile={handleDeleteFile}
												setDisableDropdown={setDisableDropdown}
												handleClose={() => {
													handleClose();
												}}
												type='quiz'
												qtype={qtype}
											/>
										</TabPanelUnstyled>
									) : (
										<>
											<TabPanelUnstyled value={0}>
												<ArticleQuestionUpload
													setDisableDropdown={setDisableDropdown}
													item={item}
													key={key}
													index={index}
													sendDataToParent={sendDataToParent}
													handleDeleteData={(uploadedFiles) => {
														handleDeleteData(uploadedFiles);
													}}
													initialData={initialData}
													setIsOpen={setIsOpen}
													handleDeleteFile={handleDeleteFile}
													handleClose={() => {
														handleClose();
													}}
													status={status}
													isEdit={isEdit}
													type='poll'
													qtype={qtype}
												/>
											</TabPanelUnstyled>
											<TabPanelUnstyled value={1}>
												<ArticleQuestionUpload
													item={item}
													key={key}
													index={index}
													status={status}
													isEdit={isEdit}
													sendDataToParent={sendDataToParent}
													handleDeleteData={(uploadedFiles) => {
														handleDeleteData(uploadedFiles);
													}}
													initialData={initialData}
													setIsOpen={setIsOpen}
													handleDeleteFile={handleDeleteFile}
													setDisableDropdown={setDisableDropdown}
													handleClose={() => {
														handleClose();
													}}
													type='quiz'
													qtype={qtype}
												/>
											</TabPanelUnstyled>
										</>
									)}
								</TabsUnstyled>
							</div>
						) : (
							<></>
						)}
					</div>
				)}
			</Draggable>
		</>
	);
};

ArticleQuestionDraggable.propTypes = {
	item: PropTypes.number,
	key: PropTypes.number,
	index: PropTypes.number,
	sendDataToParent: PropTypes.func.isRequired,
	initialData: PropTypes.object,
	setIsOpen: PropTypes.func,
	// WidthHeightCallback: PropTypes.func,
	handleDeleteFile: PropTypes.func,
	// initialData: PropTypes.object,
	setDisableDropdown: PropTypes.func,
	handleDeleteData: PropTypes.func,
	status: PropTypes.string,
	isEdit: PropTypes.bool
};

export default ArticleQuestionDraggable;
