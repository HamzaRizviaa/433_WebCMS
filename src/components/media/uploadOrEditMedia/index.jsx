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
import {
	getMainCategories,
	getMediaLabels
} from './../../../pages/MediaLibrary/mediaLibrarySlice';
import { getLocalStorageDetails } from '../../../utils';
import { getMedia } from '../../../pages/MediaLibrary/mediaLibrarySlice';
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
	isEdit,
	page
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
	const [subCategoryLabelColor, setSubCategoryLabelColor] = useState('#ffffff');
	const [subCategoryError, setSubCategoryError] = useState('');
	const [titleMedia, setTitleMedia] = useState('');
	const [titleMediaLabelColor, setTitleMediaLabelColor] = useState('#ffffff');
	const [titleMediaError, setTitleMediaError] = useState('');
	const [description, setDescription] = useState('');
	const [descriptionColor, setDescriptionColor] = useState('#ffffff');
	const [descriptionError, setDescriptionError] = useState('');
	const [deleteBtnStatus, setDeleteBtnStatus] = useState(false);
	const [previewFile, setPreviewFile] = useState(null);
	const [previewBool, setPreviewBool] = useState(false);
	const [isLoadingUploadMedia, setIsLoadingUploadMedia] = useState(false);
	const [mediaButtonStatus, setMediaButtonStatus] = useState(false);
	const [extraLabel, setExtraLabel] = useState('');
	const [disableDropdown, setDisableDropdown] = useState(true);
	const [fileWidth, setFileWidth] = useState(null);
	const [fileHeight, setFileHeight] = useState(null);
	const [fileDuration, setFileDuration] = useState(null);
	const videoRef = useRef(null);
	const imgRef = useRef(null);

	const previewRef = useRef(null);

	const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
		useDropzone({
			accept: `${
				mainCategory?.name === 'Watch' ? 'video/mp4' : 'audio/mp3, audio/mpeg'
			}`,
			maxFiles: 1
		});
	const dispatch = useDispatch();
	const mainCategories = useSelector(
		(state) => state.mediaLibraryOriginal.mainCategories
	);

	const specificMedia = useSelector(
		(state) => state.mediaLibraryOriginal.specificMedia
	);

	const specificMediaStatus = useSelector(
		(state) => state.mediaLibraryOriginal
	);
	const labels = useSelector((state) => state.mediaLibraryOriginal.labels);

	useEffect(() => {
		if (labels.length) {
			setMediaLabels([...labels]);
		}
	}, [labels]);

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
		// console.log(specificMedia?.media_type);
		// console.log(specificMedia?.sub_category);

		if (specificMedia) {
			// console.log(specificMedia, 'specificMedia');
			if (specificMedia?.labels) {
				let _labels = [];
				specificMedia.labels.map((label) =>
					_labels.push({ id: -1, name: label })
				);
				setSelectedLabels(_labels);
			}
			// if (specificMedia.media_type) {
			// 	// let setData = mainCategories.find(
			// 	// 	(u) => u.name === specificMedia?.media_type
			// 	// );
			// 	//console.log(specificMedia?.media_type);
			// 	// console.log(setData.name);
			// 	setMainCategory(specificMedia.media_type);
			// }

			setMainCategory(specificMedia?.media_type);
			// console.log(mainCategory);
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
					fileName: specificMedia?.file_name,
					img: `${process.env.REACT_APP_MEDIA_ENDPOINT}/${specificMedia?.cover_image}`,
					type: 'image'
				}
			]);
		}
	}, [specificMedia]);

	useEffect(() => {
		dispatch(getMainCategories());
		dispatch(getMediaLabels());
		return () => {
			resetState();
		};
	}, []);

	const {
		acceptedFiles: acceptedFiles2,
		fileRejections: fileRejections2,
		getRootProps: getRootProps2,
		getInputProps: getInputProps2
	} = useDropzone({
		accept: '.jpeg, .jpg, .png',
		maxFiles: 1
	});

	const updateSubCategories = async (mainCategory) => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_API_ENDPOINT}/media/get-sub-categories/${mainCategory.id}`,
				{
					headers: {
						Authorization: `Bearer ${getLocalStorageDetails()?.access_token}`
					}
				}
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
		if (mainCategory && !isEdit) {
			console.log(mainCategory, 'mc');
			updateSubCategories(mainCategory);
		}
		// else if (mainCategory && isEdit) {
		// 	let setData = mainCategories.find((u) => u.name === mainCategory);
		// 	//console.log(setData, 'm');
		// 	updateSubCategories(setData);
		// }
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
		console.log(fileDuration, 'duration');
	}, [videoRef.current]);

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
		setSubCategoryLabelColor('#ffffff');
		setTitleMediaLabelColor('#ffffff');
		setDescriptionColor('#ffffff');
		setDescriptionError('');
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
		if (!subCategory?.name) {
			setSubCategoryLabelColor('#ff355a');
			setSubCategoryError('You need to select sub category');
			setTimeout(() => {
				setSubCategoryLabelColor('#ffffff');
				setSubCategoryError('');
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
		if (!description) {
			setDescriptionColor('#ff355a');
			setDescriptionError('You need to enter a Description');
			setTimeout(() => {
				setDescriptionColor('#ffffff');
				setDescriptionError('');
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
				},
				{
					headers: {
						Authorization: `Bearer ${getLocalStorageDetails()?.access_token}`
					}
				}
			);
			if (result?.data?.status_code === 200) {
				if (result?.data?.data?.is_deleted === false) {
					toast.error(
						'The media or article cannot be deleted because it is used as a top banner'
					);
					dispatch(getMedia({ page }));
				} else {
					toast.success('Media has been deleted!');
					handleClose();
					//setting a timeout for getting post after delete.
					dispatch(getMedia({ page }));
				}
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
		let media_type = mainCategory?.id;
		setMediaButtonStatus(true);
		try {
			const result = await axios.post(
				`${process.env.REACT_APP_API_ENDPOINT}/media/create-media`,
				isEdit
					? { media_id: id, ...payload }
					: {
							main_category_id: media_type,
							sub_category_id: subCategory?.id,
							duration: Math.round(fileDuration),
							width: fileWidth,
							height: fileHeight,
							// sub_category: subCategory,
							title: titleMedia,
							...(selectedLabels.length ? { labels: [...selectedLabels] } : {}),
							description: description,
							data: {
								file_name: payload?.file_name,
								video_data: payload?.data?.Keys?.VideoKey,
								image_data: payload?.data?.Keys?.ImageKey,
								audio_data: payload?.data?.Keys?.AudioKey
							},
							user_data: {
								id: `${getLocalStorageDetails()?.id}`,
								first_name: `${getLocalStorageDetails()?.first_name}`,
								last_name: `${getLocalStorageDetails()?.last_name}`
							},
							...payload
					  },
				{
					headers: {
						Authorization: `Bearer ${getLocalStorageDetails()?.access_token}`
					}
				}
			);
			if (result?.data?.status_code === 200) {
				toast.success(
					isEdit ? 'Media has been updated!' : 'Media has been uploaded!'
				);
				setIsLoadingUploadMedia(false);
				setMediaButtonStatus(false);
				dispatch(getMedia({ page }));
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
				},
				{
					headers: {
						Authorization: `Bearer ${getLocalStorageDetails()?.access_token}`
					}
				}
			);

			if (result?.data?.data?.url) {
				let response = await axios.put(result?.data?.data?.url, file.file, {
					headers: { 'Content-Type': file.mime_type }
				});
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
				`${process.env.REACT_APP_API_ENDPOINT}/media/check/${givenTitle}`,
				{
					headers: {
						Authorization: `Bearer ${getLocalStorageDetails()?.access_token}`
					}
				}
			);
			return result?.data?.status_code;
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
		!subCategory ||
		!uploadedCoverImage.length ||
		!titleMedia ||
		!description ||
		mediaButtonStatus ||
		selectedLabels.length < 10;

	const editBtnDisabled =
		mediaButtonStatus ||
		!titleMedia ||
		!description ||
		(specificMedia?.title === titleMedia.trim() &&
			specificMedia?.description === description.trim());

	const MainCategoryId = (e) => {
		//find name and will return whole object  isEdit ? subCategory : subCategory.name
		let setData = mainCategories.find((u) => u.name === e);
		setMainCategory(setData);
	};

	useEffect(() => {
		//only empty it when its on new one , not on edit / specific media
		if (!isEdit) {
			setSubCategory({ id: null, name: '' });
		}
		// console.log(subCategory, 'subCategory');
	}, [mainCategory]);

	const SubCategoryId = (e) => {
		//e -- name
		//find name and will return whole object
		let setData = subCategories.find((u) => u.name === e);
		//console.log(setData);
		setSubCategory(setData);
	};

	//console.log(mainCategory);

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
			media={true}
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
										value={isEdit ? mainCategory : mainCategory?.name}
										onChange={(e) => {
											// setSubCategory({ id: null, name: '' });
											setDisableDropdown(true);
											// setMainCategory(e.target.value);
											//calling function , passing name (i.e. watch & listen)
											MainCategoryId(e.target.value);

											setMainCategoryLabelColor('#ffffff');
											setMainCategoryError('');

											if (uploadedFiles.length) {
												uploadedFiles.map((file) => handleDeleteFile(file.id));
											}
										}}
										className={`${classes.select} ${
											isEdit ? `${classes.isEditSelect}` : ''
										}`}
										disableUnderline={true}
										IconComponent={(props) => (
											<KeyboardArrowDownIcon
												{...props}
												style={{ display: isEdit ? 'none' : 'block', top: '4' }}
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
												<MenuItem key={index} value={category.name}>
													{category.name}
												</MenuItem>
											);
										})}
									</Select>
									<div className={classes.catergoryErrorContainer}>
										<p className={classes.uploadMediaError}>
											{mainCategoryError}
										</p>
										{/* <p className={classes.uploadMediaError2}>
									{mainCategory?.name || mainCategory ? subCategoryError : ''}
								</p> */}
									</div>
								</div>
								<div className={classes.subCategory}>
									<h6
										style={{
											color: mainCategory?.name ? subCategoryLabelColor : ''
										}}
									>
										SUB CATEGORY
									</h6>
									<Select
										onOpen={() => {
											setDisableDropdown(false);
										}}
										onClose={() => {
											setDisableDropdown(true);
										}}
										disabled={!mainCategory || isEdit ? true : false}
										style={{ backgroundColor: isEdit ? '#404040' : '#000000' }}
										value={isEdit ? subCategory : subCategory?.name}
										onChange={(e) => {
											setDisableDropdown(true);
											SubCategoryId(e.target.value);
											setSubCategoryLabelColor('#ffffff');
											setSubCategoryError('');
										}}
										className={`${classes.select} ${
											isEdit ? `${classes.isEditSelect}` : ''
										}`}
										disableUnderline={true}
										IconComponent={(props) => (
											<KeyboardArrowDownIcon
												{...props}
												style={{ display: isEdit ? 'none' : 'block', top: '4' }}
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
										{subCategories.map((category, index) => {
											return (
												<MenuItem key={index} value={category.name}>
													{category.name}
												</MenuItem>
											);
										})}
									</Select>
									<p className={classes.uploadMediaError2}>
										{isEdit
											? ' '
											: mainCategory?.name || mainCategory
											? subCategoryError
											: ''}
										{/* {} */}
									</p>
								</div>
							</div>
							{/* <div className={classes.catergoryErrorContainer}>
								<p className={classes.uploadMediaError}>{mainCategoryError}</p>
								{/* <p className={classes.uploadMediaError2}>
									{mainCategory?.name || mainCategory ? subCategoryError : ''}
								</p> */}
							{/* </div> */}

							{(mainCategory && subCategory?.name) || isEdit ? (
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
																			<div className={classes.fileThumbnail2} />
																			<video
																				src={file.img}
																				style={{ display: 'none' }}
																				ref={videoRef}
																				onLoadedMetadata={() => {
																					setFileWidth(
																						videoRef.current.videoWidth
																					);
																					setFileHeight(
																						videoRef.current.videoHeight
																					);
																					setFileDuration(
																						videoRef.current.duration
																					);
																				}}
																			/>
																		</>
																	) : (
																		<>
																			<MusicIcon className={classes.playIcon} />
																			<div className={classes.fileThumbnail2} />
																			<audio
																				src={file.img}
																				style={{ display: 'none' }}
																				ref={videoRef}
																				onLoadedMetadata={() => {
																					setFileDuration(
																						videoRef.current.duration
																					);
																				}}
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
													{mainCategory.name === 'Watch'
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
																	<img
																		src={file.img}
																		className={classes.fileThumbnail}
																		style={{
																			objectFit: 'cover',
																			objectPosition: 'center'
																		}}
																		ref={imgRef}
																		onLoad={() => {
																			setFileWidth(imgRef.current.naturalWidth);
																			setFileHeight(
																				imgRef.current.naturalHeight
																			);
																		}}
																	/>

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
										<div className={classes.characterCount}>
											<h6 style={{ color: titleMediaLabelColor }}>TITLE</h6>
											<h6
												style={{
													color:
														titleMedia?.length >= 25 && titleMedia?.length <= 27
															? 'pink'
															: titleMedia?.length === 28
															? 'red'
															: 'white'
												}}
											>
												{titleMedia?.length}/28
											</h6>
										</div>
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
											inputProps={{ maxLength: 28 }}
											multiline
											maxRows={2}
										/>
									</div>
									<p className={classes.mediaError}>{titleMediaError}</p>

									<div className={classes.titleContainer}>
										<h6 style={{ color: labelColor }}>LABELS</h6>
										<Autocomplete
											disabled={isEdit}
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
													{/* <p>{extraLabel.toUpperCase()}</p> */}
													<p>No results found</p>
													{/* <Button
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
													/> */}
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
												let currentLabelDuplicate = selectedLabels.some(
													(label) => label.name == option.name
												);
												if (option.id == null && !currentLabelDuplicate) {
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
												} else if (!currentLabelDuplicate) {
													return (
														<li {...props} className={classes.liAutocomplete}>
															{option.name}
														</li>
													);
												} else {
													return (
														<div className={classes.liAutocompleteWithButton}>
															&apos;{option.name}&apos; is already selected
														</div>
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
										<h6 style={{ color: descriptionColor }}>DESCRIPTION</h6>
										<TextField
											value={description}
											onChange={(e) => {
												setDescription(e.target.value);
											}}
											placeholder={'Please write your description here'}
											className={classes.textField}
											InputProps={{
												disableUnderline: true,
												className: classes.textFieldInput,
												style: {
													borderRadius: description ? '16px' : '40px'
												}
											}}
											multiline
											maxRows={4}
										/>
									</div>

									<p className={classes.mediaError}>{descriptionError}</p>
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
									disabled={isEdit ? editBtnDisabled : addMediaBtnDisabled}
									onClick={async () => {
										if (addMediaBtnDisabled || editBtnDisabled) {
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
														const completeUpload = await axios.post(
															`${process.env.REACT_APP_API_ENDPOINT}/media-upload/complete-upload`,
															{
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
																		...(mainCategory.name === 'Watch'
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
																		mainCategory.name === 'Watch'
																			? mediaFiles[0].upload_id
																			: 'audio'
																}
															},
															{
																headers: {
																	Authorization: `Bearer ${
																		getLocalStorageDetails()?.access_token
																	}`
																}
															}
														);
														await uploadMedia(null, {
															file_name: uploadedFiles[0].fileName,
															type: 'medialibrary',
															data: {
																...completeUpload?.data?.data
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
										width: `100%`,
										height: `${8 * 4}rem`,
										objectFit: 'contain',
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
	buttonText: PropTypes.string.isRequired,
	page: PropTypes.string
};

export default UploadOrEditMedia;
