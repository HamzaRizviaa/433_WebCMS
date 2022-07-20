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
//tinymce
import { Editor } from '@tinymce/tinymce-react';
import 'tinymce/tinymce';
import 'tinymce/icons/default';
import 'tinymce/themes/silver';
import 'tinymce/plugins/paste';
import 'tinymce/plugins/link';
import 'tinymce/plugins/image';
import 'tinymce/plugins/searchreplace';
import 'tinymce/plugins/hr';
import 'tinymce/plugins/anchor';
import 'tinymce/plugins/wordcount';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/textcolor';
import 'tinymce/plugins/colorpicker';
import 'tinymce/plugins/fullscreen';
import 'tinymce/plugins/charmap';
import 'tinymce/skins/ui/oxide/skin.min.css';
import 'tinymce/skins/ui/oxide/content.min.css';
import 'tinymce/skins/content/default/content.min.css';
import {
	TabPanelUnstyled,
	TabsListUnstyled,
	TabsUnstyled,
	TabUnstyled
} from '@mui/material';
import UploadOrEditQuiz from '../../quizzes/uploadOrEditQuiz/UploadOrEditQuiz';

const ArticleQuestionDraggable = ({
	item,
	key,
	index,
	sendDataToParent,
	setIsOpen,
	initialData,
	// WidthHeightCallback,
	handleDeleteFile,
	setDisableDropdown
}) => {
	const classes = useStyles();
	const [clickExpandIcon, setClickExpandIcon] = useState(item?.isOpen);
	const [description, setDescription] = useState('');
	const [previewBool, setPreviewBool] = useState(false);
	const [previewFile, setPreviewFile] = useState(null);
	const previewRef = useRef(null);

	const clickExpand = () => {
		setClickExpandIcon(!clickExpandIcon);
		setIsOpen(!clickExpandIcon);
	};

	console.log(description, 'desss');

	useEffect(() => {
		if (initialData?.description) {
			setTimeout(() => {
				let editorbyId =
					tinymce?.get(`text-${item.sortOrder}_ifr`) ||
					tinymce?.get(`text-${item.sortOrder}`);
				setDescription(editorbyId?.setContent(initialData?.description));
			}, 1000);
		}
	}, [clickExpandIcon]);

	const handleEditorChange = () => {
		const editorTextContent = tinymce
			?.get(`text-${item.sortOrder}`)
			?.getContent();
		const textContent = tinymce
			?.get(`text-${item.sortOrder}`)
			?.getContent({ format: 'text' });
		setDescription(editorTextContent);
		if (textContent === '') {
			sendDataToParent([{ description: '' }]);
		} else {
			sendDataToParent([{ description: editorTextContent }]);
		}
		// setEditorTextChecker(editorTextContent); // to check yellow button condition
	};

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
						<div className={muiClasses.root}>
							<TabsUnstyled defaultValue={0} className={muiClasses.tabRoot}>
								<TabsListUnstyled
									className={muiClasses.tabMainDiv}
									style={{ width: previewBool ? '60%' : '100%' }}
								>
									<TabUnstyled>Add Poll</TabUnstyled>
									<TabUnstyled>Add Quiz</TabUnstyled>
								</TabsListUnstyled>
								<TabPanelUnstyled value={0}>
									<UploadOrEditQuiz
										setPreviewBool={setPreviewBool}
										previewFile={previewFile}
										setPreviewFile={setPreviewFile}
										previewRef={previewRef}
										setDisableDropdown={setDisableDropdown}
										handleClose={() => {
											handleClose();
										}}
										type='poll'
									/>
								</TabPanelUnstyled>
								<TabPanelUnstyled value={1}>
									<UploadOrEditQuiz
										quiz={true}
										setPreviewBool={setPreviewBool}
										previewFile={previewFile}
										setPreviewFile={setPreviewFile}
										previewRef={previewRef}
										setDisableDropdown={setDisableDropdown}
										handleClose={() => {
											handleClose();
										}}
										type='quiz'
									/>
								</TabPanelUnstyled>
							</TabsUnstyled>
						</div>
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
	setDisableDropdown: PropTypes.func
};

export default ArticleQuestionDraggable;
