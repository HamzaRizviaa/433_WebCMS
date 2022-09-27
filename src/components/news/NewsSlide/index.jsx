/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';
import {
	Accordion,
	Box,
	AccordionSummary,
	AccordionDetails
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Typography from '@mui/material/Typography';
import { useStyles as globalUseStyles } from '../../../styles/global.style';
import { useStyles } from './index.styles';
import DragAndDropField from '../../DragAndDropField';
import { useDropzone } from 'react-dropzone';
import checkFileSize from '../../../utils/validateFileSize';
import { makeid } from '../../../utils/helper';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { TextField } from '@material-ui/core';
import { ReactComponent as Union } from '../../../assets/drag.svg';
import { ReactComponent as Deletes } from '../../../assets/Delete.svg';

const NewsSlide = ({
	item,
	key,
	index,
	initialData,
	sendDataToParent,
	handleDeleteMedia,
	handleDeleteNews,
	setPreviewBool,
	setPreviewFile,
	onTranslationChange,
	getField
}) => {
	console.log(item, initialData);
	const classes = useStyles();
	const globalClasses = globalUseStyles();

	const [newFile, setNewFile] = useState(
		initialData && initialData[0]?.media_url ? [initialData[0]] : []
	);
	const [fileRejectionError, setFileRejectionError] = useState('');
	const [fileWidth, setFileWidth] = useState(0);
	const [fileHeight, setFileHeight] = useState(0);
	const [dropboxUrl, setDropboxUrl] = useState([
		initialData ? initialData?.dropbox_url || initialData[0]?.dropbox_url : ''
	]);
	const [title, setTitle] = useState(
		initialData && initialData[0] ? initialData[0]?.title : ''
	);
	const [description, setDescription] = useState(
		initialData ? initialData[0]?.description : ''
	);
	const [name, setName] = useState(initialData ? initialData[0]?.name : '');

	const [expanded, setExpanded] = useState(true);

	const imgEl = useRef(null);

	const getFileType = (type) => {
		if (type) {
			let _type = type.split('/');
			return _type && _type[1];
		}
	};

	const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
		useDropzone({
			accept: '.jpeg,.jpg,.png',
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
					type: 'image',
					width: fileWidth,
					height: fileHeight
				};
			});

			setNewFile([...newFiles]);
			sendDataToParent(...newFiles);
		}
	}, [acceptedFiles, fileHeight, fileWidth]);

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

	return (
		<div>
			<Draggable draggableId={`draggable-${index}`} index={index} key={key}>
				{(provided) => (
					<div
						ref={provided.innerRef}
						{...provided.draggableProps}
						style={{
							...provided.draggableProps.style
						}}
					>
						<div className={globalClasses.accordionRoot}>
							<Accordion expanded={expanded} style={{ marginTop: '20px' }}>
								<AccordionSummary className={classes.accordionSummary}>
									<div className={classes.leftDiv}>
										<div className={classes.grabIconDiv}>
											<span {...provided.dragHandleProps}>
												<Union
													style={{ cursor: 'grab' }}
													className={classes.grabIcon}
												/>
											</span>
										</div>
										<Typography className={classes.heading}>
											News Slide {index + 1}
										</Typography>
									</div>

									<Box className={classes.rightDiv}>
										<div className={classes.deleteIconDiv}>
											<Deletes
												className={classes.deleteIcon}
												onClick={() => {
													handleDeleteNews(item.sort_order);
												}}
											/>
										</div>
										<div className={classes.deleteIconDiv}>
											{expanded ? (
												<ExpandLessIcon onClick={() => setExpanded(false)} />
											) : (
												<ExpandMoreIcon onClick={() => setExpanded(true)} />
											)}
										</div>
									</Box>
								</AccordionSummary>

								<AccordionDetails>
									<div>
										<DragAndDropField
											uploadedFiles={newFile}
											handleDeleteFile={(id) => {
												setNewFile(newFile.filter((file) => file?.id !== id));
												handleDeleteMedia(item.data);
											}}
											setPreviewBool={setPreviewBool}
											setPreviewFile={setPreviewFile}
											isArticle
											imgEl={imgEl}
											imageOnload={() => {
												setFileWidth(imgEl.current.naturalWidth);
												setFileHeight(imgEl.current.naturalHeight);
											}}
										/>

										<br />

										{newFile?.length ? (
											<hr className={classes.horizontalLine} />
										) : (
											<></>
										)}

										{!newFile?.length ? (
											<section className={globalClasses.dropZoneContainer}>
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
												</div>
											</section>
										) : (
											<>
												<br />
											</>
										)}

										{fileRejectionError ? (
											<p className={globalClasses.fileRejectionError}>
												{fileRejectionError}
											</p>
										) : (
											''
										)}

										<div className={classes.socialmediaDrags}>
											<h6>DROPBOX URL</h6>
											<TextField
												value={getField(
													'dropbox_url',
													false,
													index,
													item?.data?.[0].translationId || index
												)}
												onChange={(e) => {
													setDropboxUrl(e.target.value);

													sendDataToParent({
														dropbox_url: e.target.value
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

										<div className={globalClasses.captionContainer}>
											<div className={globalClasses.characterCount}>
												<h6>TITLE</h6>
												<h6
													style={{
														color:
															title?.length >= 39 && title?.length <= 42
																? 'pink'
																: title?.length === 43
																? 'red'
																: 'white'
													}}
												>
													{title?.length}/43
												</h6>
											</div>

											<TextField
												value={getField(
													'title',
													true,
													index,
													item?.data?.[0].translationId || index
												)}
												onChange={(e) => {
													setTitle(e.target.value);
													// sendDataToParent({
													// 	title: e.target.value
													// });
													onTranslationChange(
														'title',
														e.target.value,
														true,
														index,
														item?.data?.[0].translationId || index
													);
												}}
												placeholder={'Please write your title here'}
												className={classes.textField}
												InputProps={{
													disableUnderline: true,
													className: classes.textFieldInput
												}}
												inputProps={{ maxLength: 43 }}
												multiline
												maxRows={2}
											/>
										</div>

										<div className={globalClasses.captionContainer}>
											<div className={globalClasses.characterCount}>
												<h6>DESCRIPTION</h6>
												<h6
													style={{
														color:
															description?.length >= 230 &&
															description?.length <= 249
																? 'pink'
																: description?.length === 250
																? 'red'
																: 'white'
													}}
												>
													{description?.length}/250
												</h6>
											</div>

											<TextField
												value={getField(
													'description',
													true,
													index,
													item?.data?.[0].translationId || index
												)}
												onChange={(e) => {
													setDescription(e.target.value);
													// sendDataToParent({
													// 	description: e.target.value
													// });
													onTranslationChange(
														'description',
														e.target.value,
														true,
														index,
														item?.data?.[0].translationId || index
													);
												}}
												placeholder={'Please write your DESCRIPTION here'}
												className={classes.textField}
												InputProps={{
													disableUnderline: true,
													className: classes.textFieldInput
												}}
												inputProps={{ maxLength: 250 }}
												multiline
												minRows={3}
												maxRows={4}
											/>
										</div>

										<div className={globalClasses.captionContainer}>
											<div className={globalClasses.characterCount}>
												<h6>NAME</h6>
												<h6
													style={{
														color:
															name?.length >= 30 && name?.length <= 49
																? 'pink'
																: name?.length === 50
																? 'red'
																: 'white'
													}}
												>
													{name?.length}/50
												</h6>
											</div>

											<TextField
												value={name}
												onChange={(e) => {
													setName(e.target.value);
													sendDataToParent({
														name: e.target.value
													});
												}}
												placeholder={'Please write the topic name here'}
												className={classes.textField}
												InputProps={{
													disableUnderline: true,
													className: classes.textFieldInput
												}}
												inputProps={{ maxLength: 50 }}
												multiline
												maxRows={2}
											/>
										</div>
									</div>
								</AccordionDetails>
							</Accordion>
						</div>
					</div>
				)}
			</Draggable>
		</div>
	);
};

NewsSlide.propTypes = {
	item: PropTypes.number,
	key: PropTypes.number,
	index: PropTypes.number,
	initialData: PropTypes.object,
	sendDataToParent: PropTypes.func.isRequired,
	handleDeleteMedia: PropTypes.func,
	handleDeleteNews: PropTypes.func,
	setPreviewBool: PropTypes.func.isRequired,
	setPreviewFile: PropTypes.func.isRequired,
	onTranslationChange: PropTypes.func.isRequired,
	getField: PropTypes.func.isRequired
};

export default NewsSlide;
