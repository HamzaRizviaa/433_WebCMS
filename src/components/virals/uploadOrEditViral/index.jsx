/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import classes from './_uploadOrEditViral.module.scss';
import { useDropzone } from 'react-dropzone';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import PropTypes from 'prop-types';
import Slider from '../../slider';
import { TextField } from '@material-ui/core';
import Button from '../../button';
import DragAndDropField from '../../DragAndDropField';
import { useDispatch, useSelector } from 'react-redux';
import { makeid } from '../../../utils/helper';
import checkFileSize from '../../../utils/validateFileSize';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getAllViralsApi } from '../../../pages/ViralLibrary/viralLibararySlice';
import { getPostLabels } from '../../../pages/PostLibrary/postLibrarySlice';
import Close from '@material-ui/icons/Close';
import Labels from '../../Labels';
import { getLocalStorageDetails } from '../../../utils';
import uploadFileToServer from '../../../utils/uploadFileToServer';
import validateForm from '../../../utils/validateForm';
import { Tooltip, Fade } from '@mui/material';
import ToggleSwitch from '../../switch';
// import Fade from '@mui/material/Fade';
import Slide from '@mui/material/Slide';
import PrimaryLoader from '../../PrimaryLoader';

import { ReactComponent as Info } from '../../../assets/InfoButton.svg';

import LoadingOverlay from 'react-loading-overlay';

const UploadOrEditViral = ({
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
	const [uploadMediaError, setUploadMediaError] = useState('');
	const [fileRejectionError, setFileRejectionError] = useState('');
	const [uploadedFiles, setUploadedFiles] = useState([]);
	const [selectedLabels, setSelectedLabels] = useState([]);
	const [postButtonStatus, setPostButtonStatus] = useState(false);
	const [deleteBtnStatus, setDeleteBtnStatus] = useState(false);
	const [isLoadingcreateViral, setIsLoadingcreateViral] = useState(false);
	const [previewFile, setPreviewFile] = useState(null);
	const [previewBool, setPreviewBool] = useState(false);
	const [postLabels, setPostLabels] = useState([]);
	const [extraLabel, setExtraLabel] = useState('');
	const [disableDropdown, setDisableDropdown] = useState(true);
	const [fileWidth, setFileWidth] = useState(null);
	const [fileHeight, setFileHeight] = useState(null);
	const [editBtnDisabled, setEditBtnDisabled] = useState(false);
	const [valueComments, setValueComments] = useState(false);
	const [valueLikes, setValueLikes] = useState(false);
	const [isError, setIsError] = useState({});
	const [form, setForm] = useState({
		caption: '',
		dropbox_url: '',
		uploadedFiles: [],
		labels: [],
		show_likes: false,
		show_comments: false
	});
	const previewRef = useRef(null);
	const orientationRef = useRef(null);
	const videoRef = useRef(null);
	const imgEl = useRef(null);

	const { specificViralStatus } = useSelector(
		(state) => state.ViralLibraryStore
	);

	const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
		useDropzone({
			accept: 'image/jpeg, image/png, video/mp4',
			maxFiles: 1,
			validator: checkFileSize
		});

	const labels = useSelector((state) => state.postLibrary.labels);
	const specificViral = useSelector(
		(state) => state.ViralLibraryStore.specificViral
	);
	const dispatch = useDispatch();

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

	// useEffect(() => {
	// 	validateForm(form);
	// }, []);

	useEffect(() => {
		if (specificViral) {
			if (specificViral?.labels) {
				let _labels = [];
				specificViral.labels.map((label) =>
					_labels.push({ id: -1, name: label })
				);
				setSelectedLabels(_labels);
				// console.log('Labels', _labels);
				setForm((prev) => {
					return {
						...prev,
						labels: _labels
					};
				});
			}
			setForm((prev) => {
				return {
					...prev,
					caption: specificViral?.caption,
					dropbox_url: specificViral?.dropbox_url,
					show_likes: specificViral?.show_likes,
					show_comments: specificViral?.show_comments
				};
			});
			// setCaption(specificViral?.caption);
			// setDropboxLink(specificViral?.dropbox_url);
			setFileWidth(specificViral?.width);
			setFileHeight(specificViral?.height);
			// setValueComments(specificViral?.show_comments);
			// setValueLikes(specificViral?.show_likes);
			if (specificViral?.thumbnail_url) {
				setForm((prev) => {
					return {
						...prev,
						uploadedFiles: [
							{
								id: makeid(10),
								file_name: specificViral?.file_name,
								thumbnail_url: `${process.env.REACT_APP_MEDIA_ENDPOINT}/${specificViral?.thumbnail_url}`,
								media_url: `${process.env.REACT_APP_MEDIA_ENDPOINT}/${specificViral?.url}`,
								type: 'video'
							}
						]
					};
				});
				// setUploadedFiles([
				// 	{
				// 		id: makeid(10),
				// 		file_name: specificViral?.file_name,
				// 		thumbnail_url: `${process.env.REACT_APP_MEDIA_ENDPOINT}/${specificViral?.thumbnail_url}`,
				// 		media_url: `${process.env.REACT_APP_MEDIA_ENDPOINT}/${specificViral?.url}`,
				// 		type: 'video'
				// 	}
				// ]);
			}
			if (specificViral?.thumbnail_url === null) {
				setForm((prev) => {
					return {
						...prev,
						uploadedFiles: [
							{
								id: makeid(10),
								file_name: specificViral?.file_name,
								media_url: `${process.env.REACT_APP_MEDIA_ENDPOINT}/${specificViral?.url}`,
								type: 'image'
							}
						]
					};
				});
				// setUploadedFiles([
				// 	{
				// 		id: makeid(10),
				// 		file_name: specificViral?.file_name,
				// 		media_url: `${process.env.REACT_APP_MEDIA_ENDPOINT}/${specificViral?.url}`,
				// 		type: 'image'
				// 	}
				// ]);
			}
		}
	}, [specificViral]);

	useEffect(() => {
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
			fileRejections.forEach(({ errors }) => {
				return errors.forEach((e) => setFileRejectionError(e.message));
			});
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
			setIsError({});

			let newFiles = acceptedFiles.map((file) => {
				let id = makeid(10);
				return {
					id: id,
					file_name: file.name,
					media_url: URL.createObjectURL(file),
					fileExtension: `.${getFileType(file.type)}`,
					mime_type: file.type,
					file: file,
					type: file.type === 'video/mp4' ? 'video' : 'image'
				};
			});
			// setUploadedFiles([...uploadedFiles, ...newFiles]);

			setForm((prev) => {
				return { ...prev, uploadedFiles: [...form.uploadedFiles, ...newFiles] };
			});
		}
	}, [acceptedFiles]);

	const resetState = () => {
		setCaption('');
		setDropboxLink('');
		setUploadMediaError('');
		setFileRejectionError('');
		setUploadedFiles([]);
		setPostButtonStatus(false);
		setTimeout(() => {
			setDeleteBtnStatus(false);
		}, 1000);
		setPreviewFile(null);
		setPreviewBool(false);
		setSelectedLabels([]);
		setDisableDropdown(true);
		setFileHeight(null);
		setFileWidth(null);
		setIsError({});
		setForm({
			caption: '',
			dropbox_url: '',
			uploadedFiles: [],
			labels: [],
			show_likes: false,
			show_comments: false
		});
		setValueComments(false);
		setValueLikes(false);
	};

	const handleDeleteFile = (id) => {
		setForm((prev) => {
			return {
				...prev,
				uploadedFiles: form.uploadedFiles.filter((file) => file.id !== id)
			};
		});

		// setUploadedFiles((uploadedFiles) =>
		// 	uploadedFiles.filter((file) => file.id !== id)
		// );
	};

	const validateViralBtn = () => {
		setIsError({
			caption: !form.caption,
			uploadedFiles: form.uploadedFiles.length < 1,
			selectedLabels: form.labels.length < 10
		});
		setTimeout(() => {
			setIsError({});
		}, 5000);
	};

	const createViral = async (id, mediaFiles = []) => {
		console.log(mediaFiles, 'media ');
		setPostButtonStatus(true);
		try {
			const result = await axios.post(
				`${process.env.REACT_APP_API_ENDPOINT}/viral/add-viral`,
				{
					caption: form.caption,
					dropbox_url: form.dropbox_url,
					media_url:
						mediaFiles[0]?.media_url?.split('cloudfront.net/')[1] ||
						mediaFiles[0]?.media_url,
					file_name: mediaFiles[0]?.file_name,
					thumbnail_url:
						mediaFiles[0]?.thumbnail_url?.split('cloudfront.net/')[1] ||
						mediaFiles[0]?.thumbnail_url,
					height: fileHeight,
					width: fileWidth,
					user_data: {
						id: `${getLocalStorageDetails()?.id}`,
						first_name: `${getLocalStorageDetails()?.first_name}`,
						last_name: `${getLocalStorageDetails()?.last_name}`
					},
					...(form.show_likes ? { show_likes: true } : {}),
					...(form.show_comments ? { show_comments: true } : {}),
					...(isEdit && id ? { viral_id: id } : {}),
					...(!isEdit && form.labels?.length
						? { labels: [...form.labels] }
						: {})
				},
				{
					headers: {
						Authorization: `Bearer ${getLocalStorageDetails()?.access_token}`
					}
				}
			);
			if (result?.data?.status_code === 200) {
				toast.success(
					isEdit ? 'Viral has been edited!' : 'Viral has been created!'
				);
				setIsLoadingcreateViral(false);
				setPostButtonStatus(false);
				handleClose();
				dispatch(getAllViralsApi({ page }));
				dispatch(getPostLabels());
			}
		} catch (e) {
			toast.error(isEdit ? 'Failed to edit viral!' : 'Failed to create viral!');
			setIsLoadingcreateViral(false);
			setPostButtonStatus(false);
			console.log(e, 'Failed create / edit viral');
		}
	};

	const deleteViral = async (id) => {
		setDeleteBtnStatus(true);
		try {
			const result = await axios.post(
				`${process.env.REACT_APP_API_ENDPOINT}/viral/delete-viral`,
				{
					viral_id: id
				},
				{
					headers: {
						Authorization: `Bearer ${getLocalStorageDetails()?.access_token}`
					}
				}
			);
			if (result?.data?.status_code === 200) {
				toast.success('Viral has been deleted!');
				handleClose();
				dispatch(getAllViralsApi({ page }));
			}
		} catch (e) {
			toast.error('Failed to delete Viral!');
			setDeleteBtnStatus(false);
			console.log(e, 'Failed to delete Viral');
		}
	};

	const [newLabels, setNewLabels] = useState([]);

	useEffect(() => {
		if (labels.length) setNewLabels(labels);
	}, [newLabels]);

	const handleChangeExtraLabel = (e) => {
		setExtraLabel(e.target.value.toUpperCase());
	};

	const handlePreviewEscape = () => {
		setPreviewBool(false);
		setPreviewFile(null);
	};

	// const viralBtnDisabled =
	// 	!uploadedFiles.length ||
	// 	postButtonStatus ||
	// 	selectedLabels.length < 10 ||
	// 	!caption;

	// const compareValues = (form, specificViral) => {
	// 	const values = Object.keys(form).map((key) => {
	// 		if (typeof form[key] === 'string')
	// 			if (form[key].trim() === specificViral[key].trim()) {
	// 				return true;
	// 			}
	// 		return false;
	// 	});

	// 	return values.every((item) => item === false);
	// };

	useEffect(() => {
		if (specificViral) {
			setEditBtnDisabled(
				postButtonStatus ||
					!form.caption ||
					!form.uploadedFiles.length ||
					(specificViral?.file_name === form.uploadedFiles[0]?.file_name &&
						specificViral?.caption?.trim() === form.caption.trim() &&
						specificViral?.dropbox_url?.trim() === form.dropbox_url.trim() &&
						specificViral?.show_likes === form.show_likes &&
						specificViral?.show_comments === form.show_comments)
			);
		}
	}, [specificViral, form]);

	const handlePostSaveBtn = () => {
		setIsLoadingcreateViral(false);
		if (!validateForm(form)) {
			validateViralBtn();
		} else {
			setPostButtonStatus(true);
			if (isEdit) {
				let uploadFilesPromiseArray = form.uploadedFiles.map(async (_file) => {
					if (_file.file) {
						return await uploadFileToServer(_file, 'virallibrary');
					} else {
						return _file;
					}
				});

				Promise.all([...uploadFilesPromiseArray])
					.then((mediaFiles) => {
						createViral(specificViral?.id, mediaFiles);
					})
					.catch(() => {
						setIsLoadingcreateViral(false);
					});
			} else {
				setIsLoadingcreateViral(true);
				let uploadFilesPromiseArray = form.uploadedFiles.map(async (_file) => {
					return uploadFileToServer(_file, 'virallibrary');
				});

				Promise.all([...uploadFilesPromiseArray])
					.then((mediaFiles) => {
						createViral(null, mediaFiles);
					})
					.catch(() => {
						setIsLoadingcreateViral(false);
					});
			}
		}
	};

	return (
		<Slider
			open={open}
			handleClose={() => {
				handleClose();
				if (form.uploadedFiles.length && !isEdit) {
					form.uploadedFiles.map((file) => handleDeleteFile(file.id));
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
			viral={true}
		>
			<LoadingOverlay
				active={isLoadingcreateViral}
				className={classes.loadingOverlay}
				spinner={<PrimaryLoader />}
			>
				<Slide in={true} direction='up' {...{ timeout: 400 }}>
					<div
						className={`${
							previewFile != null
								? classes.previewContentWrapper
								: classes.contentWrapper
						}`}
					>
						{specificViralStatus === 'loading' ? <PrimaryLoader /> : <></>}
						<div
							className={classes.contentWrapperNoPreview}
							style={{ width: previewFile != null ? '60%' : 'auto' }}
						>
							<div>
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
								<DragAndDropField
									uploadedFiles={form.uploadedFiles}
									// isEdit={isEdit}
									handleDeleteFile={handleDeleteFile}
									setPreviewBool={setPreviewBool}
									setPreviewFile={setPreviewFile}
									imgEl={imgEl}
									videoRef={videoRef}
									imageOnload={() => {
										setFileWidth(imgEl.current.naturalWidth);
										setFileHeight(imgEl.current.naturalHeight);
									}}
									onLoadedVideodata={() => {
										setFileWidth(videoRef.current.videoWidth);
										setFileHeight(videoRef.current.videoHeight);
									}}
									isPost
								/>
								{!form.uploadedFiles.length && (
									<section
										className={classes.dropZoneContainer}
										style={{
											borderColor: isError.uploadedFiles ? '#ff355a' : 'yellow'
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
										value={form.dropbox_url}
										onChange={(e) =>
											setForm((prev) => {
												return { ...prev, dropbox_url: e.target.value };
											})
										}
										placeholder={'Please drop the dropbox URL here'}
										className={classes.textField}
										multiline
										maxRows={2}
										InputProps={{
											disableUnderline: true,
											className: classes.textFieldInput,
											style: {
												borderRadius: form.dropbox_url ? '16px' : '40px'
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
										selectedLabels={form.labels}
										LabelsOptions={postLabels}
										extraLabel={extraLabel}
										handleChangeExtraLabel={handleChangeExtraLabel}
										setSelectedLabels={(newVal) => {
											setForm((prev) => {
												return { ...prev, labels: [...newVal] };
											});
										}}
									/>
								</div>
								<p className={classes.mediaError}>
									{isError.selectedLabels
										? `You need to add  ${
												10 - form.labels.length
										  }  more labels in order to post`
										: ''}
								</p>

								<div className={classes.captionContainer}>
									<h6
										className={
											isError.caption
												? classes.errorState
												: classes.noErrorState
										}
									>
										CAPTION
									</h6>
									<TextField
										value={form.caption}
										onChange={(e) =>
											setForm((prev) => {
												return { ...prev, caption: e.target.value };
											})
										}
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
									{isError.caption ? 'This field is required' : ''}
								</p>

								<div className={classes.postMediaContainer}>
									<div className={classes.postMediaHeader}>
										<h5>Show comments</h5>
										<ToggleSwitch
											id={1}
											checked={form.show_comments}
											onChange={(checked) =>
												setForm((prev) => {
													return { ...prev, show_comments: checked };
												})
											}
										/>
									</div>
								</div>

								<div className={classes.postMediaContainer}>
									<div className={classes.postMediaHeader}>
										<h5>Show likes</h5>
										<ToggleSwitch
											id={2}
											checked={form.show_likes}
											// onChange={
											// 	(checked) => {
											// 	setValueLikes(checked);
											// }}
											onChange={(checked) =>
												setForm((prev) => {
													return { ...prev, show_likes: checked };
												})
											}
										/>
									</div>
								</div>
							</div>

							<div className={classes.buttonDiv}>
								{isEdit ? (
									<div className={classes.editBtn}>
										<Button
											disabled={deleteBtnStatus}
											button2={isEdit ? true : false}
											onClick={() => {
												if (!deleteBtnStatus) {
													deleteViral(specificViral?.id);
												}
											}}
											text={'DELETE VIRAL'}
										/>
									</div>
								) : (
									<> </>
								)}

								<div className={isEdit ? classes.postBtnEdit : classes.postBtn}>
									<Button
										// disable - grey
										disabled={isEdit ? editBtnDisabled : !validateForm(form)}
										onClick={() => {
											handlePostSaveBtn();
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
											poster={isEdit ? previewFile.media_url : null}
											className={classes.previewFile}
											style={{
												width: `100%`,
												height: `${8 * 4}rem`,
												objectFit: 'contain',
												objectPosition: 'center'
											}}
											controls={true}
										>
											<source src={previewFile.media_url} />
										</video>
									) : isEdit && previewFile.type === 'video' ? (
										<video
											id={'my-video'}
											poster={isEdit ? previewFile.thumbnail_url : null}
											className={classes.previewFile}
											style={{
												width: `100%`,
												height: `${8 * 4}rem`,
												objectFit: 'contain',
												objectPosition: 'center'
											}}
											controls={true}
										>
											<source src={previewFile.media_url} />
										</video>
									) : (
										<img
											src={previewFile.media_url}
											className={classes.previewFile}
											style={{
												width: `100%`,
												height: `${8 * 4}rem`,
												objectFit: 'contain',
												objectPosition: 'center'
											}}
										/>
									)}
								</div>
							</div>
						)}
					</div>
				</Slide>
			</LoadingOverlay>
		</Slider>
	);
};

UploadOrEditViral.propTypes = {
	open: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
	isEdit: PropTypes.bool.isRequired,
	title: PropTypes.string.isRequired,
	heading1: PropTypes.string.isRequired,
	buttonText: PropTypes.string.isRequired,
	page: PropTypes.string
};

export default UploadOrEditViral;
