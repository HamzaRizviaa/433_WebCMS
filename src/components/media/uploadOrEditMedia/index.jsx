import React, { useState, useEffect } from 'react';
import classes from './_uploadOrEditMedia.module.scss';
import PropTypes from 'prop-types';
import Slider from '../../slider';
import Button from '../../button';
import LoadingOverlay from 'react-loading-overlay';
import { MenuItem, TextField, Select } from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { useDropzone } from 'react-dropzone';
import { makeid } from '../../../utils/helper';
import { useDispatch, useSelector } from 'react-redux';
import { getMainCategories } from './uploadOrEditMediaSlice';
//import Close from '@material-ui/icons/Close';

import { ReactComponent as EyeIcon } from '../../../assets/Eye.svg';

const UploadOrEditMedia = ({
	open,
	handleClose,
	title,
	heading1,
	buttonText
}) => {
	const [mainCategory, setMainCategory] = useState('');
	const [subCategory, setSubCategory] = useState('');
	const [uploadedFiles, setUploadedFiles] = useState([]);
	const [uploadedCoverImage, setUploadedCoverImage] = useState([]);
	const [uploadMediaError, setUploadMediaError] = useState('');
	const [dropZoneBorder, setDropZoneBorder] = useState('#ffff00');
	const [fileRejectionError, setFileRejectionError] = useState('');
	const [uploadCoverError, setUploadCoverError] = useState('');
	const [dropZoneBorder2, setDropZoneBorder2] = useState('#ffff00');
	const [fileRejectionError2, setFileRejectionError2] = useState('');
	const [mainCategoryLabelColor, setMainCategoryLabelColor] =
		useState('#ffffff');
	const [mainCategoryError, setMainCategoryError] = useState('');
	const [titleMedia, setTitleMedia] = useState('');
	const [titleMediaLabelColor, setTitleMediaLabelColor] = useState('#ffffff');
	const [titleMediaError, setTitleMediaError] = useState('');
	const [description, setDescription] = useState('');
	const [previewFile, setPreviewFile] = useState(null);

	const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
		useDropzone({
			accept: 'video/mp4',
			maxFiles: 1
		});
	const dispatch = useDispatch();
	const mainCategories = useSelector(
		(state) => state.mediaLibrary.mainCategories
	);
	useEffect(() => {
		dispatch(getMainCategories());
	}, []);

	const {
		acceptedFiles: acceptedFiles2,
		fileRejections: fileRejections2,
		getRootProps: getRootProps2,
		getInputProps: getInputProps2
	} = useDropzone({
		accept: 'image/jpeg, image/png',
		maxFiles: 1
	});

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
		if (fileRejections2.length) {
			setFileRejectionError2('The uploaded file format is not matching');
			setTimeout(() => {
				setFileRejectionError2('');
			}, [5000]);
		}
	}, [fileRejections2]);

	const getFileType = (type) => {
		if (type) {
			let _type = type.split('/');
			return _type && _type[1];
		}
	};

	useEffect(() => {
		if (acceptedFiles?.length) {
			setUploadMediaError('');
			setDropZoneBorder('#ffff00');
			let newFiles = acceptedFiles.map((file) => {
				let id = makeid(10);
				return {
					id: id,
					fileName: file.name,
					img: URL.createObjectURL(file),
					fileExtension: `.${getFileType(file.type)}`,
					mime_type: file.type,
					file: file,
					type: file.type === 'video/mp4' ? 'video' : 'image'
				};
			});
			setUploadedFiles([...uploadedFiles, ...newFiles]);
		}
	}, [acceptedFiles]);

	useEffect(() => {
		if (acceptedFiles2?.length) {
			setUploadCoverError('');
			setDropZoneBorder2('#ffff00');
			let newFiles = acceptedFiles2.map((file) => {
				let id = makeid(10);
				return {
					id: id,
					fileName: file.name,
					img: URL.createObjectURL(file),
					fileExtension: `.${getFileType(file.type)}`,
					mime_type: file.type,
					file: file,
					type: file.type === 'video/mp4' ? 'video' : 'image'
				};
			});
			setUploadedCoverImage([...uploadedCoverImage, ...newFiles]);
		}
	}, [acceptedFiles2]);

	const resetState = () => {
		setMainCategory('');
		setSubCategory('');
		setUploadedFiles([]);
		setUploadedCoverImage([]);
		setUploadMediaError('');
		setUploadCoverError('');
		setDropZoneBorder('#ffff00');
		setDropZoneBorder2('#ffff00');
		setFileRejectionError('');
		setFileRejectionError2('');
		setMainCategoryLabelColor('#ffffff');
		setTitleMediaLabelColor('#ffffff');
		setTitleMediaError('');
		setMainCategoryError('');
		setTitleMedia('');
		setDescription('');
		setPreviewFile(null);
	};

	const handleDeleteFile = (id) => {
		setUploadedFiles((uploadedFiles) =>
			uploadedFiles.filter((file) => file.id !== id)
		);
	};

	const handleDeleteFile2 = (id) => {
		setUploadedCoverImage((uploadedCoverImage) =>
			uploadedCoverImage.filter((file) => file.id !== id)
		);
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
		if (uploadedCoverImage.length < 1) {
			setDropZoneBorder2('#ff355a');
			setUploadCoverError('You need to upload a cover in order to post');
			setTimeout(() => {
				setDropZoneBorder2('#ffff00');
				setUploadCoverError('');
			}, [5000]);
		}
		if (!mainCategory) {
			setMainCategoryLabelColor('#ff355a');
			setMainCategoryError('You need to select main category');
			setTimeout(() => {
				setMainCategoryLabelColor('#ffffff');
				setMainCategoryError('');
			}, [5000]);
		}
		if (!titleMedia) {
			setTitleMediaLabelColor('#ff355a');
			setTitleMediaError('You need to enter a Title');
			setTimeout(() => {
				setTitleMediaLabelColor('#ffffff');
				setTitleMediaError('');
			}, [5000]);
		}
	};

	const addMediaBtnDisabled =
		!uploadedFiles.length ||
		!mainCategory ||
		!uploadedCoverImage.length ||
		!titleMedia;

	return (
		<Slider
			open={open}
			handleClose={() => {
				handleClose();
				if (uploadedFiles.length) {
					uploadedFiles.map((file) => handleDeleteFile(file.id));
				}
				if (uploadedCoverImage.length) {
					uploadedCoverImage.map((file) => handleDeleteFile(file.id));
				}
			}}
			title={title}
		>
			<LoadingOverlay spinner text='Loading...'>
				<div
					className={`${
						previewFile != null
							? classes.previewContentWrapper
							: classes.contentWrapper
					}`}
				>
					<div
						className={classes.contentWrapperNoPreview}
						style={{ width: previewFile != null ? '60%' : 'auto' }}
					>
						<div>
							<h5>{heading1}</h5>
							<div className={classes.categoryContainer}>
								<div className={classes.mainCategory}>
									<h6 style={{ color: mainCategoryLabelColor }}>
										MAIN CATEGORY
									</h6>
									<Select
										value={mainCategory}
										onChange={(e) => {
											setMainCategory(e.target.value);
											setMainCategoryLabelColor('#ffffff');
											setMainCategoryError('');
										}}
										className={`${classes.select}`}
										disableUnderline={true}
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
										{mainCategories.map((category, index) => {
											return (
												<MenuItem key={index} value={category}>
													{category}
												</MenuItem>
											);
										})}
									</Select>
								</div>
								<div className={classes.subCategory}>
									<h6>SUB CATEGORY</h6>
									<Select
										disabled={mainCategory ? false : true}
										value={subCategory}
										onChange={(e) => setSubCategory(e.target.value)}
										className={`${classes.select}`}
										disableUnderline={true}
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
										{mainCategory === 'Watch' ? (
											<MenuItem value={'Funny Clips'}>Funny Clips</MenuItem>
										) : (
											<MenuItem value={'Football Players'}>
												Football Players
											</MenuItem>
										)}
									</Select>
								</div>
							</div>
							<p className={classes.uploadMediaError}>{mainCategoryError}</p>

							{mainCategory ? (
								<>
									<h5>Add Media File</h5>
									<DragDropContext>
										<Droppable droppableId='droppable-1'>
											{(provided) => (
												<div
													{...provided.droppableProps}
													ref={provided.innerRef}
													className={classes.uploadedFilesContainer}
												>
													{uploadedFiles.map((file, index) => {
														return (
															<div
																key={index}
																className={classes.filePreview}
																ref={provided.innerRef}
															>
																<div className={classes.filePreviewLeft}>
																	{file.type === 'video' ? (
																		<>
																			<video
																				id={'my-video'}
																				//poster={isEdit ? file.img : null}
																				className={classes.fileThumbnail}
																				style={{ objectFit: 'cover' }}
																			>
																				<source src={file.img} />
																			</video>
																		</>
																	) : (
																		<>
																			<img
																				src={file.img}
																				className={classes.fileThumbnail}
																			/>
																		</>
																	)}

																	<p className={classes.fileName}>
																		{file.fileName}
																	</p>
																</div>

																<div className={classes.filePreviewRight}>
																	<DeleteIcon
																		className={classes.filePreviewIcons}
																		onClick={() => {
																			handleDeleteFile(file.id);
																		}}
																	/>
																</div>
															</div>
														);
													})}
													{provided.placeholder}
												</div>
											)}
										</Droppable>
									</DragDropContext>
									{!uploadedFiles.length && (
										<section
											className={classes.dropZoneContainer}
											style={{
												borderColor: dropZoneBorder
											}}
										>
											<div {...getRootProps({ className: classes.dropzone })}>
												<input {...getInputProps()} />
												<AddCircleOutlineIcon
													className={classes.addFilesIcon}
												/>
												<p className={classes.dragMsg}>
													Click or drag files to this area to upload
												</p>
												<p className={classes.formatMsg}>
													Supported format is mp4
												</p>
												<p className={classes.uploadMediaError}>
													{uploadMediaError}
												</p>
											</div>
										</section>
									)}

									<p className={classes.fileRejectionError}>
										{fileRejectionError}
									</p>

									<h5>Add Cover Image</h5>
									<DragDropContext>
										<Droppable droppableId='droppable-2'>
											{(provided) => (
												<div
													{...provided.droppableProps}
													ref={provided.innerRef}
													className={classes.uploadedFilesContainer}
												>
													{uploadedCoverImage.map((file, index) => {
														return (
															<div
																key={index}
																className={classes.filePreview}
																ref={provided.innerRef}
															>
																<div className={classes.filePreviewLeft}>
																	{file.type === 'video' ? (
																		<>
																			<video
																				id={'my-video'}
																				//poster={isEdit ? file.img : null}
																				className={classes.fileThumbnail}
																				style={{ objectFit: 'cover' }}
																			>
																				<source src={file.img} />
																			</video>
																		</>
																	) : (
																		<>
																			<img
																				src={file.img}
																				className={classes.fileThumbnail}
																			/>
																		</>
																	)}

																	<p className={classes.fileName}>
																		{file.fileName}
																	</p>
																</div>

																<div className={classes.filePreviewRight}>
																	<EyeIcon
																		className={classes.filePreviewIcons}
																		onClick={() => setPreviewFile(file)}
																	/>
																	<DeleteIcon
																		className={classes.filePreviewIcons}
																		onClick={() => {
																			handleDeleteFile2(file.id);
																		}}
																	/>
																</div>
															</div>
														);
													})}
													{provided.placeholder}
												</div>
											)}
										</Droppable>
									</DragDropContext>
									{!uploadedCoverImage.length && (
										<section
											className={classes.dropZoneContainer}
											style={{
												borderColor: dropZoneBorder2
											}}
										>
											<div {...getRootProps2({ className: classes.dropzone })}>
												<input {...getInputProps2()} />
												<AddCircleOutlineIcon
													className={classes.addFilesIcon}
												/>
												<p className={classes.dragMsg}>
													Click or drag files to this area to upload
												</p>
												<p className={classes.formatMsg}>
													Supported formats are jpeg,png
												</p>
												<p className={classes.uploadMediaError}>
													{uploadCoverError}
												</p>
											</div>
										</section>
									)}

									<p className={classes.fileRejectionError}>
										{fileRejectionError2}
									</p>

									<div className={classes.titleContainer}>
										<h6 style={{ color: titleMediaLabelColor }}>TITLE</h6>
										<TextField
											value={titleMedia}
											onChange={(e) => {
												setTitleMedia(e.target.value);
												setTitleMediaError('');
												setTitleMediaLabelColor('#ffffff');
											}}
											placeholder={'Please write your title here'}
											className={classes.textField}
											InputProps={{
												disableUnderline: true,
												className: classes.textFieldInput
											}}
											multiline
											maxRows={2}
										/>
									</div>
									<p className={classes.mediaError}>{titleMediaError}</p>

									<div className={classes.titleContainer}>
										<h6>DESCRIPTION</h6>
										<TextField
											value={description}
											onChange={(e) => {
												setDescription(e.target.value);
											}}
											placeholder={'Please write your description here'}
											className={classes.textField}
											InputProps={{
												disableUnderline: true,
												className: classes.textFieldInput
											}}
											multiline
											maxRows={4}
										/>
									</div>
								</>
							) : (
								<></>
							)}
						</div>
						<div className={classes.buttonDiv}>
							<div className={classes.addMediaBtn}>
								<Button
									disabled={addMediaBtnDisabled}
									onClick={() => {
										if (addMediaBtnDisabled) {
											validatePostBtn();
										} else {
											console.log('click');
										}
									}}
									text={buttonText}
								/>
							</div>
						</div>
					</div>
					{/* {previewFile != null && (
						<div className={classes.previewComponent}>
							<div className={classes.previewHeader}>
								<Close
									onClick={() => setPreviewFile(null)}
									className={classes.closeIcon}
								/>
								<h5>Preview</h5>
							</div>
							<div>
								<img
									src={previewFile.img}
									className={classes.previewFile}
									style={{
										width: `${2 * 4}px`,
										height: `${2 * 4}px`,
										objectFit: 'cover',
										objectPosition: 'center'
									}}
								/>
							</div>
						</div>
					)} */}
				</div>
			</LoadingOverlay>
		</Slider>
	);
};

UploadOrEditMedia.propTypes = {
	open: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
	//isEdit: PropTypes.bool.isRequired,
	title: PropTypes.string.isRequired,
	heading1: PropTypes.string.isRequired,
	buttonText: PropTypes.string.isRequired
};

export default UploadOrEditMedia;
