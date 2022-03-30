import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classes from './_uploadOrEditGames.module.scss';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useDropzone } from 'react-dropzone';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { makeid } from '../../../utils/helper';
import Close from '@material-ui/icons/Close';
import { TextField, MenuItem, Select } from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Button from '../../button';
import 'react-datepicker/dist/react-datepicker.css';
import '../../../pages/PostLibrary/_calender.scss';
import { useSelector, useDispatch } from 'react-redux';
import { getLocalStorageDetails } from '../../../utils';
import { toast } from 'react-toastify';
import axios from 'axios';
import LoadingOverlay from 'react-loading-overlay';
import InputAdornment from '@mui/material/InputAdornment';
import Slide from '@mui/material/Slide';
import { getAllGames } from '../../../pages/GamesLibrary/gamesLibrarySlice';

import { ReactComponent as EyeIcon } from '../../../assets/Eye.svg';
import { ReactComponent as Deletes } from '../../../assets/Delete.svg';
import { ReactComponent as Info } from '../../../assets/InfoButton.svg';
import { ReactComponent as Timer } from '../../../assets/Timer.svg';
import { ReactComponent as Scoring } from '../../../assets/football.svg';
import { ReactComponent as Objective } from '../../../assets/Cross.svg';

const UploadOreditArcade = ({
	heading1,
	open,
	buttonText,
	editArcade,
	editJogo,
	setPreviewBool,
	previewFile,
	setPreviewFile,
	previewRef,
	setDisableDropdown,
	type, // jogo - archade
	page,
	handleClose
}) => {
	const [uploadedFiles, setUploadedFiles] = useState([]);
	const [fileRejectionError, setFileRejectionError] = useState('');
	const [fileRejectionError2, setFileRejectionError2] = useState('');
	const [uploadMediaError, setUploadMediaError] = useState('');
	const [dropZoneBorder, setDropZoneBorder] = useState('#ffff00');
	const [dropZoneBorder2, setDropZoneBorder2] = useState('#ffff00');
	const [titleGame, setTitleGame] = useState('');
	const [titleGameColor, setTitleGameColor] = useState('#ffffff');
	const [titleGameError, setTitleGameError] = useState('');
	const [descriptionGame, setDescriptionGame] = useState('');
	const [descriptionGameColor, setDescriptionGameColor] = useState('#ffffff');
	const [descriptionGameError, setDescriptionGameError] = useState('');
	const [dropboxLink, setDropboxLink] = useState('');
	const [dropboxLink2, setDropboxLink2] = useState('');
	const [time, setTime] = useState('');
	const [scoring, setScoring] = useState('');
	const [objective, setObjective] = useState('');
	const [payload, setPayload] = useState('');
	const [questionColor, setQuestionColor] = useState('#ffffff');
	const [questionError, setQuestionError] = useState('');
	const [ans1Color, setAns1Color] = useState('#ffffff');
	const [ans1Error, setAns1Error] = useState('');
	const [ans2Color, setAns2Color] = useState('#ffffff');
	const [ans2Error, setAns2Error] = useState('');
	const [payloadColor, setPayloadColor] = useState('#ffffff');
	const [payloadError, setPayloadError] = useState('');
	const [deleteBtnStatus, setDeleteBtnStatus] = useState(false);
	const [postButtonStatus, setPostButtonStatus] = useState(false);
	const [isLoadingcreateViral, setIsLoadingcreateViral] = useState(false);
	const [videoOrientation, setVideoOrientation] = useState('');
	const [videoOrientationColor, setVideoOrientationColor] = useState('#ffffff');
	const [videoOrientationError, setvideoOrientationError] = useState('');
	const [uploadedExplanationOrIcon, setUploadedExplanationOrIcon] = useState(
		[]
	);
	const [uploadExplanationOrIconError, setUploadExplanationOrIconError] =
		useState('');
	const [fileWidth, setFileWidth] = useState(null);
	const [fileHeight, setFileHeight] = useState(null);
	const videoRef = useRef(null);
	const imgRef = useRef(null);

	const dispatch = useDispatch();

	const specificGamesData = useSelector(
		(state) => state.GamesLibraryStore.specificGame
	);
	console.log(fileWidth, fileHeight, specificGamesData, '---- abc -----');

	const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
		useDropzone({
			accept: '.jpeg, .jpg, .png',
			maxFiles: 1
		});

	const {
		acceptedFiles: acceptedFiles2,
		fileRejections: fileRejections2,
		getRootProps: getRootProps2,
		getInputProps: getInputProps2
	} = useDropzone({
		accept: type === 'jogo' ? 'video/mp4' : '.jpeg, .jpg, .png',
		maxFiles: 1
	});

	const getFileType = (type) => {
		if (type) {
			let _type = type.split('/');
			return _type && _type[1];
		}
	};

	useEffect(() => {
		if (specificGamesData) {
			if (specificGamesData?.game_type === 'JOGO') {
				setDropboxLink(specificGamesData?.dropbox_urls?.image);
				setDropboxLink2(specificGamesData?.dropbox_urls?.video);
				setDescriptionGame(specificGamesData?.description);
				setTitleGame(specificGamesData?.title);
				setScoring(specificGamesData?.scoring);
				setObjective(specificGamesData?.objective);
				setPayload(specificGamesData?.payload);
				setTime(specificGamesData?.time);
				setVideoOrientation(specificGamesData?.orientation);
				setUploadedFiles([
					{
						id: makeid(10),
						fileName: specificGamesData?.game_image_file_name,
						img: `${process.env.REACT_APP_MEDIA_ENDPOINT}/${specificGamesData?.game_image?.url}`,
						type: 'image'
					}
				]);
				setUploadedExplanationOrIcon([
					{
						id: makeid(10),
						fileName: specificGamesData?.game_video_file_name,
						img: `${process.env.REACT_APP_MEDIA_ENDPOINT}/${specificGamesData?.game_video?.url}`,
						type: 'video'
					}
				]);
			}
		}
	}, [specificGamesData]);

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
					type: file.type === 'image'
				};
			});
			setUploadedFiles([...uploadedFiles, ...newFiles]);
		}
	}, [acceptedFiles]);

	useEffect(() => {
		if (acceptedFiles2?.length) {
			setUploadExplanationOrIconError('');
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
			setUploadedExplanationOrIcon([...uploadedExplanationOrIcon, ...newFiles]);
		}
	}, [acceptedFiles2]);

	useEffect(() => {
		if (fileRejections.length) {
			setFileRejectionError(
				'The uploaded file format is not matching OR max files exceeded'
			);
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

	useEffect(() => {
		if (!open) {
			resetState();
		}
		!(editJogo || editArcade) ? resetState() : '';
	}, [open]);

	const handleDeleteFile = (id) => {
		setUploadedFiles((uploadedFiles) =>
			uploadedFiles.filter((file) => file.id !== id)
		);
	};

	const handleDeleteFile2 = (id) => {
		setUploadedExplanationOrIcon((uploadedExplanationOrIcon) =>
			uploadedExplanationOrIcon.filter((file) => file.id !== id)
		);
	};

	// const uploadFileToServer = async (uploadedFile) => {
	// 	try {
	// 		const result = await axios.post(
	// 			`${process.env.REACT_APP_API_ENDPOINT}/media-upload/get-signed-url`,
	// 			{
	// 				file_type: uploadedFile.fileExtension,
	// 				parts: 1
	// 			},
	// 			{
	// 				headers: {
	// 					Authorization: `Bearer ${getLocalStorageDetails()?.access_token}`
	// 				}
	// 			}
	// 		);
	// 		// const frame = captureVideoFrame('my-video', 'png');
	// 		// if (result?.data?.data?.video_thumbnail_url) {
	// 		// 	await axios.put(result?.data?.data?.video_thumbnail_url, frame.blob, {
	// 		// 		headers: { 'Content-Type': 'image/png' }
	// 		// 	});
	// 		// }
	// 		if (result?.data?.data?.url) {
	// 			const _result = await axios.put(
	// 				result?.data?.data?.url,
	// 				uploadedFile.file,
	// 				{
	// 					headers: { 'Content-Type': uploadedFile.mime_type }
	// 				}
	// 			);

	// 			if (_result?.status === 200) {
	// 				const uploadResult = await axios.post(
	// 					`${process.env.REACT_APP_API_ENDPOINT}/media-upload/complete-upload`,
	// 					{
	// 						file_name: uploadedFile.file.name,
	// 						type: 'questionLibrary',
	// 						data: {
	// 							bucket: 'media',
	// 							multipart_upload:
	// 								uploadedFile?.mime_type == 'video/mp4'
	// 									? [
	// 											{
	// 												e_tag: _result?.headers?.etag.replace(/['"]+/g, ''),
	// 												part_number: 1
	// 											}
	// 									  ]
	// 									: ['image'],
	// 							keys: {
	// 								image_key: result?.data?.data?.keys?.image_key,
	// 								video_key: result?.data?.data?.keys?.video_key,
	// 								audio_key: ''
	// 							},
	// 							upload_id:
	// 								uploadedFile?.mime_type == 'video/mp4'
	// 									? result?.data?.data?.upload_id
	// 									: 'image'
	// 						}
	// 					},
	// 					{
	// 						headers: {
	// 							Authorization: `Bearer ${
	// 								getLocalStorageDetails()?.access_token
	// 							}`
	// 						}
	// 					}
	// 				);
	// 				if (uploadResult?.data?.status_code === 200) {
	// 					return uploadResult.data.data;
	// 				} else {
	// 					throw 'Error';
	// 				}
	// 			} else {
	// 				throw 'Error';
	// 			}
	// 		} else {
	// 			throw 'Error';
	// 		}
	// 	} catch (error) {
	// 		console.log('Error');
	// 		return null;
	// 	}
	// };

	// const createQuestion = async (id, mediaFiles = []) => {
	// 	setPostButtonStatus(true);

	// 	try {
	// 		const result = await axios.post(
	// 			`${process.env.REACT_APP_API_ENDPOINT}/question/add-question`,
	// 			{
	// 				...(question ? { question: question } : { question: '' }),
	// 				...(dropboxLink ? { dropbox_url: dropboxLink } : {}),
	// 				...(!(editArcade || editJogo)
	// 					? { image: mediaFiles[0]?.media_url }
	// 					: {}),
	// 				...(convertedDate ? { end_date: convertedDate } : {}),
	// 				...(!(editArcade || editJogo)
	// 					? quiz
	// 						? { question_type: 'quiz' }
	// 						: { question_type: 'poll' }
	// 					: {}),
	// 				...(!(editArcade || editJogo)
	// 					? {
	// 							answers: [
	// 								{ answer: ans1, type: quiz ? 'right_answer' : 'poll' },
	// 								{ answer: ans2, type: quiz ? 'wrong_answer' : 'poll' }
	// 							]
	// 					  }
	// 					: {}),
	// 				...(!(editArcade || editJogo) && selectedLabels.length
	// 					? { labels: [...selectedLabels] }
	// 					: {}),
	// 				...((editArcade || editJogo) && id ? { question_id: id } : {})
	// 			},
	// 			{
	// 				headers: {
	// 					Authorization: `Bearer ${getLocalStorageDetails()?.access_token}`
	// 				}
	// 			}
	// 		);
	// 		if (result?.data?.status_code === 200) {
	// 			toast.success(
	// 				editArcade || editJogo
	// 					? 'Question has been edited!'
	// 					: 'Question has been created!'
	// 			);
	// 			setIsLoadingcreateViral(false);
	// 			setPostButtonStatus(false);
	// 			handleClose();
	// 			dispatch(getQuestions({ page }));
	// 			dispatch(getQuestionLabels());
	// 		}
	// 	} catch (e) {
	// 		toast.error(
	// 			editArcade || editJogo
	// 				? 'Failed to edit question!'
	// 				: 'Failed to create question!'
	// 		);
	// 		setIsLoadingcreateViral(false);
	// 		setPostButtonStatus(false);
	// 		console.log(e);
	// 	}
	// };

	const deleteGame = async (id) => {
		setDeleteBtnStatus(true);
		try {
			const result = await axios.post(
				`${process.env.REACT_APP_API_ENDPOINT}/games/delete-game`,
				{
					game_id: id
				},
				{
					headers: {
						Authorization: `Bearer ${getLocalStorageDetails()?.access_token}`
					}
				}
			);
			if (result?.data?.status_code === 200) {
				toast.success('Question has been deleted!');
				handleClose();

				//setting a timeout for getting post after delete.
				dispatch(getAllGames({ page }));
			}
		} catch (e) {
			toast.error('Failed to delete Question!');
			setDeleteBtnStatus(false);
			console.log(e);
		}
	};

	const resetState = () => {
		setUploadedFiles([]);
		setUploadedExplanationOrIcon([]);
		setFileRejectionError('');
		setFileRejectionError2('');
		setDropboxLink('');
		setDropboxLink2('');
		setUploadMediaError('');
		setTitleGameError('');
		setTitleGame('');
		setDescriptionGame('');
		setDescriptionGameError('');
		setDescriptionGameColor('#ffffff');
		setPayloadError('');
		setPayloadColor('#ffffff');
		setUploadExplanationOrIconError('');
		setDropZoneBorder('#ffff00');
		setDropZoneBorder2('#ffff00');
		setTitleGameColor('#ffffff');
		setPreviewFile(null);
		setPreviewBool(false);
		setTime('');
		setScoring('');
		setObjective('');
		setDisableDropdown(true);
		setTimeout(() => {
			setDeleteBtnStatus(false);
		}, 1000);
		setPostButtonStatus(false);
		setVideoOrientation('');
		setVideoOrientationColor('#ffffff');
		setvideoOrientationError('');
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
		if (!videoOrientation) {
			setVideoOrientationColor('#ff355a');
			setvideoOrientationError('You need to enter an orientation');
			setTimeout(() => {
				setVideoOrientationColor('#ffffff');
				setvideoOrientationError('');
			}, [5000]);
		}
		if (uploadedExplanationOrIcon.length < 1) {
			setDropZoneBorder2('#ff355a');
			setUploadExplanationOrIconError(
				'You need to upload a media in order to post'
			);
			setTimeout(() => {
				setDropZoneBorder2('#ffff00');
				setUploadExplanationOrIconError('');
			}, [5000]);
		}
		if (!titleGame) {
			setTitleGameColor('#ff355a');
			setTitleGameError('You need to enter a Title');
			setTimeout(() => {
				setTitleGameColor('#ffffff');
				setTitleGameError('');
			}, [5000]);
		}
		if (!descriptionGame) {
			setDescriptionGameColor('#ff355a');
			setDescriptionGameError('You need to enter a Description');
			setTimeout(() => {
				setDescriptionGameColor('#ffffff');
				setDescriptionGameError('');
			}, [5000]);
		}
		if (!time) {
			setQuestionColor('#ff355a');
			setQuestionError('You need to provide a time in order to post');
			setTimeout(() => {
				setQuestionColor('#ffffff');
				setQuestionError('');
			}, [5000]);
		}
		if (!scoring) {
			setAns1Color('#ff355a');
			setAns1Error('You need to provide scoring in order to post');
			setTimeout(() => {
				setAns1Color('#ffffff');
				setAns1Error('');
			}, [5000]);
		}
		if (!objective) {
			setAns2Color('#ff355a');
			setAns2Error('You need to provide objective in order to post');
			setTimeout(() => {
				setAns2Color('#ffffff');
				setAns2Error('');
			}, [5000]);
		}
		if (!payload) {
			setPayloadColor('#ff355a');
			setPayloadError('You need to provide payload in order to post');
			setTimeout(() => {
				setPayloadColor('#ffffff');
				setPayloadError('');
			}, [5000]);
		}
	};

	const handleTitleDuplicate = async (givenTitle) => {
		try {
			const result = await axios.get(
				`${process.env.REACT_APP_API_ENDPOINT}/games/check/${givenTitle}`,
				{
					headers: {
						Authorization: `Bearer ${getLocalStorageDetails()?.access_token}`
					}
				}
			);
			return result?.data?.message;
		} catch (error) {
			console.log('Error');
			return null;
		}
	};

	const addQuizBtnDisabled =
		!uploadedFiles.length ||
		!videoOrientation ||
		!uploadedExplanationOrIcon ||
		postButtonStatus ||
		!titleGame ||
		!descriptionGame ||
		!time ||
		!scoring ||
		!objective ||
		!payload;

	return (
		<LoadingOverlay active={isLoadingcreateViral} spinner text='Loading...'>
			<Slide in={true} direction='up' {...{ timeout: 200 }}>
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
							<h5 className={classes.QuizQuestion}>{heading1}</h5>
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
															<img
																ref={imgRef}
																onLoad={() => {
																	setFileWidth(imgRef.current.naturalWidth);
																	setFileHeight(imgRef.current.naturalHeight);
																}}
																src={file.img}
																className={classes.fileThumbnail}
															/>
															<p className={classes.fileName}>
																{file.fileName}
															</p>
														</div>

														<div className={classes.filePreviewRight}>
															{editArcade || editJogo ? (
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
																			handleDeleteFile(file.id);
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
							{!uploadedFiles.length && !editArcade && !editJogo && (
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
											Click or drag file to this area to upload
										</p>
										<p className={classes.formatMsg}>
											Supported formats are jpeg and png
										</p>
										<p className={classes.uploadMediaError}>
											{uploadMediaError}
										</p>
									</div>
								</section>
							)}
							<p className={classes.fileRejectionError}>{fileRejectionError}</p>

							<div className={classes.titleContainer}>
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

							{type === 'jogo' ? (
								<>
									<div className={classes.explanationWrapper}>
										<h5>Add Game Explanation Video</h5>
										<Info />
									</div>

									<div className={classes.titleContainer}>
										<h6 style={{ color: videoOrientationColor }}>
											SELECT GAME EXPLANATION VIDEO ORIENTATION
										</h6>
										<Select
											onOpen={() => {
												setDisableDropdown(false);
											}}
											onClose={() => {
												setDisableDropdown(true);
											}}
											disabled={false}
											style={{
												backgroundColor: editJogo ? '#404040' : '#000000'
											}}
											value={videoOrientation}
											onChange={(e) => {
												setDisableDropdown(true);
												setVideoOrientation(e.target.value);
												// setMainCategoryLabelColor('#ffffff');
												// setMainCategoryError('');
												// if (uploadedFiles.length) {
												// 	uploadedFiles.map((file) => handleDeleteFile(file.id));
												// }
											}}
											className={`${classes.select} ${
												editJogo && `${classes.isEditSelect}`
											}`}
											disableUnderline={true}
											IconComponent={(props) => (
												<KeyboardArrowDownIcon
													{...props}
													style={{
														display: editJogo ? 'none' : 'block',
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
											// renderValue={(value) =>
											// 	value?.length
											// 		? Array.isArray(value)
											// 			? value.join(', ')
											// 			: value
											// 		: 'Please Select Orientation'
											// }
										>
											<MenuItem value={10}>Portrait</MenuItem>
											<MenuItem value={20}>Landscape</MenuItem>
										</Select>
									</div>
									<p className={classes.mediaError}>{videoOrientationError}</p>
								</>
							) : (
								<></>
							)}
							<DragDropContext>
								<Droppable droppableId='droppable-2'>
									{(provided) => (
										<div
											{...provided.droppableProps}
											ref={provided.innerRef}
											className={classes.uploadedFilesContainer}
										>
											{uploadedExplanationOrIcon.map((file, index) => {
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
																		poster={editJogo ? file.img : null}
																		className={classes.fileThumbnail}
																		style={{
																			objectFit: 'cover',
																			objectPosition: 'center'
																		}}
																		ref={videoRef}
																		onLoadedMetadata={() => {
																			setFileWidth(videoRef.current.videoWidth);
																			setFileHeight(
																				videoRef.current.videoHeight
																			);
																		}}
																	>
																		<source src={file.img} />
																	</video>{' '}
																</>
															) : (
																<>
																	<img
																		src={file.img}
																		className={classes.fileThumbnail}
																		style={{
																			objectFit: 'cover',
																			objectPosition: 'center'
																		}}
																		ref={videoRef}
																		onLoad={() => {
																			setFileWidth(
																				videoRef.current.naturalWidth
																			);
																			setFileHeight(
																				videoRef.current.naturalHeight
																			);
																		}}
																	/>{' '}
																</>
															)}

															<p className={classes.fileName}>
																{file.fileName}
															</p>
														</div>

														<div className={classes.filePreviewRight}>
															{editJogo ? (
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
							{!uploadedExplanationOrIcon.length && !editJogo && (
								<section
									className={classes.dropZoneContainer}
									style={{
										borderColor: dropZoneBorder2
									}}
								>
									<div {...getRootProps2({ className: classes.dropzone })}>
										<input {...getInputProps2()} />
										<AddCircleOutlineIcon className={classes.addFilesIcon} />
										<p className={classes.dragMsg}>
											Click or drag file to this area to upload
										</p>
										<p className={classes.formatMsg}>
											Supported formats are{' '}
											{type === 'jogo' ? 'mp4' : 'jpeg and png'}
										</p>
										<p className={classes.uploadMediaError}>
											{uploadExplanationOrIconError}
										</p>
									</div>
								</section>
							)}
							<p className={classes.fileRejectionError}>
								{fileRejectionError2}
							</p>

							<div className={classes.titleContainer}>
								<h6>DROPBOX URL</h6>
								<TextField
									value={dropboxLink2}
									onChange={(e) => setDropboxLink2(e.target.value)}
									placeholder={'Please drop the dropbox URL here'}
									className={classes.textField}
									multiline
									maxRows={2}
									InputProps={{
										disableUnderline: true,
										className: classes.textFieldInput,
										style: {
											borderRadius: dropboxLink2 ? '16px' : '40px'
										}
									}}
								/>
							</div>

							<div className={classes.titleContainer}>
								<div className={classes.characterCount}>
									<h6 style={{ color: titleGameColor }}>TITLE</h6>
									<h6
										style={{
											color:
												titleGame?.length >= 25 && titleGame?.length <= 27
													? 'pink'
													: titleGame?.length === 28
													? 'red'
													: 'white'
										}}
									>
										{titleGame?.length}/28
									</h6>
								</div>
								<TextField
									value={titleGame}
									onChange={(e) => {
										setTitleGame(e.target.value);
										setTitleGameError('');
										setTitleGameColor('#ffffff');
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
							<p className={classes.mediaError}>{titleGameError}</p>

							<div className={classes.titleContainer}>
								<div className={classes.characterCount}>
									<h6 style={{ color: descriptionGameColor }}>
										GAME DESCRIPTION
									</h6>
									<h6
										style={{
											color:
												descriptionGame?.length >= 75 &&
												descriptionGame?.length <= 83
													? 'pink'
													: descriptionGame?.length === 84
													? 'red'
													: 'white'
										}}
									>
										{descriptionGame?.length}/84
									</h6>
								</div>
								<TextField
									value={descriptionGame}
									onChange={(e) => {
										setDescriptionGame(e.target.value);
										setDescriptionGameError('');
										setDescriptionGameColor('#ffffff');
									}}
									placeholder={'Please write your description here'}
									className={classes.textField}
									InputProps={{
										disableUnderline: true,
										className: classes.textFieldInput
									}}
									inputProps={{ maxLength: 84 }}
									multiline
									maxRows={2}
								/>
							</div>
							<p className={classes.mediaError}>{descriptionGameError}</p>

							{type === 'jogo' ? (
								<>
									<div className={classes.titleContainer}>
										<h6 style={{ color: questionColor }}>TIME</h6>
										<TextField
											disabled={editArcade || editJogo}
											value={time}
											onChange={(e) => {
												setTime(e.target.value);
											}}
											placeholder={'Please write the game duration here'}
											className={classes.textField}
											InputProps={{
												disableUnderline: true,
												className: `${classes.textFieldInputStartAdornment}  ${
													(editArcade || editJogo) && classes.disableTextField
												}`,
												startAdornment: (
													<InputAdornment position='start'>
														<Timer />
													</InputAdornment>
												)
											}}
											multiline
											maxRows={2}
										/>
									</div>

									<p className={classes.mediaError}>{questionError}</p>

									<div className={classes.titleContainer}>
										<h6 style={{ color: ans1Color }}>SCORING</h6>
										<TextField
											disabled={editArcade || editJogo}
											value={scoring}
											onChange={(e) => {
												setScoring(e.target.value);
											}}
											placeholder={'Please write the game scoring here'}
											className={classes.textField}
											InputProps={{
												disableUnderline: true,
												className: `${classes.textFieldInputStartAdornment}  ${
													(editArcade || editJogo) && classes.disableTextField
												}`,
												startAdornment: (
													<InputAdornment position='start'>
														<Scoring />
													</InputAdornment>
												)
											}}
											multiline
											maxRows={1}
										/>
									</div>

									<p className={classes.mediaError}>{ans1Error}</p>

									<div className={classes.titleContainer}>
										<h6 style={{ color: ans2Color }}>OBJECTIVE</h6>

										<TextField
											disabled={editArcade || editJogo}
											value={objective}
											onChange={(e) => {
												setObjective(e.target.value);
											}}
											placeholder={'Please write the game objective here'}
											className={classes.textField}
											InputProps={{
												disableUnderline: true,
												className: `${classes.textFieldInputStartAdornment}  ${
													(editArcade || editJogo) && classes.disableTextField
												}`,
												startAdornment: (
													<InputAdornment position='start'>
														<Objective />
													</InputAdornment>
												)
											}}
											multiline
											maxRows={1}
										/>
									</div>

									<p className={classes.mediaError}>{ans2Error}</p>

									<div className={classes.titleContainer}>
										<h6 style={{ color: payloadColor }}>PAYLOAD</h6>

										<TextField
											disabled={editArcade || editJogo}
											value={payload}
											onChange={(e) => {
												setPayload(e.target.value);
											}}
											placeholder={'Please write the payload here'}
											className={classes.textField}
											InputProps={{
												disableUnderline: true,
												className: `${classes.textFieldInput}  ${
													(editArcade || editJogo) && classes.disableTextField
												}`
											}}
											multiline
											maxRows={2}
										/>
									</div>

									<p className={classes.mediaError}>{payloadError}</p>
								</>
							) : (
								<></>
							)}
						</div>

						<div className={classes.buttonDiv}>
							{editArcade || editJogo ? (
								<div className={classes.editBtn}>
									<Button
										disabled={deleteBtnStatus}
										button2={editArcade || editJogo ? true : false}
										onClick={() => {
											if (!deleteBtnStatus) {
												//console.log('specific', specificGamesData.id);
												deleteGame(specificGamesData?.id);
											}
										}}
										text={'DELETE GAME'}
									/>
								</div>
							) : (
								<></>
							)}

							<div
								className={
									editArcade || editJogo
										? classes.addQuizBtnEdit
										: classes.addQuizBtn
								}
							>
								<Button
									disabled={addQuizBtnDisabled}
									onClick={async () => {
										if (addQuizBtnDisabled) {
											validatePostBtn();
										} else {
											setPostButtonStatus(true);
											if (
												(await handleTitleDuplicate(titleGame)) ===
												'The Title Already Exist'
												// 	200 &&
												// articleTitle !== specificArticle?.title
											) {
												setTitleGameColor('#ff355a');
												setTitleGameError('This title already exists');
												setTimeout(() => {
													setTitleGameColor('#ffffff');
													setTitleGameError('');
												}, [5000]);

												setPostButtonStatus(false);
												return;
											}

											if (editArcade || editJogo) {
												// createQuestion(specificGamesData?.id);
											} else {
												setIsLoadingcreateViral(true);
												let uploadFilesPromiseArray = uploadedFiles
													.map
													// async (_file) => {
													// 	 return uploadFileToServer(_file);
													// }
													();

												Promise.all([...uploadFilesPromiseArray])
													.then((mediaFiles) => {
														console.log(mediaFiles, 'media files ');
														// createQuestion(null, mediaFiles);
													})
													.catch(() => {
														setIsLoadingcreateViral(false);
													});
											}
										}
									}}
									// text={type === 'quiz' ? 'ADD QUIZ' : 'ADD POLL'}
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
										poster={editJogo ? previewFile.img : null}
										className={classes.previewFile}
										style={{
											width: '100%',
											height: `${8 * 4}rem`,
											objectFit: 'contain',
											objectPosition: 'center'
										}}
										controls={true}
									>
										<source src={previewFile.img} />
									</video>
								) : (
									<img
										src={previewFile.img}
										className={classes.previewFile}
										style={{
											width: '100%',
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
	);
};

UploadOreditArcade.propTypes = {
	heading1: PropTypes.string.isRequired,
	open: PropTypes.bool.isRequired,
	buttonText: PropTypes.string.isRequired,
	setPreviewBool: PropTypes.func.isRequired,
	previewFile: PropTypes.bool.isRequired,
	setPreviewFile: PropTypes.func.isRequired,
	previewRef: PropTypes.oneOfType([
		PropTypes.func,
		PropTypes.shape({ current: PropTypes.elementType })
	]).isRequired,
	setDisableDropdown: PropTypes.func.isRequired,
	editJogo: PropTypes.bool, // poll
	editArcade: PropTypes.bool, // quiz
	page: PropTypes.string,
	type: PropTypes.string, //JOGO OR ARCADE
	handleClose: PropTypes.func.isRequired
};

export default UploadOreditArcade;
