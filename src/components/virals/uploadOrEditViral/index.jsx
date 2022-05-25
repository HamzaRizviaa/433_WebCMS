import React, { useState, useEffect, useRef } from 'react';
// import classes from './_uploadOrEditViral.module.scss';
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
import validateDraft from '../../../utils/validateDraft';
import { Tooltip, Fade } from '@mui/material';
import ToggleSwitch from '../../switch';
// import Fade from '@mui/material/Fade';
import Slide from '@mui/material/Slide';
import PrimaryLoader from '../../PrimaryLoader';
import { ReactComponent as Info } from '../../../assets/InfoButton.svg';
import LoadingOverlay from 'react-loading-overlay';
import { useStyles } from './index.styles';
import { useStyles as globalUseStyles } from '../../../styles/global.style';
import DeleteModal from '../../DeleteModal';
const UploadOrEditViral = ({
	open,
	handleClose,
	title,
	isEdit,
	heading1,
	buttonText,
	page,
	status //draft or publish
}) => {
	const [fileRejectionError, setFileRejectionError] = useState('');
	const [postButtonStatus, setPostButtonStatus] = useState(false);
	const [deleteBtnStatus, setDeleteBtnStatus] = useState(false);
	const [isLoadingcreateViral, setIsLoadingcreateViral] = useState(false);
	const [previewFile, setPreviewFile] = useState(null);
	const [previewBool, setPreviewBool] = useState(false);
	const [postLabels, setPostLabels] = useState([]);
	const [extraLabel, setExtraLabel] = useState('');
	const [disableDropdown, setDisableDropdown] = useState(true);
	const [fileWidth, setFileWidth] = useState(0);
	const [fileHeight, setFileHeight] = useState(0);
	const [editBtnDisabled, setEditBtnDisabled] = useState(false);
	const [draftBtnDisabled, setDraftBtnDisabled] = useState(false);
	const [isError, setIsError] = useState({});
	const [openDeletePopup, setOpenDeletePopup] = useState(false);
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
	const loadingRef = useRef(null);
	const dialogWrapper = useRef(null);
	const classes = useStyles();
	const globalClasses = globalUseStyles();
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

	useEffect(() => {
		validateForm(form);
	}, [form]);

	useEffect(() => {
		if (specificViral) {
			if (specificViral?.labels) {
				let _labels = [];
				specificViral.labels.map((label) =>
					_labels.push({ id: -1, name: label })
				);
				// setSelectedLabels(_labels);
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

			setForm((prev) => {
				return { ...prev, uploadedFiles: [...form.uploadedFiles, ...newFiles] };
			});
		}
	}, [acceptedFiles]);

	const resetState = () => {
		setPostButtonStatus(false);
		setTimeout(() => {
			setDeleteBtnStatus(false);
		}, 1000);
		setPreviewFile(null);
		setPreviewBool(false);
		setDisableDropdown(true);
		setFileHeight(0);
		setFileWidth(0);
		setIsError({});
		setForm({
			caption: '',
			dropbox_url: '',
			uploadedFiles: [],
			labels: [],
			show_likes: false,
			show_comments: false
		});
	};

	const toggleDeleteModal = () => {
		setOpenDeletePopup(!openDeletePopup);
	};

	const handleDeleteFile = (id) => {
		setForm((prev) => {
			return {
				...prev,
				uploadedFiles: form.uploadedFiles.filter((file) => file.id !== id)
			};
		});
	};

	const validateViralBtn = () => {
		setIsError({
			caption: !form.caption,
			uploadedFiles: form.uploadedFiles.length < 1,
			selectedLabels: form.labels.length < 7
		});
		setTimeout(() => {
			setIsError({});
		}, 5000);
	};

	const createViral = async (id, file, draft = false) => {
		setPostButtonStatus(true);
		try {
			const result = await axios.post(
				`${process.env.REACT_APP_API_ENDPOINT}/viral/add-viral`,
				{
					save_draft: draft,
					caption: form.caption,
					dropbox_url: form.dropbox_url,
					media_url: form.uploadedFiles.length
						? file?.media_url?.split('cloudfront.net/')[1] || file?.media_url
						: '',
					file_name: form.uploadedFiles.length ? file?.file_name : '',
					// 	file?.media_url?.split('cloudfront.net/')[1] || file?.media_url,
					// file_name: file?.file_name,
					thumbnail_url: form.uploadedFiles.length
						? file?.thumbnail_url?.split('cloudfront.net/')[1] ||
						  file?.thumbnail_url
						: '',
					height: fileHeight,
					width: fileWidth,
					user_data: {
						id: `${getLocalStorageDetails()?.id}`,
						first_name: `${getLocalStorageDetails()?.first_name}`,
						last_name: `${getLocalStorageDetails()?.last_name}`
					},
					show_likes: form.show_likes ? true : undefined,
					show_comments: form.show_comments ? true : undefined,
					// ...(form.show_likes ? { show_likes: true } : {}),
					// ...(form.show_comments ? { show_comments: true } : {}),
					...(isEdit && id ? { viral_id: id } : {}),
					...((!isEdit || status !== 'published') &&
					(form.labels?.length || status == 'draft')
						? { labels: [...form.labels] }
						: {})
					// ...(status !== 'published' && form.labels?.length
					// 	? { labels: [...form.labels] }
					// 	: {})
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

	const deleteViral = async (id, isDraft) => {
		setDeleteBtnStatus(true);

		try {
			const result = await axios.post(
				`${process.env.REACT_APP_API_ENDPOINT}/viral/delete-viral`,
				{
					viral_id: id,
					is_draft: isDraft
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

		setOpenDeletePopup(!openDeletePopup);
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
					form.labels.length < 7 ||
					(specificViral?.file_name === form.uploadedFiles[0]?.file_name &&
						specificViral?.caption?.trim() === form.caption.trim() &&
						specificViral?.dropbox_url?.trim() === form.dropbox_url.trim() &&
						specificViral?.show_likes === form.show_likes &&
						specificViral?.show_comments === form.show_comments)
			);
		}
	}, [specificViral, form]);

	useEffect(() => {
		if (specificViral) {
			// console.log(specificViral, Object.keys(specificViral), 'specificViral');
			setDraftBtnDisabled(
				!validateDraft(form) ||
					(specificViral?.file_name === form.uploadedFiles[0]?.file_name &&
						specificViral?.caption?.trim() === form.caption.trim() &&
						specificViral?.dropbox_url?.trim() === form.dropbox_url.trim() &&
						specificViral?.show_likes === form.show_likes &&
						specificViral?.show_comments === form.show_comments &&
						specificViral?.labels?.length === form?.labels?.length &&
						!checkDuplicateLabel())
			);
		}
	}, [specificViral, form]);

	const checkDuplicateLabel = () => {
		let formLabels = form?.labels?.map((formL) => {
			if (specificViral?.labels?.includes(formL.name)) {
				return true;
			} else {
				return false;
			}
		});
		return formLabels.some((label) => label === false);
	};

	const handlePostSaveBtn = async () => {
		setIsLoadingcreateViral(false);
		if (!validateForm(form) || (editBtnDisabled && status === 'published')) {
			validateViralBtn();
		} else {
			setPostButtonStatus(true);
			loadingRef.current.scrollIntoView({ behavior: 'smooth' });
			if (isEdit) {
				setIsLoadingcreateViral(true);
				// let uploadFilesPromiseArray = form.uploadedFiles.map(async (_file) => {
				// 	if (_file.file) {
				// 		return await uploadFileToServer(_file, 'virallibrary');
				// 	} else {
				// 		return _file;
				// 	}
				// });

				let uploadedFile = form.uploadedFiles[0];
				if (form.uploadedFiles[0]?.file) {
					uploadedFile = await uploadFileToServer(
						form.uploadedFiles[0],
						'virallibrary'
					);
				}

				try {
					createViral(specificViral?.id, uploadedFile);
				} catch {
					setIsLoadingcreateViral(false);
				}

				// Promise.all([...uploadFilesPromiseArray])
				// 	.then((mediaFiles) => {
				// 		createViral(specificViral?.id, mediaFiles);
				// 	})
				// 	.catch(() => {
				// 		setIsLoadingcreateViral(false);
				// 	});
			} else {
				setIsLoadingcreateViral(true);
				// let uploadFilesPromiseArray = form.uploadedFiles.map(async (_file) => {
				// 	return uploadFileToServer(_file, 'virallibrary');
				// });
				let uploadedFile = await uploadFileToServer(
					form.uploadedFiles[0],
					'virallibrary'
				);
				try {
					createViral(null, uploadedFile);
				} catch {
					setIsLoadingcreateViral(false);
				}

				// Promise.all([...uploadFilesPromiseArray])
				// 	.then((mediaFiles) => {
				// 		createViral(null, mediaFiles);
				// 	})
				// 	.catch(() => {
				// 		setIsLoadingcreateViral(false);
				// 	});
			}
		}
	};
	const validateDraftBtn = () => {
		if (isEdit) {
			setIsError({
				draftError: draftBtnDisabled
			});

			setTimeout(() => {
				setIsError({});
			}, 5000);
		} else {
			setIsError({
				caption: !form.caption,
				uploadedFiles: form.uploadedFiles.length < 1,
				selectedLabels: form.labels.length < 1
			});

			setTimeout(() => {
				setIsError({});
			}, 5000);
		}
	};

	const handleViralDraftBtn = async () => {
		setIsLoadingcreateViral(false);
		if (!validateDraft(form) || draftBtnDisabled) {
			validateDraftBtn();
		} else {
			setPostButtonStatus(true);
			loadingRef.current.scrollIntoView({ behavior: 'smooth' });
			if (isEdit) {
				// let uploadedFile;
				setIsLoadingcreateViral(true);
				// let uploadFilesPromiseArray = form.uploadedFiles.map(async (_file) => {
				// 	if (_file.file) {
				// 		return await uploadFileToServer(_file, 'virallibrary');
				// 	} else {
				// 		return _file;
				// 	}
				// });
				let uploadedFile = form.uploadedFiles[0];
				if (form.uploadedFiles[0]?.file) {
					uploadedFile = await uploadFileToServer(
						form.uploadedFiles[0],
						'virallibrary'
					);
				}

				try {
					createViral(specificViral?.id, uploadedFile, true);
				} catch {
					setIsLoadingcreateViral(false);
				}

				// Promise.all([...uploadFilesPromiseArray])
				// 	.then((mediaFiles) => {
				// 		createViral(specificViral?.id, mediaFiles);
				// 	})
				// 	.catch(() => {
				// 		setIsLoadingcreateViral(false);
				// 	});
			} else {
				setIsLoadingcreateViral(true);
				// let uploadFilesPromiseArray = form.uploadedFiles.map(async (_file) => {
				// 	return uploadFileToServer(_file, 'virallibrary');
				// });

				let uploadedFile = await uploadFileToServer(
					form.uploadedFiles[0],
					'virallibrary'
				);

				try {
					createViral(null, uploadedFile, true);
				} catch {
					setIsLoadingcreateViral(false);
				}

				// Promise.all([...uploadFilesPromiseArray])
				// 	.then((mediaFiles) => {
				// 		createViral(null, mediaFiles);
				// 	})
				// 	.catch(() => {

				// 	});
			}
		}
	};

	return (
		<>
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
				dialogRef={dialogWrapper}
			>
				<LoadingOverlay
					active={isLoadingcreateViral}
					className={classes.loadingOverlay}
					spinner={<PrimaryLoader />}
				>
					<Slide in={true} direction='up' {...{ timeout: 400 }}>
						<div
							ref={loadingRef}
							className={`${
								previewFile != null
									? globalClasses.previewContentWrapper
									: globalClasses.contentWrapper
							}`}
						>
							{specificViralStatus === 'loading' ? <PrimaryLoader /> : <></>}
							<div
								className={globalClasses.contentWrapperNoPreview}
								style={{ width: previewFile != null ? '60%' : 'auto' }}
							>
								<div>
									<div className={globalClasses.explanationWrapper}>
										<h5>{heading1}</h5>
										<Tooltip
											TransitionComponent={Fade}
											TransitionProps={{ timeout: 800 }}
											title='Default encoding for videos should be H.264'
											arrow
											componentsProps={{
												tooltip: { className: globalClasses.toolTip },
												arrow: { className: globalClasses.toolTipArrow }
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
											className={globalClasses.dropZoneContainer}
											style={{
												borderColor: isError.uploadedFiles
													? '#ff355a'
													: 'yellow'
											}}
										>
											<div
												{...getRootProps({ className: globalClasses.dropzone })}
											>
												<input {...getInputProps()} />
												<AddCircleOutlineIcon
													className={globalClasses.addFilesIcon}
												/>
												<p className={globalClasses.dragMsg}>
													Click or drag files to this area to upload
												</p>
												<p className={globalClasses.formatMsg}>
													Supported formats are jpeg, png and mp4
												</p>
												<p className={globalClasses.uploadMediaError}>
													{isError.uploadedFiles
														? 'You need to upload a media in order to post'
														: ''}
												</p>
											</div>
										</section>
									)}
									<p className={globalClasses.fileRejectionError}>
										{fileRejectionError}
									</p>
									<div className={globalClasses.dropBoxUrlContainer}>
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
												className: classes.textFieldInput
											}}
										/>
									</div>

									<div className={classes.captionContainer}>
										<h6
											className={
												isError.selectedLabels
													? globalClasses.errorState
													: globalClasses.noErrorState
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
											draftStatus={status}
										/>
									</div>
									<p className={globalClasses.mediaError}>
										{isError.selectedLabels
											? `You need to add ${
													7 - form.labels.length
											  } more labels in order to upload media`
											: isError.selectedLabelsDraft
											? 'You need to select atleast 1 label to save as draft'
											: ''}
									</p>

									<div className={classes.captionContainer}>
										<h6
											className={
												isError.caption
													? globalClasses.errorState
													: globalClasses.noErrorState
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
												className: classes.textFieldInput
											}}
											multiline
											maxRows={4}
										/>
									</div>
									<p className={globalClasses.mediaError}>
										{isError.caption ? 'You need to enter the caption' : ''}
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

									<div
										className={classes.postMediaContainer}
										style={{ marginBottom: '1rem' }}
									>
										<div className={classes.postMediaHeader}>
											<h5>Show likes</h5>
											<ToggleSwitch
												id={2}
												checked={form.show_likes}
												onChange={(checked) =>
													setForm((prev) => {
														return { ...prev, show_likes: checked };
													})
												}
											/>
										</div>
									</div>
								</div>
								<p className={globalClasses.mediaError}>
									{isError.draftError
										? 'Something needs to be changed to save a draft'
										: ''}
								</p>

								<div className={classes.buttonDiv}>
									{isEdit || (status === 'draft' && isEdit) ? (
										<div className={classes.editBtn}>
											<Button
												disabled={false}
												button2={isEdit ? true : false}
												onClick={() => {
													if (!deleteBtnStatus) {
														toggleDeleteModal();
													}
												}}
												text={'DELETE VIRAL'}
											/>
										</div>
									) : (
										<></>
									)}

									<div className={classes.publishDraftDiv}>
										{status === 'draft' || !isEdit ? (
											<div
												className={
													isEdit ? classes.draftBtnEdit : classes.draftBtn
												}
											>
												<Button
													disabledDraft={
														isEdit ? draftBtnDisabled : !validateDraft(form)
													}
													onClick={() => handleViralDraftBtn()}
													button3={true}
													text={
														status === 'draft' && isEdit
															? 'SAVE DRAFT'
															: 'SAVE AS DRAFT'
													}
												/>
											</div>
										) : (
											<></>
										)}

										<div
											className={
												isEdit && validateForm(form)
													? classes.addMediaBtn
													: isEdit
													? classes.addMediaBtnEdit
													: classes.addMediaBtn
											}
										>
											<Button
												disabled={
													isEdit && validateForm(form) && status === 'draft'
														? false
														: isEdit
														? editBtnDisabled
														: !validateForm(form)
												}
												// disabled={isEdit ? editBtnDisabled : !validateForm(form)}
												onClick={handlePostSaveBtn}
												text={buttonText}
											/>
										</div>
									</div>
								</div>
							</div>
							{previewFile != null && (
								<div
									ref={previewRef}
									className={globalClasses.previewComponent}
								>
									<div className={globalClasses.previewHeader}>
										<Close
											onClick={() => {
												setPreviewBool(false);
												setPreviewFile(null);
											}}
											className={globalClasses.closeIcon}
										/>
										<h5>Preview</h5>
									</div>
									<div>
										{/* {console.log(previewFile, 'previewFile')} */}
										{previewFile.mime_type === 'video/mp4' ? (
											<video
												id={'my-video'}
												poster={isEdit ? previewFile.media_url : null}
												className={globalClasses.previewFile}
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
												className={globalClasses.previewFile}
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

			<DeleteModal
				open={openDeletePopup}
				// className={classes.deleteModal}
				toggle={toggleDeleteModal}
				deleteBtn={() => {
					deleteViral(specificViral?.id, status);
				}}
				text={'Viral'}
				wrapperRef={dialogWrapper}
			/>
		</>
	);
};

UploadOrEditViral.propTypes = {
	open: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
	isEdit: PropTypes.bool.isRequired,
	title: PropTypes.string.isRequired,
	heading1: PropTypes.string.isRequired,
	buttonText: PropTypes.string.isRequired,
	status: PropTypes.string.isRequired,
	page: PropTypes.string
};

export default UploadOrEditViral;
