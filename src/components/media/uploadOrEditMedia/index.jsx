import React, { useState, useEffect } from 'react';
import classes from './_uploadOrEditMedia.module.scss';
import PropTypes from 'prop-types';
import Slider from '../../slider';
import Button from '../../button';
import LoadingOverlay from 'react-loading-overlay';
import { MenuItem, Select } from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { useDropzone } from 'react-dropzone';
import { makeid } from '../../../utils/helper';

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
	const [uploadMediaError, setUploadMediaError] = useState('');
	const [dropZoneBorder, setDropZoneBorder] = useState('#ffff00');
	const [fileRejectionError, setFileRejectionError] = useState('');
	const [mainCategoryLabelColor, setMainCategoryLabelColor] =
		useState('#ffffff');
	const [mainCategoryError, setMainCategoryError] = useState('');

	const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
		useDropzone({
			accept: 'video/mp4',
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

	const resetState = () => {
		setMainCategory('');
		setSubCategory('');
		setUploadedFiles([]);
		setUploadMediaError('');
		setDropZoneBorder('#ffff00');
		setFileRejectionError('');
		setMainCategoryLabelColor('#ffffff');
		setMainCategoryError('');
	};

	const handleDeleteFile = (id) => {
		setUploadedFiles((uploadedFiles) =>
			uploadedFiles.filter((file) => file.id !== id)
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
		if (!mainCategory) {
			setMainCategoryLabelColor('#ff355a');
			setMainCategoryError('You need to select main category');
			setTimeout(() => {
				setMainCategoryLabelColor('#ffffff');
				setMainCategoryError('');
			}, [5000]);
		}
	};

	const addMediaBtnDisabled = !uploadedFiles.length || !mainCategory;

	return (
		<Slider
			open={open}
			handleClose={() => {
				handleClose();
			}}
			title={title}
		>
			<LoadingOverlay spinner text='Loading...'>
				<div className={classes.contentWrapper}>
					<div>
						<h5>{heading1}</h5>
						<div className={classes.categoryContainer}>
							<div className={classes.mainCategory}>
								<h6 style={{ color: mainCategoryLabelColor }}>MAIN CATEGORY</h6>
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
									<MenuItem value={'Watch'}>Watch</MenuItem>
									<MenuItem value={'Listen'}>Listen</MenuItem>
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
											<AddCircleOutlineIcon className={classes.addFilesIcon} />
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
							</>
						) : (
							<></>
						)}

						<p className={classes.fileRejectionError}>{fileRejectionError}</p>
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
