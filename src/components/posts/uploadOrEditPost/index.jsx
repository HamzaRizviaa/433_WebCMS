import React, { useState, useEffect } from 'react';
import classes from './_uploadOrEditPost.module.scss';
import { useDropzone } from 'react-dropzone';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import DeleteIcon from '@material-ui/icons/Delete';
import MenuIcon from '@material-ui/icons/Menu';
import PropTypes from 'prop-types';
import Slider from '../../slider';
import { MenuItem, TextField, Select } from '@material-ui/core';
import ToggleSwitch from '../../switch';
import Button from '../../button';
import { useDispatch, useSelector } from 'react-redux';
import { getMedia } from './mediaDropdownSlice';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { makeid } from '../../../utils/helper';

const UploadOrEditPost = ({ open, handleClose }) => {
	const [caption, setCaption] = useState('');
	const [value, setValue] = useState(false);
	const [uploadMediaError, setUploadMediaError] = useState('');
	const [mediaError, setMediaError] = useState('');
	const [fileRejectionError, setFileRejectionError] = useState('');
	const [uploadedFiles, setUploadedFiles] = useState([]);
	const [dropZoneBorder, setDropZoneBorder] = useState('#ffff00');
	const [mediaLabelColor, setMediaLabelColor] = useState('#ffffff');
	const [selectedMedia, setSelectedMedia] = useState(null);
	const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
		useDropzone({
			accept: 'image/jpeg, image/png, video/mp4',
			maxFiles: 10
		});

	const media = useSelector((state) => state.mediaDropdown.media);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getMedia());
		return () => {
			resetState();
		};
	}, []);

	useEffect(() => {
		if (!open) {
			resetState();
		}
	}, [open]);

	useEffect(() => {
		if (fileRejections.length) {
			setFileRejectionError('The uploaded file format is not matching');
			setTimeout(() => {
				setFileRejectionError('');
			}, [5000]);
		}
	}, [fileRejections]);

	useEffect(() => {
		if (acceptedFiles?.length) {
			setUploadMediaError('');
			setDropZoneBorder('#ffff00');
			let newFiles = acceptedFiles.map((file) => {
				if (file.type === 'video/mp4') {
					return {
						fileName: file.name,
						id: makeid(10),
						img: URL.createObjectURL(file),
						type: 'video'
					};
				} else {
					return {
						fileName: file.name,
						id: makeid(10),
						img: URL.createObjectURL(file),
						type: 'image'
					};
				}
			});
			setUploadedFiles([...uploadedFiles, ...newFiles]);
		}
	}, [acceptedFiles]);

	const resetState = () => {
		setCaption('');
		setValue(false);
		setUploadMediaError('');
		setMediaError('');
		setFileRejectionError('');
		setUploadedFiles([]);
		setDropZoneBorder('#ffff00');
		setMediaLabelColor('#ffffff');
		setSelectedMedia(null);
	};

	// a little function to help us with reordering the result
	const reorder = (list, startIndex, endIndex) => {
		const result = Array.from(list);
		const [removed] = result.splice(startIndex, 1);
		result.splice(endIndex, 0, removed);
		return result;
	};

	const onDragEnd = (result) => {
		// dropped outside the list
		if (!result.destination) {
			return;
		}

		const items = reorder(
			uploadedFiles,
			result.source.index,
			result.destination.index
		);

		setUploadedFiles(items);
	};

	const handleDeleteFile = (id) => {
		const filteredFiles = uploadedFiles.filter((file) => file.id !== id);
		setUploadedFiles(filteredFiles);
	};

	const validatePostBtn = () => {
		if (uploadedFiles.length < 1) {
			setDropZoneBorder('#ff355a');
			setUploadMediaError('You need to upload a media in order to post');
			setTimeout(() => {
				setDropZoneBorder('#ffff00');
				setUploadMediaError('');
			}, [5000]);
		}
		if (value && !selectedMedia) {
			setMediaLabelColor('#ff355a');
			setMediaError('This field is required');
			setTimeout(() => {
				setMediaLabelColor('#ffffff');
				setMediaError('');
			}, [5000]);
		}
	};

	const postBtnDisabled = !uploadedFiles.length || (value && !selectedMedia);

	return (
		<Slider open={open} handleClose={handleClose} title={'Upload a Post'}>
			<div className={classes.contentWrapper}>
				<div>
					<h5>Add Media Files</h5>
					<DragDropContext onDragEnd={onDragEnd}>
						<Droppable droppableId='droppable-1'>
							{(provided) => (
								<div
									{...provided.droppableProps}
									ref={provided.innerRef}
									className={classes.uploadedFilesContainer}
								>
									{uploadedFiles.map((file, index) => {
										return (
											<Draggable
												key={file.id}
												draggableId={`droppable-${file.id}`}
												index={index}
												isDragDisabled={uploadedFiles.length <= 1}
											>
												{(provided) => (
													<div
														key={index}
														className={classes.filePreview}
														ref={provided.innerRef}
														{...provided.draggableProps}
														style={{
															...provided.draggableProps.style
														}}
													>
														<div className={classes.filePreviewLeft}>
															{file.type === 'video' ? (
																<>
																	<PlayArrowIcon className={classes.playIcon} />
																	<video className={classes.fileThumbnail}>
																		<source src={file.img} />
																	</video>
																</>
															) : (
																<img
																	src={file.img}
																	className={classes.fileThumbnail}
																/>
															)}

															<p className={classes.fileName}>
																{file.fileName}
															</p>
														</div>
														<div className={classes.filePreviewRight}>
															<span {...provided.dragHandleProps}>
																<MenuIcon
																	style={{ cursor: 'grab' }}
																	className={classes.filePreviewIcons}
																/>
															</span>
															<DeleteIcon
																className={classes.filePreviewIcons}
																onClick={() => {
																	handleDeleteFile(file.id);
																}}
															/>
														</div>
													</div>
												)}
											</Draggable>
										);
									})}
									{provided.placeholder}
								</div>
							)}
						</Droppable>
					</DragDropContext>
					{uploadedFiles.length < 10 ? (
						<section
							className={classes.dropZoneContainer}
							style={{
								borderColor: dropZoneBorder
							}}
						>
							<div {...getRootProps({ className: classes.dropzone })}>
								<input {...getInputProps()} />
								<AddCircleOutlineIcon className={classes.addFilesIcon} />
								<p className={classes.dragMsg}>
									Click or drag files to this area to upload
								</p>
								<p className={classes.formatMsg}>
									Supported formats are jpeg, png and mp4
								</p>
								<p className={classes.uploadMediaError}>{uploadMediaError}</p>
							</div>
						</section>
					) : (
						<></>
					)}

					<p className={classes.fileRejectionError}>{fileRejectionError}</p>
					<div className={classes.captionContainer}>
						<h6>CAPTION</h6>
						<TextField
							value={caption}
							onChange={(e) => setCaption(e.target.value)}
							placeholder={'Please write your caption here'}
							className={classes.textField}
							InputProps={{
								disableUnderline: true,
								className: classes.textFieldInput
							}}
							multiline
							maxRows={4}
						/>
					</div>

					<div className={classes.postMediaContainer}>
						<div className={classes.postMediaHeader}>
							<h5>Link post to media</h5>
							<ToggleSwitch
								id={1}
								checked={value}
								onChange={(checked) => {
									setSelectedMedia(null);
									setValue(checked);
								}}
							/>
						</div>
					</div>
					{value ? (
						<div className={classes.mediaContainer}>
							<h6 style={{ color: mediaLabelColor }}>SELECT MEDIA</h6>
							<Select
								value={selectedMedia}
								onChange={(e) => {
									setMediaError(false);
									setMediaLabelColor('#ffffff');
									setSelectedMedia(e.target.value);
								}}
								disableUnderline={true}
								className={`${classes.select}`}
								IconComponent={KeyboardArrowDownIcon}
								MenuProps={{
									anchorOrigin: {
										vertical: 'bottom',
										horizontal: 'left'
									},
									transformOrigin: {
										vertical: 'top',
										horizontal: 'left'
									},
									getContentAnchorEl: null
								}}
							>
								{media.map((item, index) => (
									<MenuItem key={index} value={item.id}>
										{item.title}{' '}
										{/* <img
											src={`${process.env.REACT_APP_MEDIA_ENDPOINT}/${item.cover_image}`}
										/> */}
									</MenuItem>
								))}
							</Select>
							<p className={classes.mediaError}>{mediaError}</p>
						</div>
					) : (
						<></>
					)}
				</div>
				<div className={classes.postBtn}>
					<Button
						disabled={postBtnDisabled}
						onClick={() => {
							if (postBtnDisabled) {
								validatePostBtn();
							} else {
								console.log('POST BUTTON API');
							}
							// setShowSlider(true);
						}}
						text={'POST'}
					/>
				</div>
			</div>
		</Slider>
	);
};

UploadOrEditPost.propTypes = {
	open: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired
};

export default UploadOrEditPost;
