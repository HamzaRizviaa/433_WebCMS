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
import { getMedia } from '../../posts/uploadOrEditPost/mediaDropdownSlice';
import captureVideoFrame from 'capture-video-frame';
import Close from '@material-ui/icons/Close';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ReactComponent as EyeIcon } from '../../../assets/Eye.svg';
import { ReactComponent as MusicIcon } from '../../../assets/Music.svg';

const UploadOrEditMedia = ({
	open,
	handleClose,
	title,
	heading1,
	buttonText,
	isEdit
}) => {
	const [mainCategory, setMainCategory] = useState('');
	const [subCategory, setSubCategory] = useState('');
	const [subCategories, setSubCategories] = useState([]);
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
	const [isLoadingUploadMedia, setIsLoadingUploadMedia] = useState(false);
	const [mediaButtonStatus, setMediaButtonStatus] = useState(false);

	const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
		useDropzone({
			accept: `${
				mainCategory === 'Watch' ? 'video/mp4' : 'audio/mp3, audio/mpeg'
			}`,
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

	const updateSubCategories = async (mainCategory) => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_API_ENDPOINT}/media/get-sub-categories/${mainCategory}`
			);
			if (response?.data?.result?.length) {
				setSubCategories([...response.data.result]);
			} else {
				setSubCategories([]);
			}
		} catch (error) {
			console.log({ error });
		}
	};

	useEffect(() => {
		if (mainCategory) {
			updateSubCategories(mainCategory);
		}
	}, [mainCategory]);

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
		setMediaButtonStatus(false);
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

	const uploadMedia = async (id, mediaFiles = []) => {
		setMediaButtonStatus(true);
		try {
			const result = await axios.post(
				`${process.env.REACT_APP_API_ENDPOINT}/media/create-media`,
				{
					media_type: mainCategory,
					sub_category: subCategory,
					title: title,
					description: description,
					data: {
						file_name: mediaFiles[0].file_name,
						imageData: mediaFiles[1].media_url,
						...(mainCategory === 'Watch'
							? { videoData: mediaFiles[0].media_url, audioData: '' }
							: { audioData: mediaFiles[0].media_url, videoData: '' })
					}
				}
			);
			if (result?.data?.status === 200) {
				toast.success('Media has been uploaded!');
				setIsLoadingUploadMedia(false);
				setMediaButtonStatus(false);
				dispatch(getMedia());
				handleClose();
			}
		} catch (e) {
			toast.error('Failed to create media!');
			setIsLoadingUploadMedia(false);
			setMediaButtonStatus(false);
			console.log(e);
		}
	};

	const uploadFileToServer = async (file) => {
		try {
			const result = await axios.post(
				`${process.env.REACT_APP_API_ENDPOINT}/media-upload/get-signed-url`,
				{
					fileType: file.fileExtension,
					parts: 1
				}
			);

			if (result?.data?.result?.url) {
				const _result = await axios.put(
					result?.data?.result?.url,
					file.file,
					//cropMe(uploadedFiles.file), //imp -- function to call to check landscape, square, portrait
					{
						headers: { 'Content-Type': file.mime_type }
					}
				);
				const frame = captureVideoFrame('my-video', 'png');
				if (result?.data?.result?.videoThumbnailUrl) {
					await axios.put(result?.data?.result?.videoThumbnailUrl, frame.blob, {
						headers: { 'Content-Type': 'image/png' }
					});
				}
				if (_result?.status === 200) {
					const uploadResult = await axios.post(
						`${process.env.REACT_APP_API_ENDPOINT}/media-upload/complete-upload`,
						{
							file_name: file.file.name,
							type: 'postlibrary',
							data: {
								Bucket: 'media',
								MultipartUpload:
									file?.mime_type == 'video/mp4'
										? [
												{
													ETag: _result?.headers?.etag.replace(/['"]+/g, ''),
													PartNumber: 1
												}
										  ]
										: ['image'],
								Keys: {
									ImageKey: result?.data?.result?.Keys?.ImageKey,
									VideoKey: result?.data?.result?.Keys?.VideoKey,
									AudioKey: ''
								},
								UploadId:
									file?.mime_type == 'video/mp4'
										? result?.data?.result?.UploadId
										: 'image'
							}
						}
					);
					if (uploadResult?.data?.status === 200) {
						return uploadResult.data.result;
					} else {
						throw 'Error';
					}
				} else {
					throw 'Error';
				}
			} else {
				throw 'Error';
			}
		} catch (error) {
			console.log('Error');
			return null;
		}
	};

	const addMediaBtnDisabled =
		!uploadedFiles.length ||
		!mainCategory ||
		!uploadedCoverImage.length ||
		!titleMedia ||
		mediaButtonStatus;

	return (
		<Slider
			open={open}
			handleClose={() => {
				handleClose();
				if (uploadedFiles.length && !isEdit) {
					uploadedFiles.map((file) => handleDeleteFile(file.id));
				}
				if (uploadedCoverImage.length && !isEdit) {
					uploadedCoverImage.map((file) => handleDeleteFile2(file.id));
				}
			}}
			title={title}
		>
			<LoadingOverlay active={isLoadingUploadMedia} spinner text='Loading...'>
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
										disabled={isEdit ? true : false}
										style={{ backgroundColor: isEdit ? '#404040' : '#000000' }}
										value={mainCategory}
										onChange={(e) => {
											setMainCategory(e.target.value);
											setMainCategoryLabelColor('#ffffff');
											setMainCategoryError('');
											if (uploadedFiles.length) {
												uploadedFiles.map((file) => handleDeleteFile(file.id));
											}
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
										displayEmpty={true}
										renderValue={(value) =>
											value?.length
												? Array.isArray(value)
													? value.join(', ')
													: value
												: 'Please Select'
										}
									>
										{/* <MenuItem disabled value=''>
											Please Select
										</MenuItem> */}
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
										disabled={!mainCategory || isEdit ? true : false}
										style={{ backgroundColor: isEdit ? '#404040' : '#000000' }}
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
										displayEmpty={mainCategory ? true : false}
										renderValue={(value) =>
											value?.length
												? Array.isArray(value)
													? value.join(', ')
													: value
												: 'Please Select'
										}
									>
										{/* <MenuItem disabled value=''>
											Please Select
										</MenuItem> */}
										{subCategories.map((category, index) => {
											return (
												<MenuItem key={index} value={category}>
													{category}
												</MenuItem>
											);
										})}
									</Select>
								</div>
							</div>
							<p className={classes.uploadMediaError}>{mainCategoryError}</p>

							{mainCategory || isEdit ? (
								<>
									<h5>{isEdit ? 'Media File' : 'Add Media File'}</h5>
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
																				poster={isEdit ? file.img : null}
																				className={classes.fileThumbnail}
																				style={{ objectFit: 'cover' }}
																			>
																				<source src={file.img} />
																			</video>
																		</>
																	) : (
																		<>
																			<MusicIcon className={classes.playIcon} />
																			<img
																				//src={file.img}

																				className={classes.fileThumbnail}
																			/>
																		</>
																	)}

																	<p className={classes.fileName}>
																		{file.fileName}
																	</p>
																</div>

																<div className={classes.filePreviewRight}>
																	{isEdit ? (
																		<></>
																	) : (
																		<DeleteIcon
																			className={classes.filePreviewIcons}
																			onClick={() => {
																				handleDeleteFile(file.id);
																			}}
																		/>
																	)}
																</div>
															</div>
														);
													})}
													{provided.placeholder}
												</div>
											)}
										</Droppable>
									</DragDropContext>
									{!uploadedFiles.length && !isEdit && (
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
													Click or drag file to this area to upload
												</p>
												<p className={classes.formatMsg}>
													{mainCategory === 'Watch'
														? 'Supported format is mp4'
														: 'Supported format is mp3'}
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

									<h5>{isEdit ? 'Cover Image' : 'Add Cover Image'}</h5>
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
																	{isEdit ? (
																		<EyeIcon
																			className={classes.filePreviewIcons}
																			onClick={() => setPreviewFile(file)}
																		/>
																	) : (
																		<>
																			<EyeIcon
																				className={classes.filePreviewIcons}
																				onClick={() => setPreviewFile(file)}
																			/>
																			<DeleteIcon
																				className={classes.filePreviewIcons}
																				onClick={() => {
																					handleDeleteFile2(file.id);
																				}}
																			/>{' '}
																		</>
																	)}
																</div>
															</div>
														);
													})}
													{provided.placeholder}
												</div>
											)}
										</Droppable>
									</DragDropContext>
									{!uploadedCoverImage.length && !isEdit && (
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
													Click or drag file to this area to upload
												</p>
												<p className={classes.formatMsg}>
													Supported formats are jpeg, png
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
							{isEdit ? (
								<div className={classes.editBtn}>
									<Button
										disabled={false}
										button2={isEdit ? true : false}
										onClick={() => {
											// if (!deleteBtnStatus) {
											// 	deletePost(specificPost?.id);
											// }
										}}
										text={'DELETE MEDIA'}
									/>
								</div>
							) : (
								<></>
							)}

							<div
								className={
									isEdit ? classes.addMediaBtnEdit : classes.addMediaBtn
								}
							>
								<Button
									disabled={addMediaBtnDisabled}
									onClick={() => {
										if (addMediaBtnDisabled) {
											validatePostBtn();
										} else {
											setMediaButtonStatus(true);
											setIsLoadingUploadMedia(true);
											let uploadFilesPromiseArray = [
												uploadedFiles[0],
												uploadedCoverImage[0]
											].map(async (_file) => {
												return uploadFileToServer(_file);
											});
											Promise.all([...uploadFilesPromiseArray])
												.then((mediaFiles) => {
													uploadMedia(null, mediaFiles);
												})
												.catch(() => {
													setIsLoadingUploadMedia(false);
												});
										}
									}}
									text={buttonText}
								/>
							</div>
						</div>
					</div>
					{previewFile != null && (
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
										width: `${8 * 4}rem`,
										height: `${8 * 4}rem`,
										objectFit: 'cover',
										objectPosition: 'center'
									}}
								/>
							</div>
						</div>
					)}
				</div>
			</LoadingOverlay>
		</Slider>
	);
};

UploadOrEditMedia.propTypes = {
	open: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
	isEdit: PropTypes.bool.isRequired,
	title: PropTypes.string.isRequired,
	heading1: PropTypes.string.isRequired,
	buttonText: PropTypes.string.isRequired
};

export default UploadOrEditMedia;
