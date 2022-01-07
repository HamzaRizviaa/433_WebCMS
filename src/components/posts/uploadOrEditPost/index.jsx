/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import classes from './_uploadOrEditPost.module.scss';
import { useDropzone } from 'react-dropzone';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import MenuIcon from '@material-ui/icons/Menu';
import PropTypes from 'prop-types';
import Slider from '../../slider';
import { TextField } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';
import ToggleSwitch from '../../switch';
import Button from '../../button';
import { useDispatch, useSelector } from 'react-redux';
import { getMedia } from './mediaDropdownSlice';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { makeid } from '../../../utils/helper';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
	getPosts,
	getPostLabels
} from '../../../pages/PostLibrary/postLibrarySlice';
import captureVideoFrame from 'capture-video-frame';
import Close from '@material-ui/icons/Close';
// import Cropper from 'cropperjs';
// import 'cropperjs/dist/cropper.css';
import Autocomplete from '@mui/material/Autocomplete';
import ClearIcon from '@material-ui/icons/Clear';
import Chip from '@mui/material/Chip';
import { Popper, Paper } from '@mui/material';

import { ReactComponent as EyeIcon } from '../../../assets/Eye.svg';
import { ReactComponent as SquareCrop } from '../../../assets/Square.svg';
import { ReactComponent as PortraitCrop } from '../../../assets/portrait_rect.svg';
import { ReactComponent as LandscapeCrop } from '../../../assets/Rectangle_12.svg';
import { ReactComponent as SquareCropSelected } from '../../../assets/Square_selected.svg';
import { ReactComponent as PortraitCropSelected } from '../../../assets/portrait_rect_selected.svg';
import { ReactComponent as LandscapeCropSelected } from '../../../assets/Rectangle_12_selected.svg';
import { ReactComponent as Deletes } from '../../../assets/Delete.svg';

import LoadingOverlay from 'react-loading-overlay';

const UploadOrEditPost = ({
	open,
	handleClose,
	title,
	isEdit,
	heading1,
	buttonText
}) => {
	const [caption, setCaption] = useState('');
	const [value, setValue] = useState(false);
	const [uploadMediaError, setUploadMediaError] = useState('');
	const [mediaError, setMediaError] = useState('');
	const [fileRejectionError, setFileRejectionError] = useState('');
	const [uploadedFiles, setUploadedFiles] = useState([]);
	const [selectedLabels, setSelectedLabels] = useState([]);
	const [dropZoneBorder, setDropZoneBorder] = useState('#ffff00');
	const [mediaLabelColor, setMediaLabelColor] = useState('#ffffff');
	const [selectedMedia, setSelectedMedia] = useState(null);
	const [postButtonStatus, setPostButtonStatus] = useState(false);
	const [deleteBtnStatus, setDeleteBtnStatus] = useState(false);
	const [dimensionSelect, setDimensionSelect] = useState('square');
	const [isLoadingCreatePost, setIsLoadingCreatePost] = useState(false);
	const [imageToResizeWidth, setImageToResizeWidth] = useState(80);
	const [imageToResizeHeight, setImageToResizeHeight] = useState(80);
	const [previewFile, setPreviewFile] = useState(null);
	const [postLabels, setPostLabels] = useState([]);
	// const [aspect, setAspect] = useState(1 / 1);
	// const [imgDestination, setImageDestination] = useState('');
	// const imageElement = useRef();
	//const [inputValue, setInputValue] = useState('');

	//a library that takes height width input and gives cropped image

	const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
		useDropzone({
			accept: 'image/jpeg, image/png, video/mp4',
			maxFiles: 10
		});

	const media = useSelector((state) => state.mediaDropdown.media);
	const labels = useSelector((state) => state.postLibrary.labels);
	const specificPost = useSelector((state) => state.editButton.specificPost);
	const specificPostStatus = useSelector((state) => state.editButton);
	const dispatch = useDispatch();

	useEffect(() => {
		if (labels.length) {
			setPostLabels(labels.map((label) => label.name));
		}
	}, [labels]);

	useEffect(() => {
		if (specificPost) {
			setSelectedLabels(specificPost?.labels);
			setCaption(specificPost.caption);
			if (specificPost?.media_id !== null) {
				setValue(true);
				setSelectedMedia(specificPost.media_id);
			}
			if (specificPost.orientation_type === 'square') {
				setDimensionSelect('square');
				setImageToResizeWidth(80);
				setImageToResizeHeight(80);
			} else if (specificPost.orientation_type === 'portrait') {
				setDimensionSelect('portrait');
				setImageToResizeWidth(64);
				setImageToResizeHeight(80);
			} else if (specificPost.orientation_type === 'landscape') {
				setDimensionSelect('landscape');
				setImageToResizeWidth(80.22);
				setImageToResizeHeight(42);
			}
			if (specificPost?.medias) {
				let newFiles = specificPost.medias.map((file) => {
					if (file.thumbnail_url) {
						return {
							fileName: file.file_name,
							id: makeid(10),
							url: `${process.env.REACT_APP_MEDIA_ENDPOINT}/${file.url}`,
							img: `${process.env.REACT_APP_MEDIA_ENDPOINT}/${file.thumbnail_url}`,
							type: 'video'
						};
					} else {
						return {
							fileName: file.file_name,
							id: makeid(10),
							img: `${process.env.REACT_APP_MEDIA_ENDPOINT}/${file.url}`,
							type: 'image'
						};
					}
				});
				setUploadedFiles([...uploadedFiles, ...newFiles]);
			}
		}
	}, [specificPost]);

	useEffect(() => {
		dispatch(getMedia());
		dispatch(getPostLabels());
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

	const uploadFileToServer = async (uploadedFile) => {
		try {
			const result = await axios.post(
				`${process.env.REACT_APP_API_ENDPOINT}/media-upload/get-signed-url`,
				{
					fileType: uploadedFile.fileExtension,
					parts: 1
				}
			);

			if (result?.data?.result?.url) {
				const _result = await axios.put(
					result?.data?.result?.url,
					uploadedFile.file,
					//cropMe(uploadedFiles.file), //imp -- function to call to check landscape, square, portrait
					{
						headers: { 'Content-Type': uploadedFile.mime_type }
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
							file_name: uploadedFile.file.name,
							type: 'postlibrary',
							data: {
								Bucket: 'media',
								MultipartUpload:
									uploadedFile?.mime_type == 'video/mp4'
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
									uploadedFile?.mime_type == 'video/mp4'
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
		setPostButtonStatus(false);
		setDimensionSelect('square');
		setTimeout(() => {
			setDeleteBtnStatus(false);
		}, 1000);
		setImageToResizeWidth(80);
		setImageToResizeHeight(80);
		setPreviewFile(null);
		setSelectedLabels([]);
		//setImageDestination('');
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
		if (value && !selectedMedia) {
			setMediaLabelColor('#ff355a');
			setMediaError('This field is required');
			setTimeout(() => {
				setMediaLabelColor('#ffffff');
				setMediaError('');
			}, [5000]);
		}
	};

	const createPost = async (id, mediaFiles = []) => {
		setPostButtonStatus(true);
		try {
			let _labels = [];
			if (!isEdit) {
				labels.map((label) => {
					if (selectedLabels.includes(label.name)) {
						_labels.push(label);
					}
				});
			}
			const result = await axios.post(
				`${process.env.REACT_APP_API_ENDPOINT}/post/add-post`,
				{
					caption: caption,
					orientation_type: dimensionSelect,
					...(selectedMedia ? { media_id: selectedMedia } : { media_id: null }),
					...(isEdit && id ? { post_id: id } : {}),
					...(!isEdit && _labels.length ? { labels: [..._labels] } : {}),
					...(!isEdit ? { media_files: [...mediaFiles] } : {})
				}
			);
			if (result?.data?.status === 200) {
				toast.success(
					isEdit ? 'Post has been edited!' : 'Post has been created!'
				);
				setIsLoadingCreatePost(false);
				setPostButtonStatus(false);
				handleClose();
				dispatch(getPosts());
			}
		} catch (e) {
			toast.error(isEdit ? 'Failed to edit post!' : 'Failed to create post!');
			setIsLoadingCreatePost(false);
			setPostButtonStatus(false);
			console.log(e);
		}
	};

	const deletePost = async (id) => {
		setDeleteBtnStatus(true);
		try {
			const result = await axios.post(
				`${process.env.REACT_APP_API_ENDPOINT}/post/delete-post`,
				{
					post_id: id
				}
			);
			if (result?.data?.status === 200) {
				toast.success('Post has been deleted!');
				handleClose();

				//setting a timeout for getting post after delete.
				dispatch(getPosts());
			}
		} catch (e) {
			toast.error('Failed to delete post!');
			setDeleteBtnStatus(false);
			console.log(e);
		}
	};

	const squareCrop = () => {
		setDimensionSelect('square');
		setImageToResizeWidth(80);
		setImageToResizeHeight(80);
		// setAspect(1 / 1);
		//cropMe(1);
	};

	const landscapeCrop = () => {
		setDimensionSelect('landscape');
		setImageToResizeWidth(80.22);
		setImageToResizeHeight(42);
		// setAspect(1.91 / 1);
		//cropMe(1.91);
	};

	const portraitCrop = () => {
		setDimensionSelect('portrait');
		setImageToResizeWidth(64);
		setImageToResizeHeight(80);
		// setAspect(4 / 5);
		//cropMe(0.8);
	};

	// const cropMe = (asp) => {
	// 	const cropper = new Cropper(imageElement.current, {
	// 		zoomable: false,
	// 		scalable: false,
	// 		aspectRatio: asp,
	// 		background: false,
	// 		movable: false,
	// 		cropBoxMovable: false,
	// 		cropBoxResizable: false,
	// 		toggleDragModeOnDblclick: false,
	// 		dragMode: 'none',
	// 		//initialAspectRatio: asp,
	// 		// viewMode: 2,
	// 		//data :
	// 		responsive: false,
	// 		modal: false,
	// 		crop: () => {
	// 			const canvas = cropper.getCroppedCanvas();
	// 			setImageDestination(canvas.toDataURL('image/png'));
	// 		}
	// 	});
	// };

	const postBtnDisabled =
		!uploadedFiles.length || postButtonStatus || (value && !selectedMedia);

	const totalMedia = [];
	media.slice(0, 5).map((medi) => totalMedia.push(medi.title)); //gets recent first 5 elements from the list

	return (
		<Slider
			open={open}
			handleClose={() => {
				handleClose();
				if (uploadedFiles.length && !isEdit) {
					uploadedFiles.map((file) => handleDeleteFile(file.id));
				}
			}}
			title={title}
		>
			<LoadingOverlay active={isLoadingCreatePost} spinner text='Loading...'>
				<div
					className={`${
						previewFile != null
							? classes.previewContentWrapper
							: classes.contentWrapper
					}`}
				>
					{specificPostStatus.status === 'loading' ? (
						<div className={classes.loaderContainer2}>
							<CircularProgress className={classes.loader} />;
						</div>
					) : (
						<></>
					)}
					<div
						className={classes.contentWrapperNoPreview}
						style={{ width: previewFile != null ? '60%' : 'auto' }}
					>
						<div>
							{isEdit || uploadedFiles.length === 0 ? (
								<h5>{heading1}</h5>
							) : (
								<div className={classes.headerOrientationWrapper}>
									<h5>{heading1}</h5>
									<div className={classes.orientationDimensionWrapper}>
										<h6 className={classes.orientation}>Orientation</h6>
										<div className={classes.dimensionWrapper}>
											<div
												className={classes.dimensionSingle}
												onClick={squareCrop}
												style={
													dimensionSelect === 'square'
														? { backgroundColor: '#000000' }
														: {}
												}
											>
												{dimensionSelect === 'square' ? (
													<SquareCropSelected
														className={classes.dimensionPreviewIcons}
													/>
												) : (
													<SquareCrop
														className={classes.dimensionPreviewIcons}
													/>
												)}
											</div>{' '}
											<div
												className={classes.dimensionSingle}
												onClick={portraitCrop}
												style={
													dimensionSelect === 'portrait'
														? { backgroundColor: '#000000' }
														: {}
												}
											>
												{dimensionSelect === 'portrait' ? (
													<PortraitCropSelected
														className={classes.dimensionPreviewIcons}
													/>
												) : (
													<PortraitCrop
														className={classes.dimensionPreviewIcons}
													/>
												)}
											</div>
											<div
												className={classes.dimensionSingle}
												onClick={landscapeCrop}
												style={
													dimensionSelect === 'landscape'
														? { backgroundColor: '#000000' }
														: {}
												}
											>
												{dimensionSelect === 'landscape' ? (
													<LandscapeCropSelected
														className={classes.dimensionPreviewIcons}
													/>
												) : (
													<LandscapeCrop
														className={classes.dimensionPreviewIcons}
													/>
												)}
											</div>
										</div>
									</div>
								</div>
							)}

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
																			<PlayArrowIcon
																				className={
																					dimensionSelect === 'portrait'
																						? classes.playIconPortrait
																						: classes.playIcon
																				}
																			/>
																			<video
																				id={'my-video'}
																				poster={isEdit ? file.img : null}
																				className={classes.fileThumbnail}
																				style={{
																					maxWidth: `${imageToResizeWidth}px`,
																					maxHeight: `${imageToResizeHeight}px`,
																					objectFit: 'cover',
																					objectPosition: 'center'
																				}}
																			>
																				<source src={file.img} />
																			</video>
																		</>
																	) : (
																		<>
																			{/* <Cropper
																		image={`${file.img}`}
																		crop={crop}
																		aspect={aspect}
																		className={classes.fileThumbnail}
																		onCropChange={()=> console.log('lol')}
																	/> */}
																			<img
																				src={file.img}
																				className={classes.fileThumbnail}
																				// ref={imageElement}
																				style={{
																					width: `${imageToResizeWidth}px`,
																					height: `${imageToResizeHeight}px`,
																					objectFit: 'cover',
																					objectPosition: 'center'
																				}}
																			/>
																			{/* <img
																				src={imgDestination}
																				className={classes.fileThumbnail}
																			/> */}
																		</>
																	)}

																	<p className={classes.fileName}>
																		{file.fileName}
																	</p>
																</div>

																{/* {loadingMedia.includes(file.id) ? (
															<div className={classes.loaderContainer}>
																<CircularProgress className={classes.loader} />
															</div>
														) : (
															<></>
														)} */}

																{isEdit ? (
																	<div className={classes.filePreviewRight}>
																		<EyeIcon
																			onClick={() => setPreviewFile(file)}
																			className={classes.filePreviewIcons}
																		/>
																	</div>
																) : (
																	<div className={classes.filePreviewRight}>
																		<EyeIcon
																			className={classes.filePreviewIcons}
																			onClick={() => setPreviewFile(file)}
																		/>
																		{uploadedFiles.length > 1 && (
																			<span {...provided.dragHandleProps}>
																				<MenuIcon
																					style={{ cursor: 'grab' }}
																					className={classes.filePreviewIcons}
																				/>
																			</span>
																		)}
																		<Deletes
																			className={classes.filePreviewIcons}
																			onClick={() => {
																				handleDeleteFile(file.id);
																				setPreviewFile(null);
																			}}
																		/>
																	</div>
																)}
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
							{uploadedFiles.length < 10 && !isEdit ? (
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
										<p className={classes.uploadMediaError}>
											{uploadMediaError}
										</p>
									</div>
								</section>
							) : (
								<></>
							)}

							<p className={classes.fileRejectionError}>{fileRejectionError}</p>

							<div className={classes.captionContainer}>
								<h6>LABELS</h6>
								<Autocomplete
									disabled={isEdit}
									PaperComponent={(props) => {
										return (
											<Paper
												elevation={6}
												className={classes.popperAuto}
												style={{
													marginTop: '12px',
													background: 'black',
													border: '1px solid #404040',
													boxShadow: '0px 16px 40px rgba(255, 255, 255, 0.16)',
													borderRadius: '8px'
												}}
												{...props}
											/>
										);
									}}
									multiple
									filterSelectedOptions
									freeSolo={true}
									value={selectedLabels}
									placeholder='Select Media'
									onChange={(event, newValue) => {
										setSelectedLabels(newValue);
									}}
									popupIcon={''}
									noOptionsText={'No Results Found'}
									className={`${classes.autoComplete}`}
									id='free-solo-2-demo'
									disableClearable
									options={postLabels}
									renderInput={(params) => (
										<TextField
											{...params}
											placeholder={selectedLabels.length ? ' ' : 'Select Label'}
											className={classes.textFieldAuto}
											InputProps={{
												disableUnderline: true,
												className: classes.textFieldInput,
												type: 'search',
												...params.InputProps
											}}
										/>
									)}
									renderOption={(props, option, { selected }) => (
										<li {...props} className={classes.liAutocomplete}>
											{option}
										</li>
									)}
									ChipProps={{
										className: classes.tagYellow,
										size: 'small',
										deleteIcon: <ClearIcon />
									}}
									clearIcon={''}
									anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
									transformOrigin={{ vertical: 'top', horizontal: 'left' }}
									popoverProps={{
										style: {
											bottom: 0,
											overflowY: 'auto'
										}
									}}
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
								/>
							</div>

							<p className={classes.mediaError}>{''}</p>

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
									{/* <Select
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
										displayEmpty={true}
										renderValue={(value) =>
											value?.length
												? Array.isArray(value)
													? value.join(', ')
													: value
												: 'Please Select'
										}
									>
										<MenuItem disabled value=''>
											Please Select
										</MenuItem> 
										{media.map((item, index) => (
											<MenuItem key={index} value={item.id}>
												{item.title}{' '}
											</MenuItem>
										))}
									</Select> */}

									<Autocomplete
										value={selectedMedia}
										onChange={(e, newVal) => {
											setSelectedMedia(newVal);
										}}
										//className={classes.autoComplete}
										options={totalMedia}
										renderInput={(params) => (
											<TextField
												{...params}
												placeholder='Search Media'
												InputProps={{
													disableUnderline: true,
													...params.InputProps,
													className: classes.textFieldInput
												}}
											/>
										)}
										clearIcon={<ClearIcon />}
										noOptionsText={'No Results Found'}
										popupIcon={''}
									/>

									<p className={classes.mediaError}>{mediaError}</p>
								</div>
							) : (
								<></>
							)}
						</div>
						<div className={classes.buttonDiv}>
							{isEdit ? (
								<div className={classes.editBtn}>
									<Button
										disabled={deleteBtnStatus}
										button2={isEdit ? true : false}
										onClick={() => {
											if (!deleteBtnStatus) {
												deletePost(specificPost?.id);
											}
										}}
										text={'DELETE POST'}
									/>
								</div>
							) : (
								<> </>
							)}

							<div className={isEdit ? classes.postBtnEdit : classes.postBtn}>
								<Button
									disabled={postBtnDisabled}
									onClick={() => {
										if (postBtnDisabled) {
											validatePostBtn();
										} else {
											setPostButtonStatus(true);
											if (isEdit) {
												createPost(specificPost?.id);
											} else {
												setIsLoadingCreatePost(true);
												let uploadFilesPromiseArray = uploadedFiles.map(
													async (_file) => {
														return uploadFileToServer(_file);
													}
												);

												Promise.all([...uploadFilesPromiseArray])
													.then((mediaFiles) => {
														createPost(null, mediaFiles);
													})
													.catch(() => {
														setIsLoadingCreatePost(false);
													});
											}
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
								{previewFile.mime_type === 'video/mp4' ? (
									<video
										id={'my-video'}
										poster={isEdit ? previewFile.img : null}
										className={classes.previewFile}
										style={{
											width: `${imageToResizeWidth * 4}px`,
											height: `${imageToResizeHeight * 4}px`,
											objectFit: 'cover',
											objectPosition: 'center'
										}}
										controls={true}
									>
										<source src={previewFile.img} />
									</video>
								) : isEdit && previewFile.type === 'video' ? (
									<video
										id={'my-video'}
										poster={isEdit ? previewFile.thumbnail_url : null}
										className={classes.previewFile}
										style={{
											width: `${imageToResizeWidth * 4}px`,
											height: `${imageToResizeHeight * 4}px`,
											objectFit: 'cover',
											objectPosition: 'center'
										}}
										controls={true}
									>
										<source src={previewFile.url} />
									</video>
								) : (
									<img
										src={previewFile.img}
										className={classes.previewFile}
										style={{
											width: `${imageToResizeWidth * 4}px`,
											height: `${imageToResizeHeight * 4}px`,
											objectFit: 'cover',
											objectPosition: 'center'
										}}
									/>
								)}
							</div>
						</div>
					)}
				</div>
			</LoadingOverlay>
		</Slider>
	);
};

UploadOrEditPost.propTypes = {
	open: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
	isEdit: PropTypes.bool.isRequired,
	title: PropTypes.string.isRequired,
	heading1: PropTypes.string.isRequired,
	buttonText: PropTypes.string.isRequired
};

export default UploadOrEditPost;
