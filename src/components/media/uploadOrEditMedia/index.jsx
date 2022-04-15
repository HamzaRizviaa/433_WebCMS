import React, { useState, useEffect, useRef } from 'react';
import classes from './_uploadOrEditMedia.module.scss';
import PropTypes from 'prop-types';
import Slider from '../../slider';
import Button from '../../button';
import LoadingOverlay from 'react-loading-overlay';
import { MenuItem, TextField, Select } from '@material-ui/core';
import Four33Loader from '../../../assets/Loader_Yellow.gif';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { useDropzone } from 'react-dropzone';
import { makeid } from '../../../utils/helper';
import { useDispatch, useSelector } from 'react-redux';
import checkFileSize from '../../../utils/validateFileSize';
import {
	getMainCategories,
	getMediaLabels
} from './../../../pages/MediaLibrary/mediaLibrarySlice';
import { getLocalStorageDetails } from '../../../utils';
import { getMedia } from '../../../pages/MediaLibrary/mediaLibrarySlice';
import Close from '@material-ui/icons/Close';
import axios from 'axios';
import { toast } from 'react-toastify';
import DragAndDropField from '../../DragAndDropField';
import Labels from '../../Labels';
import { Tooltip, Fade } from '@mui/material';
import Slide from '@mui/material/Slide';
import { ReactComponent as Info } from '../../../assets/InfoButton.svg';

const UploadOrEditMedia = ({
	open,
	handleClose,
	title,
	heading1,
	buttonText,
	isEdit,
	page
}) => {
	const [dropboxLink, setDropboxLink] = useState(''); // media dropbox url
	const [dropboxLink2, setDropboxLink2] = useState(''); // cover image dropbox url
	const [selectedLabels, setSelectedLabels] = useState([]);
	const [mediaLabels, setMediaLabels] = useState([]);
	const [mainCategory, setMainCategory] = useState('');
	const [subCategory, setSubCategory] = useState('');
	const [subCategories, setSubCategories] = useState([]);
	const [uploadedFiles, setUploadedFiles] = useState([]);
	const [uploadedCoverImage, setUploadedCoverImage] = useState([]);
	const [fileRejectionError, setFileRejectionError] = useState('');
	const [fileRejectionError2, setFileRejectionError2] = useState('');
	const [subCategoryLabelColor, setSubCategoryLabelColor] = useState('#ffffff');
	const [titleMedia, setTitleMedia] = useState('');
	const [description, setDescription] = useState('');
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
	const [editBtnDisabled, setEditBtnDisabled] = useState(false);
	const [isError, setIsError] = useState({});
	const videoRef = useRef(null);
	const imgRef = useRef(null);

	const previewRef = useRef(null);
	const specificMedia = useSelector(
		(state) => state.mediaLibraryOriginal.specificMedia
	);
	const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
		useDropzone({
			accept: `${
				mainCategory?.name === 'Watch' || specificMedia?.media_type === 'Watch'
					? 'video/mp4'
					: 'audio/mp3, audio/mpeg'
			}`,
			maxFiles: 1,
			validator: checkFileSize
		});
	const dispatch = useDispatch();
	const mainCategories = useSelector(
		(state) => state.mediaLibraryOriginal.mainCategories
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
		if (specificMedia) {
			if (specificMedia?.labels) {
				let _labels = [];
				specificMedia.labels.map((label) =>
					_labels.push({ id: -1, name: label })
				);
				setSelectedLabels(_labels);
			}
			setDropboxLink(specificMedia?.media_dropbox_url);
			setDropboxLink2(specificMedia?.image_dropbox_url);
			setMainCategory(specificMedia?.media_type);
			setSubCategory(specificMedia?.sub_category);
			setTitleMedia(specificMedia?.title);
			setDescription(specificMedia?.description);
			setUploadedFiles([
				{
					id: makeid(10),
					fileName: specificMedia?.file_name_media,
					img: `${process.env.REACT_APP_MEDIA_ENDPOINT}/${specificMedia?.media_url}`,
					type: specificMedia?.media_type === 'Watch' ? 'video' : 'audio'
				}
			]);

			setUploadedCoverImage([
				{
					id: makeid(10),
					fileName: specificMedia?.file_name_image,
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
		maxFiles: 1,
		validator: checkFileSize
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
			fileRejections.forEach(({ errors }) => {
				return errors.forEach((e) => setFileRejectionError(e.message));
			});
			setTimeout(() => {
				setFileRejectionError('');
			}, [5000]);
		}
	}, [fileRejections]);

	useEffect(() => {
		if (fileRejections2.length) {
			fileRejections2.forEach(({ errors }) => {
				return errors.forEach((e) => setFileRejectionError2(e.message));
			});
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

	const selectFileType = (type) => {
		switch (type) {
			case 'video/mp4':
				return 'video';
			case 'audio/mp3':
				return 'audio';
			case 'audio/mpeg':
				return 'audio';
			default:
				return 'image';
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
					type: selectFileType(file.type)
				};
			});
			setUploadedFiles([...uploadedFiles, ...newFiles]);
		}
	}, [acceptedFiles]);

	useEffect(() => {}, [videoRef.current]);

	useEffect(() => {
		if (acceptedFiles2?.length) {
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
		setDropboxLink('');
		setDropboxLink2('');
		setSubCategory('');
		setUploadedFiles([]);
		setUploadedCoverImage([]);
		setFileRejectionError2('');
		setSubCategoryLabelColor('#ffffff');
		setTimeout(() => {
			setDeleteBtnStatus(false);
		}, 1000);
		setTitleMedia('');
		setDescription('');
		setPreviewFile(null);
		setPreviewBool(false);
		setMediaButtonStatus(false);
		setSelectedLabels([]);
		setExtraLabel('');
		setDisableDropdown(true);
		setEditBtnDisabled(false);
		setIsError({});
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
		setIsError({
			uploadedFiles: uploadedFiles.length < 1,
			selectedLabels: selectedLabels.length < 10,
			uploadedCoverImage: uploadedCoverImage.length < 1,
			mainCategory: !mainCategory,
			subCategory: !subCategory.name,
			titleMedia: !titleMedia && { message: 'You need to enter a Title' },
			description: !description
		});

		setTimeout(() => {
			setIsError({});
		}, 5000);
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
		// console.log(payload);
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
							title: titleMedia,
							...(dropboxLink ? { media_dropbox_url: dropboxLink } : {}),
							...(dropboxLink2 ? { image_dropbox_url: dropboxLink2 } : {}),
							...(selectedLabels.length ? { labels: [...selectedLabels] } : {}),
							description: description,
							data: {
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

	const uploadFileToServer = async (file, type) => {
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
				return {
					...result.data.data,
					signed_response: response,
					fileType: type
				};
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

	useEffect(() => {
		if (specificMedia) {
			setEditBtnDisabled(
				mediaButtonStatus ||
					!uploadedFiles.length ||
					!uploadedCoverImage.length ||
					!titleMedia ||
					!description ||
					(specificMedia?.file_name_media === uploadedFiles[0]?.fileName &&
						specificMedia?.file_name_image ===
							uploadedCoverImage[0]?.fileName &&
						specificMedia?.media_dropbox_url === dropboxLink.trim() &&
						specificMedia?.image_dropbox_url === dropboxLink2.trim() &&
						specificMedia?.title.replace(/\s+/g, '')?.trim() ===
							titleMedia?.replace(/\s+/g, '')?.trim() &&
						specificMedia?.description?.replace(/\s+/g, '')?.trim() ===
							description?.replace(/\s+/g, '')?.trim())
			);
		}
	}, [
		specificMedia,
		titleMedia,
		description,
		dropboxLink,
		dropboxLink2,
		uploadedFiles,
		uploadedCoverImage
	]);
	//console.log(editBtnDisabled, 'edb');

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
		setSubCategory(setData);
	};

	const addSaveMediaBtn = async () => {
		if (addMediaBtnDisabled || editBtnDisabled) {
			validatePostBtn();
		} else {
			setMediaButtonStatus(true);
			setIsLoadingUploadMedia(true);
			if (isEdit) {
				if (specificMedia?.title?.trim() !== titleMedia?.trim()) {
					if (
						(await handleTitleDuplicate(titleMedia)) === 200 &&
						titleMedia !== specificMedia.title
					) {
						setIsError((prev) => {
							return {
								...prev,
								titleMedia: { message: 'This title already exists' }
							};
						});
						setTimeout(() => {
							setIsError({});
						}, [5000]);
						setIsLoadingUploadMedia(false);
						setMediaButtonStatus(false);
						return;
					}
				}
				// uploadMedia(specificMedia?.id, {
				// 	title: titleMedia,
				// 	description
				// });
				let uploadFilesPromiseArray = [
					uploadedFiles[0],
					uploadedCoverImage[0]
				].map(async (_file) => {
					if (_file.file) {
						console.log('_file', _file);
						return await uploadFileToServer(_file, _file.type);
					} else {
						return _file;
					}
				});

				Promise.all([...uploadFilesPromiseArray])
					.then(async (mediaFiles) => {
						console.log('Media Files', mediaFiles);
						const completedUpload = mediaFiles.map(async (file) => {
							if (file?.signed_response) {
								return await axios.post(
									`${process.env.REACT_APP_API_ENDPOINT}/media-upload/complete-upload`,
									{
										file_name:
											file.fileType === 'image'
												? uploadedCoverImage[0].fileName
												: uploadedFiles[0].fileName,
										type: 'medialibrary',
										data: {
											bucket: 'media',
											multipart_upload:
												uploadedFiles[0]?.mime_type == 'video/mp4'
													? [
															{
																e_tag:
																	file?.signed_response?.headers?.etag.replace(
																		/['"]+/g,
																		''
																	),
																part_number: 1
															}
													  ]
													: ['image'],
											keys: {
												image_key: file?.keys?.image_key,
												...(mainCategory.name === 'Watch' ||
												specificMedia?.media_type === 'Watch'
													? {
															video_key: file?.keys?.video_key,
															audio_key: ''
													  }
													: {
															audio_key: file?.keys?.audio_key,
															video_key: ''
													  })
											},
											upload_id:
												mainCategory.name === 'Watch' ||
												specificMedia?.media_type === 'Watch'
													? file.upload_id || 'image'
													: file.fileType === 'image'
													? 'image'
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
							}
						});
						console.log(completedUpload, 'completedUpload');
						await uploadMedia(specificMedia?.id, {
							title: titleMedia,
							description,
							type: 'medialibrary',
							data: {
								file_name_media: uploadedFiles[0].fileName,
								file_name_image: uploadedCoverImage[0].fileName,
								image_key: mediaFiles[1]?.keys?.image_key,
								audio_key: mediaFiles[0]?.keys?.audio_key,
								video_key: mediaFiles[0]?.keys?.video_key,
								...completedUpload?.data?.data
							}
						});
					})
					.catch(() => {
						setIsLoadingUploadMedia(false);
					});
			} else {
				if (
					(await handleTitleDuplicate(titleMedia)) === 200 &&
					titleMedia !== specificMedia.title
				) {
					setIsError((prev) => {
						return {
							...prev,
							titleMedia: { message: 'This title already exists' }
						};
					});
					setTimeout(() => {
						setIsError({});
					}, [5000]);
					setIsLoadingUploadMedia(false);
					setMediaButtonStatus(false);
					return;
				}
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
										...(mainCategory.name === 'Watch' ||
										specificMedia?.media_type === 'Watch'
											? {
													video_key: mediaFiles[0]?.keys?.video_key,
													audio_key: ''
											  }
											: {
													audio_key: mediaFiles[0]?.keys?.audio_key,
													video_key: ''
											  })
									},
									upload_id:
										mainCategory?.name === 'Watch' ||
										specificMedia?.media_type === 'Watch'
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
							// file_name: uploadedFiles[0].fileName,
							// file_name2: uploadedCoverImage[0].fileName,
							type: 'medialibrary',
							data: {
								file_name_media: uploadedFiles[0].fileName,
								file_name_image: uploadedCoverImage[0].fileName,
								...completeUpload?.data?.data
							}
						});
					})
					.catch(() => {
						setIsLoadingUploadMedia(false);
					});
			}
		}
	};

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
				<Slide in={true} direction='up' {...{ timeout: 400 }}>
					<div
						className={`${
							previewFile != null
								? classes.previewContentWrapper
								: classes.contentWrapper
						}`}
					>
						{specificMediaStatus.specificMediaStatus === 'loading' ? (
							<div className={classes.loaderContainer2}>
								<img src={Four33Loader} className={classes.loader} />
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
										<h6
											className={[
												isError.mainCategory
													? classes.errorState
													: classes.noErrorState
											].join(' ')}
										>
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
											style={{
												backgroundColor: isEdit ? '#404040' : '#000000'
											}}
											value={isEdit ? mainCategory : mainCategory?.name}
											onChange={(e) => {
												setDisableDropdown(true);
												MainCategoryId(e.target.value);
												if (uploadedFiles.length) {
													uploadedFiles.map((file) =>
														handleDeleteFile(file.id)
													);
												}
											}}
											className={`${classes.select} ${
												isEdit ? `${classes.isEditSelect}` : ''
											}`}
											disableUnderline={true}
											IconComponent={(props) => (
												<KeyboardArrowDownIcon
													{...props}
													style={{
														display: isEdit ? 'none' : 'block',
														top: '4'
													}}
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
												{isError.mainCategory
													? 'You need to select main category'
													: ''}
											</p>
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
											style={{
												backgroundColor: isEdit ? '#404040' : '#000000'
											}}
											value={isEdit ? subCategory : subCategory?.name}
											onChange={(e) => {
												setDisableDropdown(true);
												SubCategoryId(e.target.value);
											}}
											className={`${classes.select} ${
												isEdit ? `${classes.isEditSelect}` : ''
											}`}
											disableUnderline={true}
											IconComponent={(props) => (
												<KeyboardArrowDownIcon
													{...props}
													style={{
														display: isEdit ? 'none' : 'block',
														top: '4'
													}}
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
												? isError.subCategory &&
												  'You need to select sub category'
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
										{mainCategory.name === 'Watch' ? (
											<div className={classes.explanationWrapper}>
												<h5>{isEdit ? 'Media File' : 'Add Media File'}</h5>
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
													<Info
														style={{ cursor: 'pointer', marginLeft: '1rem' }}
													/>
												</Tooltip>
											</div>
										) : (
											<h5>{isEdit ? 'Media File' : 'Add Media File'}</h5>
										)}

										<DragAndDropField
											uploadedFiles={uploadedFiles}
											isEdit={isEdit}
											handleDeleteFile={handleDeleteFile}
											setPreviewBool={setPreviewBool}
											setPreviewFile={setPreviewFile}
											isMedia
											videoRef={videoRef}
											onLoadedVideodata={() => {
												setFileWidth(videoRef?.current?.videoWidth);
												setFileHeight(videoRef?.current?.videoHeight);
												setFileDuration(videoRef?.current?.duration);
											}}
											onLoadedAudiodata={() => {
												setFileDuration(videoRef?.current?.duration);
											}}
										/>
										{!uploadedFiles.length && (
											<section
												className={[
													classes.dropZoneContainer,
													isError.uploadedFiles
														? classes.errorState
														: classes.noErrorState
												].join(' ')}
												style={{
													borderColor: isError.uploadedFiles
														? '#ff355a'
														: 'yellow'
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
														{mainCategory?.name === 'Watch' ||
														specificMedia?.media_type === 'Watch'
															? 'Supported format is mp4'
															: 'Supported format is mp3'}
													</p>
													<p className={classes.uploadMediaError}>
														{isError.uploadedFiles
															? 'You need to upload a media in order to post'
															: ''}
													</p>
												</div>
											</section>
										)}

										<p className={classes.fileRejectionError}>
											{fileRejectionError}
										</p>
										<div className={classes.dropBoxUrlContainer}>
											<h6>DROPBOX URL</h6>
											<TextField
												value={dropboxLink}
												multiline
												maxRows={2}
												onChange={(e) => setDropboxLink(e.target.value)}
												placeholder={'Please drop the dropbox URL here'}
												className={classes.textField}
												InputProps={{
													disableUnderline: true,
													className: classes.textFieldInput,
													style: {
														borderRadius: dropboxLink ? '16px' : '40px'
													}
												}}
											/>
										</div>

										<h5>{isEdit ? 'Cover Image' : 'Add Cover Image'}</h5>
										<DragAndDropField
											uploadedFiles={uploadedCoverImage}
											isEdit={isEdit}
											handleDeleteFile={handleDeleteFile2}
											setPreviewBool={setPreviewBool}
											setPreviewFile={setPreviewFile}
											isArticle
											imgEl={imgRef}
											imageOnload={() => {
												setFileWidth(imgRef.current.naturalWidth);
												setFileHeight(imgRef.current.naturalHeight);
											}}
										/>
										{!uploadedCoverImage.length && (
											<section
												className={[
													classes.dropZoneContainer,
													isError.uploadedCoverImage
														? classes.errorState
														: classes.noErrorState
												].join(' ')}
												style={{
													borderColor: isError.uploadedCoverImage
														? '#ff355a'
														: 'yellow'
												}}
											>
												<div
													{...getRootProps2({ className: classes.dropzone })}
												>
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
														{isError.uploadedCoverImage
															? 'You need to upload a cover in order to post'
															: ''}
													</p>
												</div>
											</section>
										)}

										<p className={classes.fileRejectionError}>
											{fileRejectionError2}
										</p>
										<div className={classes.dropBoxUrlContainer}>
											<h6>DROPBOX URL</h6>
											<TextField
												value={dropboxLink2}
												onChange={(e) => setDropboxLink2(e.target.value)}
												placeholder={'Please drop the dropbox URL here'}
												className={classes.textField}
												InputProps={{
													disableUnderline: true,
													className: classes.textFieldInput,
													style: {
														borderRadius: dropboxLink ? '16px' : '40px'
													}
												}}
											/>
										</div>

										<div className={classes.titleContainer}>
											<div className={classes.characterCount}>
												<h6
													className={[
														isError.titleMedia
															? classes.errorState
															: classes.noErrorState
													].join(' ')}
												>
													TITLE
												</h6>
												<h6
													style={{
														color:
															titleMedia?.length >= 25 &&
															titleMedia?.length <= 27
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
										<p className={classes.mediaError}>
											{isError.titleMedia ? isError.titleMedia.message : ''}
										</p>

										<div className={classes.titleContainer}>
											<h6
												className={[
													isError.selectedLabels
														? classes.errorState
														: classes.noErrorState
												].join(' ')}
											>
												LABELS
											</h6>
											<Labels
												isEdit={isEdit}
												setDisableDropdown={setDisableDropdown}
												selectedLabels={selectedLabels}
												setSelectedLabels={setSelectedLabels}
												LabelsOptions={mediaLabels}
												extraLabel={extraLabel}
												handleChangeExtraLabel={handleChangeExtraLabel}
											/>
										</div>
										<p className={classes.mediaError}>
											{isError.selectedLabels
												? `You need to add ${
														10 - selectedLabels.length
												  } more labels in order to upload media`
												: ''}
										</p>

										<div className={classes.titleContainer}>
											<h6
												className={[
													isError.description
														? classes.errorState
														: classes.noErrorState
												].join(' ')}
											>
												DESCRIPTION
											</h6>
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
										<p className={classes.mediaError}>
											{isError.description
												? 'You need to enter a Description'
												: ''}
										</p>
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
										onClick={() => addSaveMediaBtn()}
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
				</Slide>
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
