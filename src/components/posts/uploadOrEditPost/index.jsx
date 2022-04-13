/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import classes from './_uploadOrEditPost.module.scss';
import { useDropzone } from 'react-dropzone';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import PropTypes from 'prop-types';
import Slider from '../../slider';
import DragAndDropField from '../../DragAndDropField';
import Labels from '../../Labels';
import { TextField, CircularProgress } from '@material-ui/core';
import ToggleSwitch from '../../switch';
import Button from '../../button';
import { useDispatch, useSelector } from 'react-redux';
import {
	getMedia,
	getAllMedia
} from './../../../pages/MediaLibrary/mediaLibrarySlice';
import { makeid } from '../../../utils/helper';
import { getLocalStorageDetails } from '../../../utils';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
	getPosts,
	getPostLabels
} from '../../../pages/PostLibrary/postLibrarySlice';
import Close from '@material-ui/icons/Close';
import ClearIcon from '@material-ui/icons/Clear';
import { Autocomplete, Popper, Paper, Tooltip, Fade } from '@mui/material';
import uploadFileToServer from '../../../utils/uploadFileToServer';
import { ReactComponent as SquareCrop } from '../../../assets/Square.svg';
import { ReactComponent as PortraitCrop } from '../../../assets/portrait_rect.svg';
import { ReactComponent as LandscapeCrop } from '../../../assets/Rectangle_12.svg';
import { ReactComponent as SquareCropSelected } from '../../../assets/Square_selected.svg';
import { ReactComponent as PortraitCropSelected } from '../../../assets/portrait_rect_selected.svg';
import { ReactComponent as LandscapeCropSelected } from '../../../assets/Rectangle_12_selected.svg';
import { ReactComponent as Info } from '../../../assets/InfoButton.svg';

import LoadingOverlay from 'react-loading-overlay';

const UploadOrEditPost = ({
	open,
	handleClose,
	title,
	isEdit,
	heading1,
	buttonText,
	page
}) => {
	const [caption, setCaption] = useState('');
	const [dropboxLink, setDropboxLink] = useState('');
	const [value, setValue] = useState(false);
	const [fileRejectionError, setFileRejectionError] = useState('');
	const [uploadedFiles, setUploadedFiles] = useState([]);
	const [selectedLabels, setSelectedLabels] = useState([]);
	const [selectedMedia, setSelectedMedia] = useState(null);
	const [postButtonStatus, setPostButtonStatus] = useState(false);
	const [deleteBtnStatus, setDeleteBtnStatus] = useState(false);
	const [dimensionSelect, setDimensionSelect] = useState('square');
	const [isLoadingCreatePost, setIsLoadingCreatePost] = useState(false);
	const [imageToResizeWidth, setImageToResizeWidth] = useState(80);
	const [imageToResizeHeight, setImageToResizeHeight] = useState(80);
	const [previewFile, setPreviewFile] = useState(null);
	const [previewBool, setPreviewBool] = useState(false);
	const [postLabels, setPostLabels] = useState([]);
	const [extraLabel, setExtraLabel] = useState('');
	const [selectMediaInput, setSelectMediaInput] = useState('');
	const [disableDropdown, setDisableDropdown] = useState(true);
	const [dropdownPosition, setDropdownPosition] = useState(false);
	const previewRef = useRef(null);
	const orientationRef = useRef(null);
	const [isError, setIsError] = useState({});

	const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
		useDropzone({
			accept: '.jpeg,.jpg,.png, video/mp4',
			maxFiles: 10
		});

	const allMedia = useSelector((state) => state.mediaLibraryOriginal.allMedia);
	const labels = useSelector((state) => state.postLibrary.labels);
	const specificPost = useSelector((state) => state.postLibrary.specificPost);
	const specificPostStatus = useSelector((state) => state.postLibrary);
	const dispatch = useDispatch();

	useEffect(() => {
		if (uploadedFiles.length > 10) {
			let _uploadedFile = uploadedFiles.slice(0, 10);
			setUploadedFiles(_uploadedFile);
		}
	}, [uploadedFiles]);

	useEffect(() => {
		setPostLabels((labels) => {
			return labels.filter((label) => label.id != null);
		});
		if (extraLabel) {
			let flag = postLabels.some((label) => label.name == extraLabel);
			if (flag == false) {
				setPostLabels((labels) => {
					return [...labels, { id: null, name: extraLabel }];
				});
			}
		}
	}, [extraLabel]);

	useEffect(() => {
		if (labels.length) {
			setPostLabels([...labels]);
		}
	}, [labels]);

	useEffect(() => {
		// specific post data get ,api / edit
		if (specificPost) {
			if (specificPost?.labels) {
				let _labels = [];
				specificPost.labels.map((label) =>
					_labels.push({ id: -1, name: label })
				);
				setSelectedLabels(_labels);
			}
			setCaption(specificPost.caption);

			setDropboxLink(specificPost?.dropbox_url);

			if (specificPost?.media_id !== null) {
				let _media;
				allMedia.find((medi) => {
					if (medi.id === specificPost?.media_id) {
						_media = medi;
					}
				});
				setSelectedMedia(_media);
				setValue(true);
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
							img: `${process.env.REACT_APP_MEDIA_ENDPOINT}/${file.thumbnail_url}`, //img
							type: 'video'
						};
					} else {
						return {
							fileName: file.file_name,
							id: makeid(10),
							img: `${process.env.REACT_APP_MEDIA_ENDPOINT}/${file.url}`, //img
							type: 'image'
						};
					}
				});
				setUploadedFiles([...uploadedFiles, ...newFiles]);
			}
		}
	}, [specificPost]);

	useEffect(() => {
		//dispatch(getMedia());
		dispatch(getAllMedia(1000));
		dispatch(getMedia({}));
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
		if (uploadedFiles.length > 10) {
			let newArray = uploadedFiles.slice(0, 10);
			setUploadedFiles([newArray]);
		}
	}, [acceptedFiles]);

	const resetState = () => {
		setCaption('');
		setDropboxLink('');
		setValue(false);
		setFileRejectionError('');
		setUploadedFiles([]);
		setSelectedMedia(null);
		setPostButtonStatus(false);
		setDimensionSelect('square');
		setTimeout(() => {
			setDeleteBtnStatus(false);
		}, 1000);
		setExtraLabel('');
		setImageToResizeWidth(80);
		setImageToResizeHeight(80);
		setPreviewFile(null);
		setPreviewBool(false);
		setSelectedLabels([]);
		setDisableDropdown(true);
		setDropdownPosition(false);
		setIsError({});
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
			result.source.index, // pick
			result.destination.index // drop
		);

		setUploadedFiles(items);
	};

	const handleDeleteFile = (id) => {
		setUploadedFiles((uploadedFiles) =>
			uploadedFiles.filter((file) => file.id !== id)
		);
	};

	const validatePostBtn = () => {
		setIsError({
			caption: !caption,
			uploadedFiles: uploadedFiles.length < 1,
			selectedLabels: selectedLabels.length < 10,
			selectedMediaValue: value && !selectedMedia
		});

		setTimeout(() => {
			setIsError({});
		}, 5000);
	};

	const createPost = async (id, mediaFiles = []) => {
		setPostButtonStatus(true);

		let media_files = mediaFiles.map((file, index) => {
			if (file.file_name) {
				return file;
			} else {
				let _file = Object.assign(file, {
					file_name: file.fileName,
					media_url: file.img.split('cloudfront.net/')[1],
					sort_order: 0
				});
				delete _file.fileName;
				delete _file.img;
				return _file;
			}
		});

		try {
			const result = await axios.post(
				`${process.env.REACT_APP_API_ENDPOINT}/post/add-post`,
				{
					caption: caption,
					media_files: [...media_files],
					...(dropboxLink ? { dropbox_url: dropboxLink } : {}),
					orientation_type: dimensionSelect,
					...(selectedMedia ? { media_id: selectedMedia.id } : {}),
					...(isEdit && id ? { post_id: id } : {}),
					...(!isEdit && selectedLabels.length
						? { labels: [...selectedLabels] }
						: {}),
					user_data: {
						id: `${getLocalStorageDetails()?.id}`,
						first_name: `${getLocalStorageDetails()?.first_name}`,
						last_name: `${getLocalStorageDetails()?.last_name}`
					}
				},
				{
					headers: {
						Authorization: `Bearer ${getLocalStorageDetails()?.access_token}`
					}
				}
			);
			if (result?.data?.status_code === 200) {
				toast.success(
					isEdit ? 'Post has been edited!' : 'Post has been created!'
				);
				setIsLoadingCreatePost(false);
				setPostButtonStatus(false);
				handleClose();
				dispatch(getPosts({ page }));
				dispatch(getPostLabels());
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
				},
				{
					headers: {
						Authorization: `Bearer ${getLocalStorageDetails()?.access_token}`
					}
				}
			);
			if (result?.data?.status_code === 200) {
				toast.success('Post has been deleted!');
				handleClose();
				dispatch(getPosts({ page }));
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
	};

	const landscapeCrop = () => {
		setDimensionSelect('landscape');
		setImageToResizeWidth(80.22);
		setImageToResizeHeight(42);
	};

	const portraitCrop = () => {
		setDimensionSelect('portrait');
		setImageToResizeWidth(64);
		setImageToResizeHeight(80);
	};

	const [newLabels, setNewLabels] = useState([]);

	const handleChangeExtraLabel = (e) => {
		setExtraLabel(e.target.value.toUpperCase());
	};

	const handleChangeSelectMediaInput = (e) => {
		setSelectMediaInput(e.target.value);
	};

	useEffect(() => {
		if (labels.length) setNewLabels(labels);
	}, [newLabels]);

	const handlePreviewEscape = () => {
		setPreviewBool(false);
		setPreviewFile(null);
	};

	const postBtnDisabled =
		!uploadedFiles.length ||
		!caption ||
		postButtonStatus ||
		(value && !selectedMedia) ||
		selectedLabels.length < 10;

	const editBtnDisabled =
		postButtonStatus ||
		!caption ||
		(value && !selectedMedia) ||
		(specificPost?.dropbox_url === dropboxLink.trim() &&
			specificPost?.caption === caption.trim());

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
			disableDropdown={disableDropdown}
			handlePreview={() => {
				handlePreviewEscape();
			}}
			preview={previewBool}
			previewRef={previewRef}
			orientationRef={orientationRef}
			edit={isEdit}
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
							<CircularProgress className={classes.loader} />
						</div>
					) : (
						<></>
					)}
					<div
						className={classes.contentWrapperNoPreview}
						style={{ width: previewFile != null ? '60%' : 'auto' }}
					>
						<div>
							{uploadedFiles.length === 0 ? (
								<div className={classes.explanationWrapper}>
									<h5>{heading1}</h5>
									<Tooltip
										TransitionComponent={Fade}
										TransitionProps={{ timeout: 800 }}
										title='Default encoding for videos should be H.264'
										arrow
										componentsProps={{
											tooltip: { className: classes.toolTip },
											arrow: { className: classes.toolTipArrow }
										}}
										placement='bottom-start'
									>
										<Info style={{ cursor: 'pointer', marginLeft: '1rem' }} />
									</Tooltip>
								</div>
							) : (
								<div className={classes.headerOrientationWrapper}>
									<div className={classes.explanationWrapper}>
										<h5>{heading1}</h5>
										<Tooltip
											TransitionComponent={Fade}
											TransitionProps={{ timeout: 800 }}
											title='Default encoding for videos should be H.264'
											arrow
											componentsProps={{
												tooltip: { className: classes.toolTip },
												arrow: { className: classes.toolTipArrow }
											}}
											placement='bottom-start'
										>
											<Info style={{ cursor: 'pointer', marginLeft: '1rem' }} />
										</Tooltip>
									</div>
									<div className={classes.orientationDimensionWrapper}>
										<h6 className={classes.orientation}>Orientation</h6>
										<div
											ref={orientationRef}
											className={classes.dimensionWrapper}
										>
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
							<DragAndDropField
								onDragEnd={onDragEnd}
								uploadedFiles={uploadedFiles}
								isEdit={isEdit}
								handleDeleteFile={handleDeleteFile}
								setPreviewBool={setPreviewBool}
								setPreviewFile={setPreviewFile}
								dimensionSelect={dimensionSelect}
								imageToResizeWidth={imageToResizeWidth}
								imageToResizeHeight={imageToResizeHeight}
								isPost
							/>

							{uploadedFiles.length < 10 && (
								<section
									className={classes.dropZoneContainer}
									style={{
										borderColor: isError.uploadedFiles ? '#ff355a' : 'yellow'
									}}
								>
									<div {...getRootProps({ className: classes.dropzone })}>
										<input
											{...getInputProps()}
											// ref={ref}
										/>
										<AddCircleOutlineIcon className={classes.addFilesIcon} />
										<p className={classes.dragMsg}>
											Click or drag files to this area to upload
										</p>
										<p className={classes.formatMsg}>
											Supported formats are jpeg, png and mp4
										</p>
										<p className={classes.uploadMediaError}>
											{isError.uploadedFiles
												? 'You need to upload a media in order to post'
												: ''}
										</p>
									</div>
								</section>
							)}
							<p className={classes.fileRejectionError}>{fileRejectionError}</p>
							<div className={classes.dropBoxUrlContainer}>
								<h6>DROPBOX URL</h6>
								<TextField
									value={dropboxLink}
									onChange={(e) => setDropboxLink(e.target.value)}
									placeholder={'Please drop the dropbox URL here'}
									className={classes.textField}
									multiline
									maxRows={2}
									InputProps={{
										disableUnderline: true,
										className: classes.textFieldInput,
										style: {
											borderRadius: dropboxLink ? '16px' : '40px'
										}
									}}
								/>
							</div>
							<div className={classes.captionContainer}>
								<h6
									className={
										isError.selectedLabels
											? classes.errorState
											: classes.noErrorState
									}
								>
									LABELS
								</h6>
								<Labels
									isEdit={isEdit}
									setDisableDropdown={setDisableDropdown}
									selectedLabels={selectedLabels}
									setSelectedLabels={setSelectedLabels}
									LabelsOptions={postLabels}
									extraLabel={extraLabel}
									handleChangeExtraLabel={handleChangeExtraLabel}
								/>
							</div>
							<p className={classes.mediaError}>
								{isError.selectedLabels
									? `You need to add ${
											10 - selectedLabels.length
									  } more labels in
                                                order to post`
									: ''}
							</p>
							<div className={classes.captionContainer}>
								<h6
									className={
										isError.caption ? classes.errorState : classes.noErrorState
									}
								>
									CAPTION
								</h6>
								<TextField
									value={caption}
									onChange={(e) => setCaption(e.target.value)}
									placeholder={'Please write your caption here'}
									className={classes.textField}
									InputProps={{
										disableUnderline: true,
										className: classes.textFieldInput,
										style: {
											borderRadius: caption ? '16px' : '40px'
										}
									}}
									multiline
									maxRows={4}
								/>
							</div>
							<p className={classes.mediaError}>
								{isError.caption
									? 'You need to upload a caption in order to post'
									: ''}
							</p>

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
								<div
									style={{ marginBottom: dropdownPosition ? 200 : 0 }}
									className={classes.mediaContainer}
								>
									<h6
										className={
											isError.selectedMediaValue
												? classes.errorState
												: classes.noErrorState
										}
									>
										SELECT MEDIA
									</h6>
									<Autocomplete
										value={selectedMedia}
										PaperComponent={(props) => {
											setDisableDropdown(false);

											return (
												<Paper
													elevation={6}
													className={classes.popperAuto}
													style={{
														marginTop: '12px',
														background: 'black',
														border: '1px solid #404040',
														boxShadow:
															'0px 16px 40px rgba(255, 255, 255, 0.16)',
														borderRadius: '8px'
													}}
													{...props}
												/>
											);
										}}
										PopperComponent={({ style, ...props }) => (
											<Popper {...props} style={{ ...style, height: 0 }} />
										)}
										ListboxProps={{
											style: { maxHeight: 180 },
											position: 'bottom'
										}}
										onOpen={() => {
											setDropdownPosition(true);
										}}
										onClose={(e) => {
											setDisableDropdown(true);
											setDropdownPosition(false);
										}}
										onChange={(e, newVal) => {
											setSelectedMedia(newVal);

											setDisableDropdown(true);
										}}
										options={allMedia}
										getOptionLabel={(option) => option.title}
										renderOption={(props, option, { selected }) => {
											return (
												<li {...props} className={classes.liAutocomplete}>
													{option.title}
												</li>
											);
										}}
										filterOptions={(items) => {
											return items.filter((item) =>
												item.title
													.toLowerCase()
													.includes(selectMediaInput.toLowerCase())
											);
										}}
										renderInput={(params) => (
											<TextField
												{...params}
												size='small'
												placeholder='Search Media'
												InputProps={{
													disableUnderline: true,
													...params.InputProps,
													className: classes.textFieldInput
												}}
												value={selectMediaInput}
												onChange={handleChangeSelectMediaInput}
											/>
										)}
										clearIcon={<ClearIcon />}
										noOptionsText={
											<div style={{ color: '#808080', fontSize: 14 }}>
												No Results Found
											</div>
										}
										popupIcon={''}
									/>

									<p className={classes.mediaError}>
										{isError.selectedMediaValue
											? 'You need to select a media in order to post'
											: ''}
									</p>
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
									disabled={isEdit ? editBtnDisabled : postBtnDisabled}
									onClick={() => {
										if (postBtnDisabled || editBtnDisabled) {
											validatePostBtn();
										} else {
											setPostButtonStatus(true);
											if (isEdit) {
												let uploadFilesPromiseArray = uploadedFiles.map(
													async (_file) => {
														if (_file.file) {
															return await uploadFileToServer(
																_file,
																'postlibrary'
															);
														} else {
															return _file;
														}
													}
												);

												Promise.all([...uploadFilesPromiseArray])
													.then((mediaFiles) => {
														createPost(specificPost?.id, mediaFiles);
													})
													.catch(() => {
														setIsLoadingCreatePost(false);
													});
											} else {
												setIsLoadingCreatePost(true);
												let uploadFilesPromiseArray = uploadedFiles.map(
													async (_file) => {
														return uploadFileToServer(_file, 'postlibrary');
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
						<div ref={previewRef} className={classes.previewComponent}>
							<div className={classes.previewHeader}>
								<Close
									onClick={() => {
										setPreviewBool(false);
										setPreviewFile(null);
									}}
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
	buttonText: PropTypes.string.isRequired,
	page: PropTypes.string
};

export default UploadOrEditPost;
