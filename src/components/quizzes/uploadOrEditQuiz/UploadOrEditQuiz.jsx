/* eslint-disable no-unused-vars */
/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import React, { forwardRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classes from './_uploadOrEditQuiz.module.scss';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useDropzone } from 'react-dropzone';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { makeid } from '../../../utils/helper';
import Close from '@material-ui/icons/Close';
import { TextField } from '@material-ui/core';
import { Autocomplete, Paper, Popper } from '@mui/material';
import Button from '../../button';
import ClearIcon from '@material-ui/icons/Clear';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../../../pages/PostLibrary/_calender.scss';
import { formatDate, getCalendarText2 } from '../../../utils';
import { useDispatch, useSelector } from 'react-redux';
import {
	getQuestionLabels,
	getQuestionEdit,
	getQuestions
} from '../../../pages/QuestionLibrary/questionLibrarySlice';
import { getLocalStorageDetails } from '../../../utils';
import { toast } from 'react-toastify';
import axios from 'axios';
import LoadingOverlay from 'react-loading-overlay';

import { ReactComponent as EyeIcon } from '../../../assets/Eye.svg';
import { ReactComponent as Deletes } from '../../../assets/Delete.svg';
import { ReactComponent as CalenderYellow } from '../../../assets/Calender_Yellow.svg';

const UploadOrEditQuiz = ({
	heading1,
	open,
	buttonText,
	editQuiz,
	editPoll,
	setPreviewBool,
	previewFile,
	setPreviewFile,
	previewRef,
	setDisableDropdown,
	quiz,
	handleClose,
	page,
	status,
	type
}) => {
	const [uploadedFiles, setUploadedFiles] = useState([]);
	const [fileRejectionError, setFileRejectionError] = useState('');
	const [uploadMediaError, setUploadMediaError] = useState('');
	const [dropZoneBorder, setDropZoneBorder] = useState('#ffff00');
	//const [previewFile, setPreviewFile] = useState(null);
	const [dropboxLink, setDropboxLink] = useState('');
	const [question, setQuestion] = useState('');
	const [ans1, setAns1] = useState('');
	const [ans2, setAns2] = useState('');
	const [selectedLabels, setSelectedLabels] = useState([]);
	const [labelColor, setLabelColor] = useState('#ffffff');
	const [labelError, setLabelError] = useState('');
	const [quizColor, setQuizColor] = useState('#ffffff');
	const [calenderError, setCalenderError] = useState('');
	const [questionColor, setQuestionColor] = useState('#ffffff');
	const [questionError, setQuestionError] = useState('');
	const [ans1Color, setAns1Color] = useState('#ffffff');
	const [ans1Error, setAns1Error] = useState('');
	const [ans2Color, setAns2Color] = useState('#ffffff');
	const [ans2Error, setAns2Error] = useState('');
	const [quizLabels, setQuizLabels] = useState([]);
	const [extraLabel, setExtraLabel] = useState('');
	const [endDate, setEndDate] = useState(null);
	const [calenderOpen, setCalenderOpen] = useState(false);
	const [deleteBtnStatus, setDeleteBtnStatus] = useState(false);
	const [postButtonStatus, setPostButtonStatus] = useState(false);
	const [isLoadingcreateViral, setIsLoadingcreateViral] = useState(false);

	const dispatch = useDispatch();

	const labels = useSelector((state) => state.questionLibrary.labels);

	const editQuestionData = useSelector(
		(state) => state.questionLibrary.questionEdit
	);

	useEffect(() => {
		if (labels.length) {
			setQuizLabels([...labels]);
		}
	}, [labels]);

	useEffect(() => {
		dispatch(getQuestionLabels());
		// !(editPoll || editQuiz) ? resetState() : '';
	}, []);

	const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => {
		const startDate = formatDate(endDate);
		return (
			<div
				className={`${classes.customDateInput} ${
					status === 'CLOSED' && classes.disableTextField
				}`}
				onClick={onClick}
				ref={ref}
				//style={{ borderColor: noResultCalendarBorder }}
			>
				{getCalendarText2(startDate)}
				<span
					style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
				>
					<CalenderYellow
						onClick={(e) => {
							// e.preventDefault();
							// e.stopPropagation();
						}}
					/>
				</span>
			</div>
		);
	});

	const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
		useDropzone({
			accept: 'image/jpeg, image/png',
			maxFiles: 1
		});

	const getFileType = (type) => {
		if (type) {
			let _type = type.split('/');
			return _type && _type[1];
		}
	};

	// useEffect(() => {
	// 	if (editQuiz || editPoll) {
	// 		setUploadedFiles([
	// 			{
	// 				id: makeid(10),
	// 				fileName: 'Better than Messi',
	// 				img: 'https://cdni0.trtworld.com/w960/h540/q75/34070_esp20180526ronaldo_1527420747155.JPG',
	// 				type: 'image'
	// 			}
	// 		]);
	// 		setQuestion('Ronaldo better than Messi?');
	// 		setAns1('Yes');
	// 		setAns2('Yes');

	// 		setEndDate('Tue Feb 14 2022 00:00:00 GMT+0500 (Pakistan Standard Time)');
	// 	}
	// }, [editQuiz, editPoll]);

	useEffect(() => {
		if (editQuestionData) {
			if (editQuestionData?.labels) {
				let _labels = [];
				editQuestionData.labels.map((label) =>
					_labels.push({ id: -1, name: label })
				);
				setSelectedLabels(_labels);
			}
			setDropboxLink(editQuestionData?.dropbox_url);
			setQuestion(editQuestionData?.question);
			setAns1(
				editQuestionData?.answers?.length > 0
					? editQuestionData?.answers[0]?.answer
					: ''
			);
			setAns2(
				editQuestionData?.answers?.length > 0
					? editQuestionData?.answers[1]?.answer
					: ''
			);

			setEndDate(
				editQuestionData?.quiz_end_date
					? editQuestionData?.quiz_end_date
					: editQuestionData?.poll_end_date
			);
			setUploadedFiles([
				{
					id: makeid(10),
					fileName: editQuestionData?.file_name,
					img: `${process.env.REACT_APP_MEDIA_ENDPOINT}/${editQuestionData?.image}`,
					type: 'image'
				}
			]);
		}
	}, [editQuestionData]);

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
		if (!open) {
			resetState();
		}
		!(editPoll || editQuiz) ? resetState() : '';
	}, [open]);

	useEffect(() => {
		setQuizLabels((labels) => {
			return labels.filter((label) => label.id != null);
		});
		if (extraLabel) {
			let flag = quizLabels.some((label) => label.name == extraLabel);
			if (flag == false) {
				setQuizLabels((labels) => {
					return [...labels, { id: null, name: extraLabel }];
				});
			}
		}
	}, [extraLabel]);

	const handleDeleteFile = (id) => {
		setUploadedFiles((uploadedFiles) =>
			uploadedFiles.filter((file) => file.id !== id)
		);
	};

	const handleChangeExtraLabel = (e) => {
		setExtraLabel(e.target.value.toUpperCase());
	};

	const uploadFileToServer = async (uploadedFile) => {
		try {
			const result = await axios.post(
				`${process.env.REACT_APP_API_ENDPOINT}/media-upload/get-signed-url`,
				{
					file_type: uploadedFile.fileExtension,
					parts: 1
				},
				{
					headers: {
						Authorization: `Bearer ${getLocalStorageDetails()?.access_token}`
					}
				}
			);
			// const frame = captureVideoFrame('my-video', 'png');
			// if (result?.data?.data?.video_thumbnail_url) {
			// 	await axios.put(result?.data?.data?.video_thumbnail_url, frame.blob, {
			// 		headers: { 'Content-Type': 'image/png' }
			// 	});
			// }
			if (result?.data?.data?.url) {
				const _result = await axios.put(
					result?.data?.data?.url,
					uploadedFile.file,
					{
						headers: { 'Content-Type': uploadedFile.mime_type }
					}
				);

				if (_result?.status === 200) {
					const uploadResult = await axios.post(
						`${process.env.REACT_APP_API_ENDPOINT}/media-upload/complete-upload`,
						{
							file_name: uploadedFile.file.name,
							type: 'questionLibrary',
							data: {
								bucket: 'media',
								multipart_upload:
									uploadedFile?.mime_type == 'video/mp4'
										? [
												{
													e_tag: _result?.headers?.etag.replace(/['"]+/g, ''),
													part_number: 1
												}
										  ]
										: ['image'],
								keys: {
									image_key: result?.data?.data?.keys?.image_key,
									video_key: result?.data?.data?.keys?.video_key,
									audio_key: ''
								},
								upload_id:
									uploadedFile?.mime_type == 'video/mp4'
										? result?.data?.data?.upload_id
										: 'image'
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
					if (uploadResult?.data?.status_code === 200) {
						return uploadResult.data.data;
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

	const createQuestion = async (id, mediaFiles = []) => {
		setPostButtonStatus(true);
		console.log(mediaFiles, id, 'abc=============');
		try {
			const result = await axios.post(
				`${process.env.REACT_APP_API_ENDPOINT}/question/add-question`,
				{
					image: mediaFiles[0]?.media_url,
					end_date: endDate,
					question_id: id ? id : null,
					...(question ? { question: question } : { question: '' }),
					...(dropboxLink ? { dropbox_url: dropboxLink } : {}),
					// ...(!(editQuiz || editPoll)
					// 	? { image: mediaFiles[0]?.media_url }
					// 	: { image: mediaFiles[0]?.media_url }),
					// ...(!(editQuiz || editPoll)
					// 	? { end_date: endDate }
					// 	: { end_date: endDate }),
					...(!(editQuiz || editPoll)
						? quiz
							? { question_type: 'quiz' }
							: { question_type: 'poll' }
						: {}),
					...(!(editQuiz || editPoll)
						? {
								answers: [
									{ answer: ans1, type: quiz ? 'right_answer' : 'poll' },
									{ answer: ans2, type: quiz ? 'wrong_answer' : 'poll' }
								]
						  }
						: {}),
					...(!(editQuiz || editPoll) && selectedLabels.length
						? { labels: [...selectedLabels] }
						: {})
					// ...((editQuiz || editPoll) && id
					// 	? { question_id: id }
					// 	: { question_id: null })
				},
				{
					headers: {
						Authorization: `Bearer ${getLocalStorageDetails()?.access_token}`
					}
				}
			);
			if (result?.data?.status_code === 200) {
				toast.success(
					editQuiz || editPoll
						? 'Question has been edited!'
						: 'Question has been created!'
				);
				setIsLoadingcreateViral(false);
				setPostButtonStatus(false);
				handleClose();
				dispatch(getQuestions({ page }));
				dispatch(getQuestionLabels());
			}
		} catch (e) {
			toast.error(
				editQuiz || editPoll
					? 'Failed to edit question!'
					: 'Failed to create question!'
			);
			setIsLoadingcreateViral(false);
			setPostButtonStatus(false);
			console.log(e);
		}
	};

	const deleteQuiz = async (id) => {
		setDeleteBtnStatus(true);
		try {
			const result = await axios.post(
				`${process.env.REACT_APP_API_ENDPOINT}/question/delete-question`,
				{
					question_id: id
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
				dispatch(getQuestions({ page }));
			}
		} catch (e) {
			toast.error('Failed to delete Question!');
			setDeleteBtnStatus(false);
			console.log(e);
		}
	};

	const resetState = () => {
		setUploadedFiles([]);
		setFileRejectionError('');
		setDropboxLink('');
		setUploadMediaError('');
		setDropZoneBorder('#ffff00');
		setPreviewFile(null);
		setPreviewBool(false);
		setQuestion('');
		setAns1('');
		setAns2('');
		setSelectedLabels([]);
		setExtraLabel('');
		setDisableDropdown(true);
		setEndDate(null);
		setTimeout(() => {
			setDeleteBtnStatus(false);
		}, 1000);
		setPostButtonStatus(false);
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
		if (!endDate) {
			setQuizColor('#ff355a');
			setCalenderError('You need to seelct a date in order to post');
			setTimeout(() => {
				setQuizColor('#ffffff');
				setCalenderError('');
			}, [5000]);
		}
		if (!question) {
			setQuestionColor('#ff355a');
			setQuestionError('You need to provide a question in order to post');
			setTimeout(() => {
				setQuestionColor('#ffffff');
				setQuestionError('');
			}, [5000]);
		}
		if (!ans1) {
			setAns1Color('#ff355a');
			setAns1Error(
				quiz
					? 'You need to provide right answer in order to post'
					: 'You need to provide first answer in order to post'
			);
			setTimeout(() => {
				setAns1Color('#ffffff');
				setAns1Error('');
			}, [5000]);
		}
		if (!ans2) {
			setAns2Color('#ff355a');
			setAns2Error(
				quiz
					? 'You need to provide wrong answer in order to post'
					: 'You need to provide second answer in order to post'
			);
			setTimeout(() => {
				setAns2Color('#ffffff');
				setAns2Error('');
			}, [5000]);
		}
	};

	const addQuizBtnDisabled =
		!uploadedFiles.length ||
		selectedLabels.length < 10 ||
		postButtonStatus ||
		!question ||
		!ans1 ||
		!ans2 ||
		!endDate;

	return (
		<LoadingOverlay active={isLoadingcreateViral} spinner text='Loading...'>
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
															src={file.img}
															className={classes.fileThumbnail}
														/>
														<p className={classes.fileName}>{file.fileName}</p>
													</div>

													<div className={classes.filePreviewRight}>
														{editQuiz || editPoll ? (
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
						{!uploadedFiles.length && !editQuiz && !editPoll && (
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
									<p className={classes.uploadMediaError}>{uploadMediaError}</p>
								</div>
							</section>
						)}
						<p className={classes.fileRejectionError}>{fileRejectionError}</p>

						<div className={classes.captionContainer}>
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

						<div className={classes.titleContainer}>
							<h6 style={{ color: questionColor }}>QUESTION</h6>
							<TextField
								disabled={editQuiz || editPoll}
								value={question}
								onChange={(e) => {
									setQuestion(e.target.value);
								}}
								placeholder={'Please write your question here'}
								className={classes.textField}
								InputProps={{
									disableUnderline: true,
									className: `${classes.textFieldInput}  ${
										(editQuiz || editPoll) && classes.disableTextField
									}`
								}}
								multiline
								maxRows={2}
							/>
						</div>

						<p className={classes.mediaError}>{questionError}</p>

						<div className={classes.titleContainer}>
							<h6 style={{ color: ans1Color }}>
								{quiz || editQuiz ? 'RIGHT ANSWER' : 'ANSWER 1'}
							</h6>
							<TextField
								disabled={editQuiz || editPoll}
								value={ans1}
								onChange={(e) => {
									setAns1(e.target.value);
								}}
								placeholder={'Please write your answer here'}
								className={classes.textField}
								InputProps={{
									disableUnderline: true,
									className: `${classes.textFieldInput}  ${
										(editQuiz || editPoll) && classes.disableTextField
									}`
								}}
								multiline
								maxRows={1}
							/>
						</div>

						<p className={classes.mediaError}>{ans1Error}</p>

						<div className={classes.titleContainer}>
							<h6 style={{ color: ans2Color }}>
								{quiz || editQuiz ? 'WRONG ANSWER' : 'ANSWER 2'}
							</h6>
							<TextField
								disabled={editQuiz || editPoll}
								value={ans2}
								onChange={(e) => {
									setAns2(e.target.value);
								}}
								placeholder={'Please write your answer here'}
								className={classes.textField}
								InputProps={{
									disableUnderline: true,
									className: `${classes.textFieldInput}  ${
										(editQuiz || editPoll) && classes.disableTextField
									}`
								}}
								multiline
								maxRows={1}
							/>
						</div>

						<p className={classes.mediaError}>{ans2Error}</p>

						<div className={classes.titleContainer}>
							<h6 style={{ color: labelColor }}>LABELS</h6>
							<Autocomplete
								disabled={editQuiz || editPoll}
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
												boxShadow: '0px 16px 40px rgba(255, 255, 255, 0.16)',
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
								freeSolo={false}
								value={selectedLabels}
								onChange={(event, newValue) => {
									setDisableDropdown(true);
									event.preventDefault();
									event.stopPropagation();
									let newLabels = newValue.filter(
										(v, i, a) =>
											a.findIndex(
												(t) => t.name.toLowerCase() === v.name.toLowerCase()
											) === i
									);
									setSelectedLabels([...newLabels]);
								}}
								popupIcon={''}
								noOptionsText={
									<div className={classes.liAutocompleteWithButton}>
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
								className={`${classes.autoComplete}  ${
									(editQuiz || editPoll) && classes.disableAutoComplete
								}`}
								id='free-solo-2-demo'
								disableClearable
								options={quizLabels}
								renderInput={(params) => (
									<TextField
										{...params}
										placeholder={selectedLabels.length ? ' ' : 'Select Labels'}
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

						<div className={classes.datePickerContainer}>
							<h6 style={{ color: quizColor }}>
								{quiz || editQuiz ? 'QUIZ END DATE' : 'POLL END DATE'}
							</h6>
							<div
								// className={editQuiz || editPoll ? classes.datePicker : ''}
								className={classes.datePicker}
								style={{ marginBottom: calenderOpen ? '250px' : '' }}
							>
								<DatePicker
									customInput={<ExampleCustomInput />}
									disabled={
										(editPoll || editQuiz) && status === 'CLOSED' ? true : false
									}
									startDate={endDate}
									minDate={new Date()}
									//className={classes.datePicker}
									onChange={(update) => {
										setEndDate(update);
									}}
									popperPlacement='bottom'
									// popperModifiers={{
									// 	flip: {
									// 		behavior: ['bottom'] // don't allow it to flip to be above
									// 	},
									// 	preventOverflow: {
									// 		enabled: false // tell it not to try to stay within the view (this prevents the popper from covering the element you clicked)
									// 	},
									// 	hide: {
									// 		enabled: false // turn off since needs preventOverflow to be enabled
									// 	}
									// }}
									onCalendarOpen={() => {
										setCalenderOpen(true);
										setDisableDropdown(false);
									}}
									onCalendarClose={() => {
										setCalenderOpen(false);
										setDisableDropdown(true);
									}}
									//placement='center'
									isClearable={
										(editPoll || editQuiz) && status === 'CLOSED' ? false : true
									}
								/>
							</div>
						</div>

						<p className={classes.mediaError}>{calenderError}</p>
					</div>

					<div className={classes.buttonDiv}>
						{editQuiz || editPoll ? (
							<div className={classes.editBtn}>
								<Button
									disabled={deleteBtnStatus}
									button2={editQuiz || editPoll ? true : false}
									onClick={() => {
										if (!deleteBtnStatus) {
											//console.log('specific', specificMedia.id);
											deleteQuiz(editQuestionData?.id);
										}
									}}
									text={type === 'quiz' ? 'DELETE QUIZ' : 'DELETE POLL'}
								/>
							</div>
						) : (
							<></>
						)}

						<div
							className={
								editQuiz || editPoll
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
										if (editQuiz || editPoll) {
											createQuestion(editQuestionData?.id);
										} else {
											setIsLoadingcreateViral(true);
											let uploadFilesPromiseArray = uploadedFiles.map(
												async (_file) => {
													return uploadFileToServer(_file);
												}
											);

											Promise.all([...uploadFilesPromiseArray])
												.then((mediaFiles) => {
													console.log(mediaFiles, 'media files ');
													createQuestion(null, mediaFiles);
												})
												.catch(() => {
													setIsLoadingcreateViral(false);
												});
										}
									}
								}}
								text={type === 'quiz' ? 'ADD QUIZ' : 'ADD POLL'}
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
	);
};

UploadOrEditQuiz.propTypes = {
	heading1: PropTypes.string.isRequired,
	open: PropTypes.bool.isRequired,
	buttonText: PropTypes.string.isRequired,
	editQuiz: PropTypes.bool,
	setPreviewBool: PropTypes.func.isRequired,
	previewFile: PropTypes.bool.isRequired,
	setPreviewFile: PropTypes.func.isRequired,
	previewRef: PropTypes.oneOfType([
		PropTypes.func,
		PropTypes.shape({ current: PropTypes.elementType })
	]).isRequired,
	setDisableDropdown: PropTypes.func.isRequired,
	quiz: PropTypes.bool,
	editPoll: PropTypes.bool,
	handleClose: PropTypes.func.isRequired,
	page: PropTypes.string,
	status: PropTypes.string,
	type: PropTypes.string //poll or quiz
};

export default UploadOrEditQuiz;
