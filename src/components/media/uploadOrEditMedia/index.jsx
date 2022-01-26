import React, { useState, useEffect } from 'react';
import classes from './_uploadOrEditMedia.module.scss';
import PropTypes from 'prop-types';
import Slider from '../../slider';
import Button from '../../button';
import LoadingOverlay from 'react-loading-overlay';
import { MenuItem, TextField, Select } from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { useDropzone } from 'react-dropzone';
import { makeid } from '../../../utils/helper';
import { useDispatch, useSelector } from 'react-redux';
import { getMainCategories, getMediaLabels } from './uploadOrEditMediaSlice';
import { getMedia } from '../../posts/uploadOrEditPost/mediaDropdownSlice';
import captureVideoFrame from 'capture-video-frame';
import ClearIcon from '@material-ui/icons/Clear';
import Close from '@material-ui/icons/Close';
import axios from 'axios';
import { toast } from 'react-toastify';
import { CircularProgress } from '@material-ui/core';

import { ReactComponent as EyeIcon } from '../../../assets/Eye.svg';
import { ReactComponent as Union } from '../../../assets/Union.svg';
import { ReactComponent as MusicIcon } from '../../../assets/Music.svg';
import { ReactComponent as Deletes } from '../../../assets/Delete.svg';
import { Autocomplete, Paper, Popper } from '@mui/material';
import { useRef } from 'react';

const UploadOrEditMedia = ({
	open,
	handleClose,
	title,
	heading1,
	buttonText,
	isEdit
}) => {
	const [labelColor, setLabelColor] = useState('#ffffff');
	const [labelError, setLabelError] = useState('');
	const [selectedLabels, setSelectedLabels] = useState([]);
	const [mediaLabels, setMediaLabels] = useState([]);
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
	const [deleteBtnStatus, setDeleteBtnStatus] = useState(false);
	const [previewFile, setPreviewFile] = useState(null);
	const [previewBool, setPreviewBool] = useState(false);
	const [isLoadingUploadMedia, setIsLoadingUploadMedia] = useState(false);
	const [mediaButtonStatus, setMediaButtonStatus] = useState(false);
	const [extraLabel, setExtraLabel] = useState('');
	const [disableDropdown, setDisableDropdown] = useState(true);
	const [inputWidth, setInputWidth] = useState(null);
	const labelsInputRef = useRef(null);
	const previewRef = useRef(null);

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
	const specificMedia = useSelector(
		(state) => state.mediaLibrary.specificMedia
	);
	const specificMediaStatus = useSelector((state) => state.mediaLibrary);
	const labels = useSelector((state) => state.mediaLibrary.labels);
	useEffect(() => {
		if (labels.length) {
			setMediaLabels([...labels]);
		}
	}, [labels]);

	useEffect(() => {
		if (labelsInputRef?.current && inputWidth === null) {
			setInputWidth(labelsInputRef?.current?.offsetWidth);
		}
	}, [labelsInputRef?.current]);

	useEffect(() => {
		setMediaLabels((labels) => {
			return labels.filter((label) => label.id != null);
		});
		if (extraLabel) {
			let flag = mediaLabels.some((label) => label.name == extraLabel);
			if (flag == false) {
				setMediaLabels((labels) => {
					return [...labels, { id: null, name: extraLabel }];
				});
			}
		}
	}, [extraLabel]);

	useEffect(() => {
		if (specificMedia) {
			if (specificMedia?.labels) {
				let _labels = [];
				specificMedia.labels.map((label) =>
					_labels.push({ id: -1, name: label })
				);
				setSelectedLabels(_labels);
			}
			setMainCategory(specificMedia?.media_type);
			setSubCategory(specificMedia?.sub_category);
			setTitleMedia(specificMedia?.title);
			setDescription(specificMedia?.description);
			setUploadedFiles([
				{
					id: makeid(10),
					fileName: specificMedia?.file_name,
					img: `${process.env.REACT_APP_MEDIA_ENDPOINT}/${specificMedia?.media_url}`,
					type: specificMedia?.media_type === 'Watch' ? 'video' : 'audio'
				}
			]);

			setUploadedCoverImage([
				{
					id: makeid(10),
					img: `${process.env.REACT_APP_MEDIA_ENDPOINT}/${specificMedia?.cover_image}`
				}
			]);
		}
	}, [specificMedia]);

	useEffect(() => {
		dispatch(getMainCategories());
		dispatch(getMediaLabels());
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
			if (response?.data?.data?.length) {
				setSubCategories([...response.data.data]);
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
		setTimeout(() => {
			setDeleteBtnStatus(false);
		}, 1000);
		setTitleMediaError('');
		setMainCategoryError('');
		setTitleMedia('');
		setDescription('');
		setPreviewFile(null);
		setPreviewBool(false);
		setMediaButtonStatus(false);
		setSelectedLabels([]);
		setExtraLabel('');
		setDisableDropdown(true);
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
		if (selectedLabels.length < 10) {
			setLabelColor('#ff355a');
			setLabelError(
				`You need to add ${
					10 - selectedLabels.length
				} more labels in order to upload media`
			);
			setTimeout(() => {
				setLabelColor('#ffffff');
				setLabelError('');
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

	const deleteMedia = async (id) => {
		setDeleteBtnStatus(true);
		try {
			const result = await axios.post(
				`${process.env.REACT_APP_API_ENDPOINT}/media/delete-media`,
				{
					media_id: id
				}
			);
			if (result?.data?.status_code === 200) {
				toast.success('Media has been deleted!');
				handleClose();

				//setting a timeout for getting post after delete.
				dispatch(getMedia({}));
			}
		} catch (e) {
			toast.error('Failed to delete media!');
			setDeleteBtnStatus(false);
			console.log(e);
		}
	};

	const handleChangeExtraLabel = (e) => {
		setExtraLabel(e.target.value.toUpperCase());
	};

	const uploadMedia = async (id, payload) => {
		setMediaButtonStatus(true);
		try {
			const result = await axios.post(
				`${process.env.REACT_APP_API_ENDPOINT}/media/create-media`,
				isEdit
					? { media_id: id, ...payload }
					: {
							media_type: mainCategory,
							sub_category: subCategory,
							title: titleMedia,
							...(selectedLabels.length ? { labels: [...selectedLabels] } : {}),
							description: description,
							data: {
								file_name: payload?.file_name,
								videoData: payload?.data?.Keys?.VideoKey,
								imageData: payload?.data?.Keys?.ImageKey,
								audioData: payload?.data?.Keys?.AudioKey
							}
					  }
			);
			if (result?.data?.status_code === 200) {
				toast.success(
					isEdit ? 'Media has been updated!' : 'Media has been uploaded!'
				);
				setIsLoadingUploadMedia(false);
				setMediaButtonStatus(false);
				dispatch(getMedia({}));
				handleClose();
			}
		} catch (e) {
			toast.error(
				isEdit ? 'Failed to update media!' : 'Failed to create media!'
			);
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
					file_type:
						file.fileExtension === '.mpeg' ? '.mp3' : file.fileExtension,
					parts: 1
				}
			);

			if (result?.data?.data?.url) {
				let response = await axios.put(
					result?.data?.data?.url,
					file.file,
					//cropMe(uploadedFiles.file), //imp -- function to call to check landscape, square, portrait
					{
						headers: { 'Content-Type': file.mime_type }
					}
				);
				const frame = captureVideoFrame('my-video', 'png');
				if (result?.data?.data?.video_thumbnail_url) {
					await axios.put(result?.data?.data?.video_thumbnail_url, frame.blob, {
						headers: { 'Content-Type': 'image/png' }
					});
				}
				return { ...result.data.data, signed_response: response };
			} else {
				throw 'Error';
			}
		} catch (error) {
			console.log('Error');
			return null;
		}
	};

	const handleTitleDuplicate = async (givenTitle) => {
		try {
			const result = await axios.get(
				`${process.env.REACT_APP_API_ENDPOINT}/media/check/${givenTitle}`
			);
			console.log(result);
			return result?.data?.status;
		} catch (error) {
			console.log('Error');
			return null;
		}
	};

	const handlePreviewEscape = () => {
		setPreviewBool(false);
		setPreviewFile(null);
	};

	const addMediaBtnDisabled =
		!uploadedFiles.length ||
		!mainCategory ||
		!uploadedCoverImage.length ||
		!titleMedia ||
		mediaButtonStatus ||
		selectedLabels.length < 10;

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
			disableDropdown={disableDropdown}
			handlePreview={() => {
				handlePreviewEscape();
			}}
			preview={previewBool}
			previewRef={previewRef}
		>
			<LoadingOverlay active={isLoadingUploadMedia} spinner text='Loading...'>
				<div
					className={`${
						previewFile != null
							? classes.previewContentWrapper
							: classes.contentWrapper
					}`}
				>
					{specificMediaStatus.specificMediaStatus === 'loading' ? (
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
							<h5>{heading1}</h5>
							<div className={classes.categoryContainer}>
								<div className={classes.mainCategory}>
									<h6 style={{ color: mainCategoryLabelColor }}>
										MAIN CATEGORY
									</h6>
									<Select
										onOpen={() => {
											setDisableDropdown(false);
										}}
										onClose={() => {
											setDisableDropdown(true);
										}}
										disabled={isEdit ? true : false}
										style={{ backgroundColor: isEdit ? '#404040' : '#000000' }}
										value={mainCategory}
										onChange={(e) => {
											setDisableDropdown(true);
											setMainCategory(e.target.value);
											setMainCategoryLabelColor('#ffffff');
											setMainCategoryError('');
											setSubCategory('');
											if (uploadedFiles.length) {
												uploadedFiles.map((file) => handleDeleteFile(file.id));
											}
										}}
										className={`${classes.select} ${
											isEdit ? `${classes.isEditSelect}` : ''
										}`}
										disableUnderline={true}
										IconComponent={() => (
											<KeyboardArrowDownIcon
												style={{ display: isEdit ? 'none' : 'block' }}
											/>
										)}
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
										onOpen={() => {
											setDisableDropdown(false);
										}}
										onClose={() => {
											setDisableDropdown(true);
										}}
										disabled={!mainCategory || isEdit ? true : false}
										style={{ backgroundColor: isEdit ? '#404040' : '#000000' }}
										value={subCategory}
										onChange={(e) => {
											setDisableDropdown(true);
											setSubCategory(e.target.value);
										}}
										className={`${classes.select} ${
											isEdit ? `${classes.isEditSelect}` : ''
										}`}
										disableUnderline={true}
										IconComponent={() => (
											<KeyboardArrowDownIcon
												style={{ display: isEdit ? 'none' : 'block' }}
											/>
										)}
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
																			<Union className={classes.playIcon} />
																			<div className={classes.fileThumbnail} />
																		</>
																	) : (
																		<>
																			<MusicIcon className={classes.playIcon} />
																			<div className={classes.fileThumbnail} />
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
																		<Deletes
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
																			onClick={() => {
																				setPreviewBool(true);
																				setPreviewFile(file);
																			}}
																		/>
																	) : (
																		<>
																			<EyeIcon
																				className={classes.filePreviewIcons}
																				onClick={() => {
																					setPreviewBool(true);
																					setPreviewFile(file);
																				}}
																			/>
																			<Deletes
																				className={classes.filePreviewIcons}
																				onClick={() => {
																					handleDeleteFile2(file.id);
																					setPreviewBool(false);
																					setPreviewFile(null);
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
											ref={labelsInputRef}
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
										<h6 style={{ color: labelColor }}>LABELS</h6>
										<Autocomplete
											disabled={isEdit}
											style={{
												maxWidth: `${inputWidth}px`
											}}
											getOptionLabel={(option) => option.name}
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
											onClose={() => {
												setDisableDropdown(true);
											}}
											multiple
											filterSelectedOptions
											// freeSolo
											freeSolo={false}
											value={selectedLabels}
											onChange={(event, newValue) => {
												setDisableDropdown(true);
												event.preventDefault();
												event.stopPropagation();
												let newLabels = newValue.filter(
													(v, i, a) =>
														a.findIndex(
															(t) =>
																t.name.toLowerCase() === v.name.toLowerCase()
														) === i
												);
												setSelectedLabels([...newLabels]);
											}}
											popupIcon={''}
											noOptionsText={
												<div
													className={classes.liAutocompleteWithButton}
													style={{
														display: 'flex',
														justifyContent: 'space-between',
														alignItems: 'center',
														color: 'white',
														fontSize: 14
													}}
												>
													<p>{extraLabel.toUpperCase()}</p>
													<Button
														text='CREATE NEW LABEL'
														style={{
															padding: '3px 12px',
															fontWeight: 700
														}}
														onClick={() => {
															// setSelectedLabels((labels) => [
															// 	...labels,
															// 	extraLabel.toUpperCase()
															// ]);
														}}
													/>
												</div>
											}
											className={`${classes.autoComplete} ${
												isEdit && classes.disableAutoComplete
											}`}
											id='free-solo-2-demo'
											disableClearable
											options={mediaLabels}
											renderInput={(params) => (
												<TextField
													{...params}
													placeholder={
														selectedLabels.length ? ' ' : 'Select Label'
													}
													className={classes.textFieldAuto}
													value={extraLabel}
													onChange={handleChangeExtraLabel}
													InputProps={{
														disableUnderline: true,
														className: classes.textFieldInput,
														...params.InputProps
													}}
												/>
											)}
											renderOption={(props, option) => {
												if (option.id == null) {
													return (
														<li
															{...props}
															style={{
																display: 'flex',
																alignItems: 'center',
																justifyContent: 'space-between'
															}}
															className={classes.liAutocomplete}
														>
															{option.name}
															<Button
																text='CREATE NEW LABEL'
																style={{
																	padding: '3px 12px',
																	fontWeight: 700
																}}
																onClick={() => {
																	// setSelectedLabels((labels) => [
																	// 	...labels,
																	// 	extraLabel.toUpperCase()
																	// ]);
																}}
															/>
														</li>
													);
												} else {
													return (
														<li {...props} className={classes.liAutocomplete}>
															{option.name}
														</li>
													);
												}
											}}
											ChipProps={{
												className: classes.tagYellow,
												size: 'small',
												deleteIcon: <ClearIcon />
											}}
											clearIcon={''}
										/>
									</div>

									<p className={classes.mediaError}>{labelError}</p>

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
											if (!deleteBtnStatus) {
												console.log('specific', specificMedia.id);
												deleteMedia(specificMedia?.id);
											}
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
									onClick={async () => {
										if (addMediaBtnDisabled) {
											validatePostBtn();
										} else {
											setMediaButtonStatus(true);
											setIsLoadingUploadMedia(true);

											if (
												(await handleTitleDuplicate(titleMedia)) === 200 &&
												titleMedia !== specificMedia.title
											) {
												setTitleMediaLabelColor('#ff355a');
												setTitleMediaError('This title already exists');
												setTimeout(() => {
													setTitleMediaLabelColor('#ffffff');
													setTitleMediaError('');
												}, [5000]);
												setIsLoadingUploadMedia(false);
												setMediaButtonStatus(false);
												return;
											}
											if (isEdit) {
												uploadMedia(specificMedia?.id, {
													title: titleMedia,
													description
												});
											} else {
												let uploadFilesPromiseArray = [
													uploadedFiles[0],
													uploadedCoverImage[0]
												].map(async (_file) => {
													return uploadFileToServer(_file);
												});

												Promise.all([...uploadFilesPromiseArray])
													.then(async (mediaFiles) => {
														console.log(mediaFiles);
														uploadMedia(null, {
															file_name: uploadedFiles[0].fileName,
															type: 'medialibrary',
															data: {
																bucket: 'media',
																multipart_upload:
																	uploadedFiles[0]?.mime_type == 'video/mp4'
																		? [
																				{
																					e_tag:
																						mediaFiles[0]?.signed_response?.headers?.etag.replace(
																							/['"]+/g,
																							''
																						),
																					part_number: 1
																				}
																		  ]
																		: ['image'],
																keys: {
																	image_key: mediaFiles[1]?.keys?.image_key,
																	...(mainCategory === 'Watch'
																		? {
																				video_key:
																					mediaFiles[0]?.keys?.video_key,
																				audio_key: ''
																		  }
																		: {
																				audio_key:
																					mediaFiles[0]?.keys?.audio_key,
																				video_key: ''
																		  })
																},
																upload_id:
																	mainCategory === 'Watch'
																		? mediaFiles[0].upload_id
																		: 'audio'
															}
														});
													})
													.catch(() => {
														setIsLoadingUploadMedia(false);
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
