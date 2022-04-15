/* eslint-disable no-unused-vars */
/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import React, { forwardRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classes from './_uploadOrEditQuiz.module.scss';
import { useDropzone } from 'react-dropzone';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { makeid } from '../../../utils/helper';
import { TextField } from '@material-ui/core';
import DragAndDropField from '../../DragAndDropField';
import Labels from '../../Labels';
import Button from '../../button';
import DatePicker from 'react-datepicker';
import checkFileSize from '../../../utils/validateFileSize';
import { getDateTime, formatDate, getCalendarText2 } from '../../../utils';
import { useDispatch, useSelector } from 'react-redux';
import {
	getQuestionLabels,
	getQuestions
} from '../../../pages/QuestionLibrary/questionLibrarySlice';
import { getLocalStorageDetails } from '../../../utils';
import { toast } from 'react-toastify';
import axios from 'axios';
import LoadingOverlay from 'react-loading-overlay';
import uploadFileToServer from '../../../utils/uploadFileToServer';
import Close from '@material-ui/icons/Close';
import { ReactComponent as CalenderYellow } from '../../../assets/Calender_Yellow.svg';
import 'react-datepicker/dist/react-datepicker.css';
import '../../../pages/PostLibrary/_calender.scss';
import { useRef } from 'react';
import Slide from '@mui/material/Slide';
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
	const [dropboxLink, setDropboxLink] = useState('');
	const [question, setQuestion] = useState('');
	const [ans1, setAns1] = useState('');
	const [ans2, setAns2] = useState('');
	const [selectedLabels, setSelectedLabels] = useState([]);
	const [quizLabels, setQuizLabels] = useState([]);
	const [extraLabel, setExtraLabel] = useState('');
	const [endDate, setEndDate] = useState(null);
	const [convertedDate, setConvertedDate] = useState(null);
	const [calenderOpen, setCalenderOpen] = useState(false);
	const [deleteBtnStatus, setDeleteBtnStatus] = useState(false);
	const [postButtonStatus, setPostButtonStatus] = useState(false);
	const [isLoadingcreateViral, setIsLoadingcreateViral] = useState(false);
	const [editQuizBtnDisabled, setEditQuizBtnDisabled] = useState(false);
	const [fileWidth, setFileWidth] = useState(null);
	const [fileHeight, setFileHeight] = useState(null);
	const [isError, setIsError] = useState({});
	const imgRef = useRef(null);
	const dispatch = useDispatch();

	const labels = useSelector((state) => state.questionLibrary.labels);

	const editQuestionData = useSelector(
		(state) => state.questionLibrary.questionEdit
	);

	useEffect(() => {
		var da = new Date(endDate);
		var toSend = `${da?.getFullYear()}-${('0' + (da?.getMonth() + 1)).slice(
			-2
		)}-${('0' + da?.getDate()).slice(-2)}T00:00:00.000Z`;
		setConvertedDate(toSend);
	}, [endDate]);

	useEffect(() => {
		if (labels.length) {
			setQuizLabels([...labels]);
		}
	}, [labels]);

	useEffect(() => {
		dispatch(getQuestionLabels());
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
			maxFiles: 1,
			validator: checkFileSize
		});

	const getFileType = (type) => {
		if (type) {
			let _type = type.split('/');
			return _type && _type[1];
		}
	};

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
			setIsError({});

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
			fileRejections.forEach(({ errors }) => {
				return errors.forEach((e) => setFileRejectionError(e.message));
			});
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

	const createQuestion = async (id, mediaFiles = []) => {
		setPostButtonStatus(true);

		try {
			const result = await axios.post(
				`${process.env.REACT_APP_API_ENDPOINT}/question/add-question`,
				{
					width: fileWidth,
					height: fileHeight,
					image:
						mediaFiles[0]?.media_url ||
						mediaFiles[0].img.split('cloudfront.net/')[1],
					file_name: mediaFiles[0]?.file_name || mediaFiles[0]?.fileName,
					...(question ? { question: question } : { question: '' }),
					...(dropboxLink ? { dropbox_url: dropboxLink } : {}),

					...(convertedDate ? { end_date: convertedDate } : {}),
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
						: {}),
					...((editQuiz || editPoll) && id ? { question_id: id } : {})
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
			console.log(e, 'failed create/edit question');
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
			console.log(e, 'Failed to delete Question!');
		}
	};

	const resetState = () => {
		setUploadedFiles([]);
		setFileRejectionError('');
		setDropboxLink('');
		setPreviewFile(null);
		setPreviewBool(false);
		setQuestion('');
		setAns1('');
		setAns2('');
		setSelectedLabels([]);
		setExtraLabel('');
		setDisableDropdown(true);
		setEndDate(null);
		setConvertedDate(null);
		setTimeout(() => {
			setDeleteBtnStatus(false);
		}, 1000);
		setPostButtonStatus(false);
		setIsError({});
	};

	const validatePostBtn = () => {
		setIsError({
			endDate: !endDate,
			uploadedFiles: uploadedFiles.length < 1,
			selectedLabels: selectedLabels.length < 10,
			question: !question,
			ans1: !ans1,
			ans2: !ans2
		});
		setTimeout(() => {
			setIsError({});
		}, 5000);
	};

	const addQuizBtnDisabled =
		!uploadedFiles.length ||
		selectedLabels.length < 10 ||
		postButtonStatus ||
		!question ||
		!ans1 ||
		!ans2 ||
		!endDate;

	// console.log(editQuestionData?.quiz_end_date, 'quiz');
	// console.log(convertedDate, 'endDate');
	// console.log(editQuestionData?.quiz_end_date?.length, 'quiz');
	// console.log(convertedDate?.length, 'endDate');

	useEffect(() => {
		if (editQuestionData) {
			setEditQuizBtnDisabled(
				postButtonStatus ||
					!uploadedFiles.length ||
					!endDate ||
					((type === 'quiz'
						? editQuestionData?.quiz_end_date === convertedDate
						: editQuestionData?.poll_end_date === convertedDate) &&
						editQuestionData?.file_name === uploadedFiles[0]?.fileName &&
						editQuestionData?.dropbox_url === dropboxLink.trim())
			);
		}
	}, [editQuestionData, dropboxLink, endDate, convertedDate, uploadedFiles]);

	const handleAddSaveQuizPollBtn = async () => {
		if (addQuizBtnDisabled || editQuizBtnDisabled) {
			validatePostBtn();
		} else {
			setPostButtonStatus(true);
			setIsLoadingcreateViral(true);
			if (editQuiz || editPoll) {
				let uploadFilesPromiseArray = uploadedFiles.map(async (_file) => {
					if (_file.file) {
						return await uploadFileToServer(_file, 'questionLibrary');
					} else {
						return _file;
					}
				});

				Promise.all([...uploadFilesPromiseArray])
					.then((mediaFiles) => {
						createQuestion(editQuestionData?.id, mediaFiles);
					})
					.catch(() => {
						setIsLoadingcreateViral(false);
					});
			} else {
				setIsLoadingcreateViral(true);
				let uploadFilesPromiseArray = uploadedFiles.map(async (_file) => {
					return uploadFileToServer(_file, 'questionLibrary');
				});

				Promise.all([...uploadFilesPromiseArray])
					.then((mediaFiles) => {
						createQuestion(null, mediaFiles);
					})
					.catch(() => {
						setIsLoadingcreateViral(false);
					});
			}
		}
	};

	return (
		<LoadingOverlay active={isLoadingcreateViral} spinner text='Loading...'>
			<Slide in={true} direction='up' {...{ timeout: 400 }}>
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
							<DragAndDropField
								uploadedFiles={uploadedFiles}
								quizPollStatus={status}
								handleDeleteFile={handleDeleteFile}
								setPreviewBool={setPreviewBool}
								setPreviewFile={setPreviewFile}
								isArticle
								isEdit={editPoll || editQuiz}
								imgEl={imgRef}
								imageOnload={() => {
									setFileWidth(imgRef.current.naturalWidth);
									setFileHeight(imgRef.current.naturalHeight);
								}}
							/>
							{!uploadedFiles.length && (
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
											Click or drag file to this area to upload
										</p>
										<p className={classes.formatMsg}>
											Supported formats are jpeg and png
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

							<div className={classes.titleContainer}>
								<h6
									className={
										isError.question ? classes.errorState : classes.noErrorState
									}
								>
									QUESTION
								</h6>
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

							<p className={classes.mediaError}>
								{isError.question
									? 'You need to provide a question in order to post.'
									: ''}
							</p>

							<div className={classes.titleContainer}>
								<h6
									className={
										isError.ans1 ? classes.errorState : classes.noErrorState
									}
								>
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

							<p className={classes.mediaError}>
								{isError.ans1
									? quiz
										? 'You need to provide right answer in order to post'
										: 'You need to provide first answer in order to post'
									: ''}
							</p>

							<div className={classes.titleContainer}>
								<h6
									className={
										isError.ans2 ? classes.errorState : classes.noErrorState
									}
								>
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

							<p className={classes.mediaError}>
								{isError.ans2
									? quiz
										? 'You need to provide wrong answer in order to post'
										: 'You need to provide second answer in order to post'
									: ''}
							</p>

							<div className={classes.titleContainer}>
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
									isEdit={editPoll || editQuiz}
									setDisableDropdown={setDisableDropdown}
									selectedLabels={selectedLabels}
									setSelectedLabels={setSelectedLabels}
									LabelsOptions={quizLabels}
									extraLabel={extraLabel}
									handleChangeExtraLabel={handleChangeExtraLabel}
								/>
							</div>

							<p className={classes.mediaError}>
								{isError.selectedLabels
									? `You need to add  ${
											10 - selectedLabels.length
									  }  more labels in order to post`
									: ''}
							</p>

							<div className={classes.datePickerContainer}>
								<h6
									className={
										isError.endDate ? classes.errorState : classes.noErrorState
									}
								>
									{quiz || editQuiz ? 'QUIZ END DATE' : 'POLL END DATE'}
								</h6>
								<div
									className={classes.datePicker}
									style={{ marginBottom: calenderOpen ? '250px' : '' }}
								>
									<DatePicker
										customInput={<ExampleCustomInput />}
										disabled={
											(editPoll || editQuiz) && status === 'CLOSED'
												? true
												: false
										}
										startDate={endDate}
										minDate={new Date()}
										onChange={(update) => {
											setEndDate(update);
										}}
										popperPlacement='bottom'
										onCalendarOpen={() => {
											setCalenderOpen(true);
											setDisableDropdown(false);
										}}
										onCalendarClose={() => {
											setCalenderOpen(false);
											setDisableDropdown(true);
										}}
										isClearable={
											(editPoll || editQuiz) && status === 'CLOSED'
												? false
												: true
										}
									/>
								</div>
							</div>

							<p className={classes.mediaError}>
								{isError.endDate
									? 'You need to seelct a date in order to post'
									: ''}
							</p>
						</div>

						<div className={classes.buttonDiv}>
							{editQuiz || editPoll ? (
								<div className={classes.editBtn}>
									<Button
										disabled={deleteBtnStatus}
										button2={editQuiz || editPoll ? true : false}
										onClick={() => {
											if (!deleteBtnStatus) {
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
									disabled={
										!(editPoll || editQuiz)
											? addQuizBtnDisabled
											: editQuizBtnDisabled
									}
									onClick={() => {
										handleAddSaveQuizPollBtn();
									}}
									text={
										type === 'quiz' && !(editPoll || editQuiz)
											? 'ADD QUIZ'
											: type === 'poll' && !(editPoll || editQuiz)
											? 'ADD POLL'
											: 'SAVE CHANGES'
									}
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
										width: '100%',
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
