/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React, { forwardRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// import classes from './_uploadOrEditQuiz.module.scss';
import { useDropzone } from 'react-dropzone';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { makeid } from '../../../utils/helper';
import { TextField } from '@material-ui/core';
import DragAndDropField from '../../DragAndDropField';
import Labels from '../../Labels';
import Button from '../../button';
import DatePicker from 'react-datepicker';
import checkFileSize from '../../../utils/validateFileSize';
import { formatDate, getCalendarText2 } from '../../../utils';
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
import PrimaryLoader from '../../PrimaryLoader';
//import resetForm from '../../../utils/resetForm';
import validateForm from '../../../utils/validateForm';
import validateDraft from '../../../utils/validateDraft';
import { useStyles as globalUseStyles } from '../../../styles/global.style';
import { useStyles } from './UploadOrEditQuiz.style';

const UploadOrEditQuiz = ({
	heading1,
	open,
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
	const [fileRejectionError, setFileRejectionError] = useState('');
	const [quizLabels, setQuizLabels] = useState([]);
	const [extraLabel, setExtraLabel] = useState('');
	const [convertedDate, setConvertedDate] = useState(null);
	const [calenderOpen, setCalenderOpen] = useState(false);
	const [deleteBtnStatus, setDeleteBtnStatus] = useState(false);
	const [postButtonStatus, setPostButtonStatus] = useState(false);
	const [isLoadingcreateViral, setIsLoadingcreateViral] = useState(false);
	const [editQuizBtnDisabled, setEditQuizBtnDisabled] = useState(false);
	const [draftBtnDisabled, setDraftBtnDisabled] = useState(false);
	const [fileWidth, setFileWidth] = useState(0);
	const [fileHeight, setFileHeight] = useState(0);
	const [isError, setIsError] = useState({});
	const [form, setForm] = useState({
		uploadedFiles: [],
		dropbox_url: '',
		question: '',
		answer1: '',
		answer2: '',
		labels: [],
		end_date: null
	});
	const imgRef = useRef(null);
	const loadingRef = useRef(null);
	const dispatch = useDispatch();
	const globalClasses = globalUseStyles();
	const classes = useStyles();

	const {
		labels,
		questionEditStatus,
		questionEdit: editQuestionData
	} = useSelector((state) => state.questionLibrary);

	useEffect(() => {
		if (
			(editPoll || editQuiz) &&
			(quiz
				? editQuestionData?.quiz_end_date == null
				: editQuestionData?.poll_end_date == null) &&
			form.end_date == null
		) {
			setConvertedDate(null);
		} else {
			var da = new Date(form.end_date);
			var toSend = `${da?.getFullYear()}-${('0' + (da?.getMonth() + 1)).slice(
				-2
			)}-${('0' + da?.getDate()).slice(-2)}T00:00:00.000Z`;
			setConvertedDate(toSend);
		}
	}, [form.end_date]);

	useEffect(() => {
		if (labels.length) {
			setQuizLabels([...labels]);
		}
	}, [labels]);

	useEffect(() => {
		validateForm(form);
	}, [form]);

	useEffect(() => {
		dispatch(getQuestionLabels());
	}, []);

	// eslint-disable-next-line no-unused-vars
	const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => {
		const startDate = formatDate(form.end_date);
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
						onClick={() => {
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
				setForm((prev) => {
					return { ...prev, labels: _labels };
				});
			}

			setForm((prev) => {
				return {
					...prev,
					dropbox_url: editQuestionData?.dropbox_url,
					question: editQuestionData?.question,
					uploadedFiles: editQuestionData?.image
						? [
								{
									id: makeid(10),
									file_name: editQuestionData?.file_name,
									media_url: editQuestionData?.image
										? `${process.env.REACT_APP_MEDIA_ENDPOINT}/${editQuestionData?.image}`
										: '',
									type: 'image'
								}
						  ]
						: [],
					answer1:
						editQuestionData?.answers?.length > 0
							? editQuestionData?.answers[0]?.answer
							: '',
					answer2:
						editQuestionData?.answers?.length > 0
							? editQuestionData?.answers[1]?.answer
							: '',
					end_date: editQuestionData?.quiz_end_date
						? editQuestionData?.quiz_end_date
						: editQuestionData?.poll_end_date
						? editQuestionData?.poll_end_date
						: null
				};
			});
		}
	}, [editQuestionData]);

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
					type: file.type === 'image'
				};
			});
			//setUploadedFiles([...uploadedFiles, ...newFiles]);
			setForm((prev) => {
				return { ...prev, uploadedFiles: [...form.uploadedFiles, ...newFiles] };
			});
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
			//resetForm(form);
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
		// setUploadedFiles((uploadedFiles) =>
		// 	uploadedFiles.filter((file) => file.id !== id)
		// );
		setForm((prev) => {
			return {
				...prev,
				uploadedFiles: form.uploadedFiles.filter((file) => file.id !== id)
			};
		});
	};

	const handleChangeExtraLabel = (e) => {
		setExtraLabel(e.target.value.toUpperCase());
	};

	const createQuestion = async (id, mediaFiles = [], draft = false) => {
		setPostButtonStatus(true);

		//setIsLoadingcreateViral(false);
		try {
			const result = await axios.post(
				`${process.env.REACT_APP_API_ENDPOINT}/question/add-question`,
				{
					width: fileWidth,
					height: fileHeight,
					save_draft: draft,
					image: form.uploadedFiles.length
						? mediaFiles[0]?.media_url?.split('cloudfront.net/')[1] ||
						  mediaFiles[0]?.media_url
						: undefined,
					file_name: form.uploadedFiles.length
						? mediaFiles[0]?.file_name
						: undefined,
					...(form.question ? { question: form.question } : { question: '' }),
					...(form.dropbox_url ? { dropbox_url: form.dropbox_url } : {}),

					...(!(editQuiz || editPoll)
						? convertedDate
							? { end_date: convertedDate }
							: { end_date: '' }
						: (editQuiz || editPoll) && form.end_date != null
						? { end_date: convertedDate }
						: { end_date: '' }),

					...(!(editQuiz || editPoll)
						? quiz
							? { question_type: 'quiz' }
							: { question_type: 'poll' }
						: status === 'draft'
						? quiz
							? { question_type: 'quiz' }
							: { question_type: 'poll' }
						: {}),
					...(!(editQuiz || editPoll)
						? {
								answers: [
									{
										answer: form.answer1 ? form.answer1 : '',
										type: quiz ? 'right_answer' : 'poll',
										position: 0
									},
									{
										answer: form.answer2 ? form.answer2 : '',
										type: quiz ? 'wrong_answer' : 'poll',
										position: 1
									}
								]
						  }
						: status === 'draft'
						? {
								answers: [
									{
										answer: form.answer1 ? form.answer1 : '',
										id: editQuestionData?.answers[0]?.id,
										type: quiz ? 'right_answer' : 'poll'
									},
									{
										answer: form.answer2 ? form.answer2 : '',
										id: editQuestionData?.answers[1]?.id,
										type: quiz ? 'wrong_answer' : 'poll'
									}
								]
						  }
						: {}),
					...((!(editQuiz || editPoll) || status === 'draft') &&
					form.labels.length
						? { labels: [...form.labels] }
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

	const deleteQuiz = async (id, draft, qtype) => {
		setDeleteBtnStatus(true);
		try {
			const result = await axios.post(
				`${process.env.REACT_APP_API_ENDPOINT}/question/delete-question`,
				{
					question_id: id,
					is_draft: draft,
					question_type: qtype
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

	const stopQuizPoll = async (id) => {
		setDeleteBtnStatus(true);
		try {
			const result = await axios.post(
				`${process.env.REACT_APP_API_ENDPOINT}/question/stop-question`,
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
				toast.success('Question has been stoppped!');
				handleClose();

				//setting a timeout for getting post after delete.
				dispatch(getQuestions({ page }));
			}
		} catch (e) {
			toast.error('Failed to stop Question!');
			setDeleteBtnStatus(false);
		}
	};

	const resetState = () => {
		setFileRejectionError('');
		setPreviewFile(null);
		setPreviewBool(false);
		setExtraLabel('');
		setDisableDropdown(true);
		setConvertedDate(null);
		setTimeout(() => {
			setDeleteBtnStatus(false);
		}, 1000);
		setPostButtonStatus(false);
		setIsError({});
		setEditQuizBtnDisabled(false);
		setDraftBtnDisabled(false);
		//resetForm(form);
		setForm({
			uploadedFiles: [],
			dropbox_url: '',
			question: '',
			answer1: '',
			answer2: '',
			labels: [],
			end_date: null
		});
	};

	const validatePostBtn = () => {
		setIsError({
			endDate: !form.end_date,
			uploadedFiles: form.uploadedFiles.length < 1,
			selectedLabels: form.labels.length < 7,
			question: !form.question,
			ans1: !form.answer1,
			ans2: !form.answer2
		});
		setTimeout(() => {
			setIsError({});
		}, 5000);
	};

	useEffect(() => {
		if (editQuestionData) {
			setEditQuizBtnDisabled(
				postButtonStatus ||
					!form.uploadedFiles.length ||
					!form.end_date ||
					((type === 'quiz'
						? editQuestionData?.quiz_end_date === convertedDate
						: editQuestionData?.poll_end_date === convertedDate) &&
						editQuestionData?.file_name === form.uploadedFiles[0]?.file_name &&
						editQuestionData?.dropbox_url?.trim() === form.dropbox_url.trim())
			);
		}
	}, [editQuestionData, form, convertedDate]);

	const checkDuplicateLabel = () => {
		let formLabels = form?.labels?.map((formL) => {
			if (editQuestionData?.labels?.includes(formL.name)) {
				return true;
			} else {
				return false;
			}
		});
		return formLabels.some((label) => label === false);
	};

	useEffect(() => {
		if (editQuestionData) {
			setDraftBtnDisabled(
				!validateDraft(form) ||
					postButtonStatus ||
					((type === 'quiz'
						? editQuestionData?.quiz_end_date === convertedDate
						: editQuestionData?.poll_end_date === convertedDate) &&
						editQuestionData?.question === form?.question &&
						editQuestionData?.answers[0].answer === form?.answer1 &&
						editQuestionData?.answers[1].answer === form?.answer2 &&
						(editQuestionData?.image || form?.uploadedFiles[0]
							? editQuestionData?.file_name ===
							  form?.uploadedFiles[0]?.file_name
							: true) &&
						editQuestionData?.dropbox_url?.trim() === form.dropbox_url.trim() &&
						editQuestionData?.labels?.length === form?.labels?.length &&
						!checkDuplicateLabel())
			);
		}
	}, [editQuestionData, form, convertedDate]);

	// console.log(form, 'form');
	console.log(form.end_date, 'dft');
	// console.log(editQuestionData?.poll_end_date, 'poll');
	// console.log(convertedDate, 'cd');

	const handleAddSaveQuizPollBtn = async () => {
		if (!validateForm(form) || editQuizBtnDisabled) {
			validatePostBtn();
		} else {
			setPostButtonStatus(true);
			loadingRef.current.scrollIntoView({ behavior: 'smooth' });
			setIsLoadingcreateViral(true);
			if (editQuiz || editPoll) {
				let uploadFilesPromiseArray = form.uploadedFiles.map(async (_file) => {
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
				let uploadFilesPromiseArray = form.uploadedFiles.map(async (_file) => {
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

	const handleDraftSave = async () => {
		if (!validateDraft(form) || draftBtnDisabled) {
			validatePostBtn();
		} else {
			setPostButtonStatus(true);
			loadingRef.current.scrollIntoView({ behavior: 'smooth' });
			setIsLoadingcreateViral(true);
			if (editQuiz || editPoll) {
				let uploadFilesPromiseArray = form.uploadedFiles.map(async (_file) => {
					if (_file.file) {
						return await uploadFileToServer(_file, 'questionLibrary');
					} else {
						return _file;
					}
				});

				Promise.all([...uploadFilesPromiseArray])
					.then((mediaFiles) => {
						createQuestion(editQuestionData?.id, mediaFiles, true);
					})
					.catch(() => {
						setIsLoadingcreateViral(true);
					});
			} else {
				setIsLoadingcreateViral(true);
				let uploadFilesPromiseArray = form.uploadedFiles.map(async (_file) => {
					return uploadFileToServer(_file, 'questionLibrary');
				});

				Promise.all([...uploadFilesPromiseArray])
					.then((mediaFiles) => {
						createQuestion(null, mediaFiles, true);
					})
					.catch(() => {
						setIsLoadingcreateViral(true);
					});
			}
		}
	};

	return (
		<LoadingOverlay active={isLoadingcreateViral} spinner={<PrimaryLoader />}>
			<Slide in={true} direction='up' {...{ timeout: 400 }}>
				<div
					ref={loadingRef}
					className={`${
						previewFile != null
							? classes.previewContentWrapper
							: classes.contentWrapper
					}`}
				>
					{questionEditStatus === 'loading' ? <PrimaryLoader /> : <></>}
					<div
						className={globalClasses.contentWrapperNoPreview}
						style={{ width: previewFile != null ? '60%' : 'auto' }}
					>
						<div>
							<h5 className={classes.QuizQuestion}>{heading1}</h5>
							<DragAndDropField
								uploadedFiles={form.uploadedFiles}
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

							{!form.uploadedFiles.length ? (
								<section
									className={globalClasses.dropZoneContainer}
									style={{
										borderColor: isError.uploadedFiles ? '#ff355a' : 'yellow'
									}}
								>
									<div {...getRootProps({ className: globalClasses.dropzone })}>
										<input {...getInputProps()} />
										<AddCircleOutlineIcon
											className={globalClasses.addFilesIcon}
										/>
										<p className={globalClasses.dragMsg}>
											Click or drag file to this area to upload
										</p>
										<p className={globalClasses.formatMsg}>
											Supported formats are jpeg and png
										</p>
										<p className={globalClasses.uploadMediaError}>
											{isError.uploadedFiles
												? 'You need to upload a media in order to post'
												: ''}
										</p>
									</div>
								</section>
							) : (
								''
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
										className: classes.textFieldInput,
										style: {
											borderRadius: form.dropbox_url ? '16px' : '40px'
										}
									}}
								/>
							</div>

							<div className={classes.titleContainer}>
								<div className={globalClasses.characterCount}>
									<h6
										className={
											isError.question
												? globalClasses.errorState
												: globalClasses.noErrorState
										}
									>
										QUESTION
									</h6>
									<h6
										style={{
											color:
												form.question?.length >= 49 &&
												form.question?.length <= 54
													? 'pink'
													: form.question?.length === 55
													? 'red'
													: 'white'
										}}
									>
										{form.question?.length}/55
									</h6>
								</div>
								<TextField
									disabled={(editQuiz || editPoll) && status !== 'draft'}
									value={form.question}
									onChange={(e) => {
										setForm((prev) => {
											return { ...prev, question: e.target.value };
										});
									}}
									placeholder={'Please write your question here'}
									className={classes.textField}
									InputProps={{
										disableUnderline: true,
										className: `${classes.textFieldInput}  ${
											(editQuiz || editPoll) &&
											status !== 'draft' &&
											classes.disableTextField
										}`
									}}
									inputProps={{ maxLength: 55 }}
									multiline
									maxRows={2}
								/>
							</div>

							<p className={globalClasses.mediaError}>
								{isError.question
									? 'You need to provide a question in order to post.'
									: ''}
							</p>

							<div className={classes.titleContainer}>
								<h6
									className={
										isError.ans1
											? globalClasses.errorState
											: globalClasses.noErrorState
									}
								>
									{quiz || editQuiz ? 'RIGHT ANSWER' : 'ANSWER 1'}
								</h6>
								<TextField
									disabled={(editQuiz || editPoll) && status !== 'draft'}
									value={form.answer1}
									onChange={(e) => {
										setForm((prev) => {
											return { ...prev, answer1: e.target.value };
										});
									}}
									placeholder={'Please write your answer here'}
									className={classes.textField}
									InputProps={{
										disableUnderline: true,
										className: `${classes.textFieldInput}  ${
											(editQuiz || editPoll) &&
											status !== 'draft' &&
											classes.disableTextField
										}`
									}}
									multiline
									maxRows={1}
								/>
							</div>

							<p className={globalClasses.mediaError}>
								{isError.ans1
									? quiz
										? 'You need to provide right answer in order to post'
										: 'You need to provide first answer in order to post'
									: ''}
							</p>

							<div className={classes.titleContainer}>
								<h6
									className={
										isError.ans2
											? globalClasses.errorState
											: globalClasses.noErrorState
									}
								>
									{quiz || editQuiz ? 'WRONG ANSWER' : 'ANSWER 2'}
								</h6>
								<TextField
									disabled={(editQuiz || editPoll) && status !== 'draft'}
									value={form.answer2}
									onChange={(e) => {
										setForm((prev) => {
											return { ...prev, answer2: e.target.value };
										});
									}}
									placeholder={'Please write your answer here'}
									className={classes.textField}
									InputProps={{
										disableUnderline: true,
										className: `${classes.textFieldInput}  ${
											(editQuiz || editPoll) &&
											status !== 'draft' &&
											classes.disableTextField
										}`
									}}
									multiline
									maxRows={1}
								/>
							</div>

							<p className={globalClasses.mediaError}>
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
											? globalClasses.errorState
											: globalClasses.noErrorState
									}
								>
									LABELS
								</h6>
								<Labels
									isEdit={editPoll || editQuiz}
									setDisableDropdown={setDisableDropdown}
									selectedLabels={form.labels}
									setSelectedLabels={(newVal) => {
										setForm((prev) => {
											return { ...prev, labels: [...newVal] };
										});
									}} //closure
									LabelsOptions={quizLabels}
									extraLabel={extraLabel}
									handleChangeExtraLabel={handleChangeExtraLabel}
									draftStatus={status}
								/>
							</div>

							<p className={globalClasses.mediaError}>
								{isError.selectedLabels
									? `You need to add  ${
											7 - form.labels.length
									  }  more labels in order to post`
									: ''}
							</p>

							<div className={classes.datePickerContainer}>
								<h6
									className={
										isError.endDate
											? globalClasses.errorState
											: globalClasses.noErrorState
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
										startDate={form.end_date}
										minDate={new Date()}
										onChange={(update) => {
											setForm((prev) => {
												return { ...prev, end_date: update };
											});
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

							<p className={globalClasses.mediaError}>
								{isError.endDate
									? 'You need to seelct a date in order to post'
									: ''}
							</p>
						</div>

						{/* <div className={classes.buttonDiv}>
							<div className={classes.leftButtonDiv}>
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

								{(editQuiz || editPoll) && status === 'ACTIVE' ? (
									<>
										<div className={classes.stopBtn}>
											<Button
												// disabled={deleteBtnStatus}
												button2={editQuiz || editPoll ? true : false}
												onClick={() => {
													if (!deleteBtnStatus) {
														stopQuizPoll(editQuestionData?.id);
													}
												}}
												text={type === 'quiz' ? 'STOP QUIZ' : 'STOP POLL'}
											/>
										</div>
									</>
								) : (
									<></>
								)}
							</div>
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
											? !validateForm(form)
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
						</div> */}
						<div className={classes.buttonDiv}>
							<div className={classes.leftButtonDiv}>
								{editQuiz || editPoll ? (
									<div className={classes.editDeleteBtn}>
										<Button
											disabled={deleteBtnStatus}
											button2={editQuiz || editPoll ? true : false}
											onClick={() => {
												if (!deleteBtnStatus) {
													deleteQuiz(
														editQuestionData?.id,
														status.toLowerCase(),
														quiz ? 'quiz' : 'poll'
													);
												}
											}}
											text={type === 'quiz' ? 'DELETE QUIZ' : 'DELETE POLL'}
										/>
									</div>
								) : (
									<></>
								)}

								{(editQuiz || editPoll) && status === 'ACTIVE' ? (
									<>
										<div className={classes.stopBtn}>
											<Button
												// disabled={deleteBtnStatus}
												button2={editQuiz || editPoll ? true : false}
												onClick={() => {
													if (!deleteBtnStatus) {
														stopQuizPoll(editQuestionData?.id);
													}
												}}
												text={type === 'quiz' ? 'STOP QUIZ' : 'STOP POLL'}
											/>
										</div>
									</>
								) : (
									<></>
								)}
							</div>

							<div className={classes.publishDraftDiv}>
								{status === 'draft' || !(editPoll || editQuiz) ? (
									<div
										className={
											editPoll || editQuiz
												? classes.draftBtnEdit
												: classes.draftBtn
										}
									>
										<Button
											disabledDraft={
												editPoll || editQuiz
													? draftBtnDisabled
													: !validateDraft(form)
											}
											onClick={() => handleDraftSave()}
											button3={true}
											text={
												status === 'draft' && (editPoll || editQuiz)
													? 'SAVE DRAFT'
													: 'SAVE AS DRAFT'
											}
										/>
									</div>
								) : (
									<></>
								)}

								<div
									className={[
										(editPoll || editQuiz) && validateForm(form)
											? classes.addMediaBtn
											: editPoll || editQuiz
											? classes.addMediaBtnEdit
											: classes.addMediaBtn,
										classes.saveChangesbtn
									].join(' ')}
								>
									<Button
										text={
											type === 'quiz' && !(editPoll || editQuiz)
												? 'ADD QUIZ'
												: type === 'poll' && !(editPoll || editQuiz)
												? 'ADD POLL'
												: 'SAVE CHANGES'
										}
										disabled={
											!(editPoll || editQuiz)
												? !validateForm(form)
												: editQuizBtnDisabled
										}
										onClick={() => {
											handleAddSaveQuizPollBtn();
										}}
									/>
								</div>
							</div>
						</div>
					</div>
					{previewFile != null && (
						<div ref={previewRef} className={globalClasses.previewComponent}>
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
								<img
									src={previewFile.media_url}
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
