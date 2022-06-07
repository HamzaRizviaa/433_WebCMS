/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
// import Close from '@material-ui/icons/Close';
import { useStyles } from './index.style';
import { useDropzone } from 'react-dropzone';
import checkFileSize from '../../utils/validateFileSize';
import { useStyles as globalUseStyles } from '../../styles/global.style';
import { ReactComponent as Union } from '../../assets/drag.svg';
import { ReactComponent as Deletes } from '../../assets/Delete.svg';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DragAndDropField from '../DragAndDropField';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { makeid } from '../../utils/helper';

const ArticleMediaDraggable = ({
	item,
	key,
	index,
	sendFileToParent,
	setIsOpen,
	WidthHeightCallback,
	handleDeleteFile,
	initialData
}) => {
	const classes = useStyles();
	const globalClasses = globalUseStyles();
	const [clickExpandIcon, setClickExpandIcon] = useState(item?.isOpen);
	const [fileRejectionError, setFileRejectionError] = useState('');
	const [fileWidth, setFileWidth] = useState(0);
	const [fileHeight, setFileHeight] = useState(0);
	const [newFile, setNewFile] = useState(initialData ? [initialData] : []);

	const imgEl = useRef(null);

	const getFileType = (type) => {
		if (type) {
			let _type = type.split('/');
			return _type && _type[1];
		}
	};

	const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
		useDropzone({
			accept: '.jpeg,.jpg,.png,video/mp4',
			maxFiles: 1,
			validator: checkFileSize
		});

	useEffect(() => {
		if (acceptedFiles?.length) {
			let newFiles = acceptedFiles.map((file) => {
				let id = makeid(10);
				return {
					id: id,
					file_name: file.name,
					media_url: URL.createObjectURL(file),
					fileExtension: `.${getFileType(file.type)}`,
					mime_type: file.type,
					file: file,
					type: file.type === 'video/mp4' ? 'video' : 'image'
				};
			});
			WidthHeightCallback(fileHeight, fileWidth);
			setNewFile([...newFiles]);
			sendFileToParent(newFiles);
		}
	}, [acceptedFiles]);

	useEffect(() => {
		if (fileRejections.length) {
			fileRejections.forEach(({ errors }) => {
				return errors.forEach((e) => setFileRejectionError(e.message));
			});
			setTimeout(() => {
				setFileRejectionError('');
			}, [5000]);
		}
	}, [fileRejections]);

	const clickExpand = () => {
		setClickExpandIcon(!clickExpandIcon);
		setIsOpen(!clickExpandIcon);
	};

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
								<div>
									<DragAndDropField
										uploadedFiles={newFile}
										handleDeleteFile={(id) => {
											setNewFile(newFile.filter((file) => file?.id !== id));
											handleDeleteFile(id);
										}}
										isArticle
										isArticleNew
										imgEl={imgEl}
										imageOnload={() => {
											setFileWidth(imgEl.current.naturalWidth);
											setFileHeight(imgEl.current.naturalHeight);
										}}
									/>
									{!newFile?.length ? (
										<section
											className={globalClasses.dropZoneContainer}
											// style={{
											// 	borderColor: isError.uploadedFiles ? '#ff355a' : 'yellow'
											// }}
										>
											<div
												{...getRootProps({
													className: globalClasses.dropzone
												})}
											>
												<input {...getInputProps()} />
												<AddCircleOutlineIcon
													className={globalClasses.addFilesIcon}
												/>
												<p className={globalClasses.dragMsg}>
													Click or drag files to this area to upload
												</p>
												<p className={globalClasses.formatMsg}>
													Supported formats are jpeg and png
												</p>
												{/* <p className={globalClasses.uploadMediaError}>
							{isError.uploadedFiles
								? 'You need to upload a media in order to post'
								: ''}
						</p> */}
											</div>
										</section>
									) : (
										<>
											<br />
										</>
									)}

									<p className={globalClasses.fileRejectionError}>
										{fileRejectionError}
									</p>
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

ArticleMediaDraggable.propTypes = {
	item: PropTypes.number,
	key: PropTypes.number,
	index: PropTypes.number,
	sendFileToParent: PropTypes.func.isRequired,
	WidthHeightCallback: PropTypes.func,
	handleDeleteFile: PropTypes.func,
	initialData: PropTypes.object,
	setIsOpen: PropTypes.func
};

export default ArticleMediaDraggable;
