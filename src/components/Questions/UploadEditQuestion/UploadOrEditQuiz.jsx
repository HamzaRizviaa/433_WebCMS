/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React, { forwardRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '../../button';
import DatePicker from 'react-datepicker';
import { formatDate, getCalendarText2 } from '../../../utils';
import { useDispatch, useSelector } from 'react-redux';
import { getQuestions } from '../../../pages/QuestionLibrary/questionLibrarySlice';
import { getLocalStorageDetails } from '../../../utils';
import { toast } from 'react-toastify';
import axios from 'axios';
import Slider from '../../slider';
import { makeid } from '../../../utils/helper';
import uploadFileToServer from '../../../utils/uploadFileToServer';

import { ReactComponent as CalenderYellow } from '../../../assets/Calender_Yellow.svg';
import 'react-datepicker/dist/react-datepicker.css';
import '../../../pages/PostLibrary/_calender.scss';
import { useRef } from 'react';
import Close from '@material-ui/icons/Close';
import DeleteModal from '../../DeleteModal';
import validateForm from '../../../utils/validateForm';
import validateDraft from '../../../utils/validateDraft';
import { useStyles as globalUseStyles } from '../../../styles/global.style';
import { useStyles } from './UploadOrEditQuiz.style';
import { useStyles as tabPansStyles } from '../quizStyles';
// upload or edit quiz / poll form , API's are also there
import TabsUnstyled from '@mui/base/TabsUnstyled';
import TabsListUnstyled from '@mui/base/TabsListUnstyled';
import TabPanelUnstyled from '@mui/base/TabPanelUnstyled';
import TabUnstyled from '@mui/base/TabUnstyled';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import QuestionDraggable from '../QuestionDraggableWrapper';
import QuestionForm from '../QuestionForm';
import LoadingOverlay from 'react-loading-overlay';
import PrimaryLoader from '../../PrimaryLoader';
import Slide from '@mui/material/Slide';
const UploadOrEditQuiz = ({
	open,
	previewRef,
	dialogWrapper,
	quiz,
	handleClose,
	page,
	status,
	type,
	editQuiz,
	editPoll,
	//new
	// open,
	//handleClose,
	title //heading1, buttonText
}) => {
	const [convertedDate, setConvertedDate] = useState(null);
	const [calenderOpen, setCalenderOpen] = useState(false);
	const [deleteBtnStatus, setDeleteBtnStatus] = useState(false);
	const [postButtonStatus, setPostButtonStatus] = useState(false);
	const [isLoadingcreateViral, setIsLoadingcreateViral] = useState(false);
	const [editQuizBtnDisabled, setEditQuizBtnDisabled] = useState(false);
	const [draftBtnDisabled, setDraftBtnDisabled] = useState(false);
	const [isError, setIsError] = useState({});
	const [openDeletePopup, setOpenDeletePopup] = useState(false);
	const [openStopPopup, setOpenStopPopup] = useState(false);
	const [stopStatus, setStopStatus] = useState(false);

	// new work
	const [isLoading, setIsLoading] = useState(false);
	const [previewBool, setPreviewBool] = useState(false);
	const [previewFile, setPreviewFile] = useState(null);
	const [disableDropdown, setDisableDropdown] = useState(true);
	const [questionType, setQuestionType] = useState('poll');
	const [questionSlides, setQuestionSlides] = useState([]); // data

	const [form, setForm] = useState({
		uploadedFiles: [],
		dropbox_url: '',
		question: '',
		answer1: '',
		answer2: '',
		labels: [],
		end_date: null
	});

	const loadingRef = useRef(null);
	const dispatch = useDispatch();
	const classes = useStyles();
	const globalClasses = globalUseStyles();
	const muiClasses = tabPansStyles();

	const { questionEditStatus, questionEdit: editQuestionData } = useSelector(
		(state) => state.questionLibrary
	);

	const reorder = (list, startIndex, endIndex) => {
		const result = Array.from(list);
		const [removed] = result.splice(startIndex, 1);
		result.splice(endIndex, 0, removed);
		return result;
	};

	const onDragEnd = (result) => {
		if (!result.destination) {
			return;
		}
		const items = reorder(
			questionSlides,
			result.source.index, // pick
			result.destination.index // drop
		);
		setQuestionSlides(items);
	};

	const handleNewSlide = () => {
		setQuestionSlides((prev) => {
			console.log('abc');
			return [
				...prev,
				{
					sort_order: questionSlides.length + 1
				}
			];
		});
	};

	useEffect(() => {
		handleNewSlide();
	}, [open]);

	const setNewData = (childData, index) => {
		// [ 0 : data [ {},{}] ]
		let dataCopy = [...questionSlides];
		dataCopy[index].data = [
			{
				...(dataCopy[index]?.data?.length ? dataCopy[index]?.data[0] : {}),
				...childData
			}
		];
		setQuestionSlides(dataCopy);
	};

	const handleElementDelete = (sortOrder) => {
		let dataCopy = [...questionSlides];
		if (sortOrder) {
			setQuestionSlides(
				dataCopy.filter((file) => file.sort_order !== sortOrder)
			);
		}
	};

	const handleMediaDataDelete = (elementData, index) => {
		let dataCopy = [...questionSlides];
		console.log(dataCopy);
	};

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
		validateForm(form);
	}, [form]);

	const toggleDeleteModal = () => {
		setOpenDeletePopup(!openDeletePopup);
	};

	const toggleStopModal = () => {
		setStopStatus(true);
		setOpenStopPopup(!openStopPopup);
	};

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
		if (!open) {
			resetState();
		}
		!(editPoll || editQuiz) ? resetState() : '';
	}, [open]);

	const createQuestion = async (id, mediaFiles = [], draft = false) => {
		setPostButtonStatus(true);

		//setIsLoadingcreateViral(false);
		// try {
		// 	const result = await axios.post(
		// 		`${process.env.REACT_APP_API_ENDPOINT}/question/add-question`,
		// 		{
		// 			width: fileWidth,
		// 			height: fileHeight,
		// 			save_draft: draft,
		// 			image: form.uploadedFiles.length
		// 				? mediaFiles[0]?.media_url?.split('cloudfront.net/')[1] ||
		// 				  mediaFiles[0]?.media_url
		// 				: undefined,
		// 			file_name: form.uploadedFiles.length
		// 				? mediaFiles[0]?.file_name
		// 				: undefined,
		// 			...(form.question ? { question: form.question } : { question: '' }),
		// 			...(form.dropbox_url ? { dropbox_url: form.dropbox_url } : {}),

		// 			...(!(editQuiz || editPoll)
		// 				? convertedDate
		// 					? { end_date: convertedDate }
		// 					: { end_date: '' }
		// 				: (editQuiz || editPoll) && form.end_date != null
		// 				? { end_date: convertedDate }
		// 				: { end_date: '' }),

		// 			...(!(editQuiz || editPoll)
		// 				? quiz
		// 					? { question_type: 'quiz' }
		// 					: { question_type: 'poll' }
		// 				: status === 'draft'
		// 				? quiz
		// 					? { question_type: 'quiz' }
		// 					: { question_type: 'poll' }
		// 				: {}),
		// 			...(!(editQuiz || editPoll)
		// 				? {
		// 						answers: [
		// 							{
		// 								answer: form.answer1 ? form.answer1 : '',
		// 								type: quiz ? 'right_answer' : 'poll',
		// 								position: 0
		// 							},
		// 							{
		// 								answer: form.answer2 ? form.answer2 : '',
		// 								type: quiz ? 'wrong_answer' : 'poll',
		// 								position: 1
		// 							}
		// 						]
		// 				  }
		// 				: status === 'draft'
		// 				? {
		// 						answers: [
		// 							{
		// 								answer: form.answer1 ? form.answer1 : '',
		// 								id: editQuestionData?.answers[0]?.id,
		// 								type: quiz ? 'right_answer' : 'poll'
		// 							},
		// 							{
		// 								answer: form.answer2 ? form.answer2 : '',
		// 								id: editQuestionData?.answers[1]?.id,
		// 								type: quiz ? 'wrong_answer' : 'poll'
		// 							}
		// 						]
		// 				  }
		// 				: {}),
		// 			...((!(editQuiz || editPoll) || status === 'draft') && {
		// 				labels: [...form.labels]
		// 			}),

		// 			// ...((!isEdit || status !== 'published') &&
		// 			// (form.labels?.length || status == 'draft')
		// 			// 	? { labels: [...form.labels] }
		// 			// 	: {}),

		// 			...((editQuiz || editPoll) && id ? { question_id: id } : {})
		// 		},
		// 		{
		// 			headers: {
		// 				Authorization: `Bearer ${getLocalStorageDetails()?.access_token}`
		// 			}
		// 		}
		// 	);
		// 	if (result?.data?.status_code === 200) {
		// 		toast.success(
		// 			editQuiz || editPoll
		// 				? 'Question has been edited!'
		// 				: 'Question has been created!'
		// 		);
		// 		setIsLoadingcreateViral(false);
		// 		setPostButtonStatus(false);
		// 		handleClose();
		// 		dispatch(getQuestions({ page }));
		// 		// dispatch(getQuestionLabels());
		// 	}
		// } catch (e) {
		// 	toast.error(
		// 		editQuiz || editPoll
		// 			? 'Failed to edit question!'
		// 			: 'Failed to create question!'
		// 	);
		// 	setIsLoadingcreateViral(false);
		// 	setPostButtonStatus(false);
		// 	console.log(e, 'failed create/edit question');
		// }
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
		setOpenDeletePopup(!openDeletePopup);
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
		setQuestionSlides([]);
		setPreviewFile(null);
		setPreviewBool(false);
		setDisableDropdown(true);
		setConvertedDate(null);
		setTimeout(() => {
			setDeleteBtnStatus(false);
		}, 1000);
		setPostButtonStatus(false);
		setIsError({});
		setEditQuizBtnDisabled(false);
		setDraftBtnDisabled(false);
		setForm({
			end_date: null
		});
	};

	const validatePostBtn = () => {
		setIsError({
			endDate: !form.end_date
		});
		setTimeout(() => {
			setIsError({});
		}, 5000);
	};

	const validateDraftBtn = () => {
		if (editPoll || editQuiz) {
			setIsError({
				draftError: draftBtnDisabled
			});

			setTimeout(() => {
				setIsError({});
			}, 5000);
		} else {
			setIsError({
				endDate: !form.end_date
			});
			setTimeout(() => {
				setIsError({});
			}, 5000);
		}
	};

	useEffect(() => {
		if (editQuestionData) {
			setEditQuizBtnDisabled(
				postButtonStatus ||
					!form.end_date ||
					(type === 'quiz'
						? editQuestionData?.quiz_end_date === convertedDate
						: editQuestionData?.poll_end_date === convertedDate)
			);
		}
	}, [editQuestionData, form, convertedDate]);

	const handlePreviewEscape = () => {
		setPreviewBool(false);
		setPreviewFile(null);
	};

	useEffect(() => {
		if (editQuestionData) {
			setDraftBtnDisabled(
				!validateDraft(form) ||
					postButtonStatus ||
					(type === 'quiz'
						? editQuestionData?.quiz_end_date === convertedDate
						: editQuestionData?.poll_end_date === convertedDate)
			);
		}
	}, [editQuestionData, form, convertedDate]);

	const handleAddSaveQuizPollBtn = async () => {
		if (!validateForm(form) || (editQuizBtnDisabled && status === 'ACTIVE')) {
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
			validateDraftBtn();
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

	const resetSlides = (type) => {
		if (type !== questionType) {
			setQuestionSlides([]);
			setForm({
				end_date: null
			});
		}
	};

	return (
		<>
			<Slider
				open={open}
				handleClose={() => {
					handleClose();
				}}
				title={title}
				disableDropdown={disableDropdown}
				preview={previewBool}
				handlePreview={() => {
					handlePreviewEscape();
				}}
			>
				<LoadingOverlay
					active={isLoading}
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
							{/* {specificNewsStatus === 'loading' ? <PrimaryLoader /> : <></>} */}
							<div
								className={globalClasses.contentWrapperNoPreview}
								style={{ width: previewFile != null ? '60%' : 'auto' }}
							>
								<>
									<div className={globalClasses.accordionRoot}>
										<Accordion defaultExpanded>
											<AccordionSummary expandIcon={<ExpandMoreIcon />}>
												<Typography>General Information</Typography>
											</AccordionSummary>

											<AccordionDetails>
												<div className={muiClasses.root}>
													<TabsUnstyled
														defaultValue={0}
														className={muiClasses.tabRoot}
													>
														<TabsListUnstyled
															className={muiClasses.tabMainDiv}
															style={{ width: previewBool ? '60%' : '100%' }}
														>
															<TabUnstyled
																onClick={() => {
																	setQuestionType('poll');
																	resetSlides('poll');
																}}
															>
																Add Poll
															</TabUnstyled>
															<TabUnstyled
																onClick={() => {
																	setQuestionType('quiz');
																	resetSlides('quiz');
																}}
															>
																Add Quiz
															</TabUnstyled>
														</TabsListUnstyled>
														<TabPanelUnstyled value={0}></TabPanelUnstyled>
														<TabPanelUnstyled value={1}></TabPanelUnstyled>
													</TabsUnstyled>
												</div>
												<br />
												<div className={classes.datePickerContainer}>
													<h6
														className={
															isError.endDate
																? globalClasses.errorState
																: globalClasses.noErrorState
														}
													>
														{questionType === 'quiz'
															? 'QUIZ END DATE'
															: 'POLL END DATE'}
													</h6>
													<div
														className={classes.datePicker}
														style={{
															marginBottom: calenderOpen ? '250px' : ''
														}}
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
														? `${
																'You need to select date to post ' +
																questionType
														  }`
														: ''}
												</p>
											</AccordionDetails>
										</Accordion>
									</div>

									<QuestionDraggable onDragEnd={onDragEnd}>
										{questionSlides.map((item, index) => {
											return (
												<>
													<QuestionForm
														item={item}
														index={index}
														type={questionType}
														key={item.sort_order}
														sendDataToParent={(data) => setNewData(data, index)}
														handleDeleteMedia={(data) =>
															handleMediaDataDelete(data, index)
														}
														handleDeleteQuestionSlide={(sortOrder) =>
															handleElementDelete(sortOrder)
														}
														initialData={item.data && item.data}
														setPreviewBool={setPreviewBool}
														setPreviewFile={setPreviewFile}
														isEdit={editPoll || editQuiz}
														setDisableDropdown={setDisableDropdown}
													/>
												</>
											);
										})}
									</QuestionDraggable>
									<br />
									<Button
										style={{ marginTop: '4rem' }}
										disabled={false}
										buttonNews={true}
										onClick={() => handleNewSlide()}
										text={'ADD QUESTION'}
									/>
								</>
								<br />
								<div className={classes.buttonDiv}>
									<div className={classes.leftButtonDiv}>
										{editQuiz || editPoll ? (
											<div className={classes.editDeleteBtn}>
												<Button
													disabled={deleteBtnStatus}
													button2={editQuiz || editPoll ? true : false}
													onClick={() => {
														if (!deleteBtnStatus) {
															toggleDeleteModal();
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
														buttonStop={true}
														onClick={() => {
															if (!deleteBtnStatus) {
																toggleStopModal();
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
														: status === 'draft'
														? 'PUBLISH'
														: 'SAVE CHANGES'
												}
												disabled={
													(editPoll || editQuiz) &&
													validateForm(form) &&
													status === 'draft'
														? false
														: !(editPoll || editQuiz)
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
										{
											<img
												src={previewFile.media_url}
												className={globalClasses.previewFile}
												style={{
													width: '100%',
													height: `${8 * 4}rem`,
													objectFit: 'contain',
													objectPosition: 'center'
												}}
											/>
										}
									</div>
								</div>
							)}
						</div>
					</Slide>
				</LoadingOverlay>
			</Slider>

			<DeleteModal
				open={stopStatus ? openStopPopup : openDeletePopup}
				toggle={stopStatus ? toggleStopModal : toggleDeleteModal}
				deleteBtn={() => {
					stopStatus
						? stopQuizPoll(editQuestionData?.id)
						: deleteQuiz(
								editQuestionData?.id,
								status.toLowerCase(),
								quiz ? 'quiz' : 'poll'
						  );
				}}
				text={quiz ? 'Quiz' : 'Poll'}
				wrapperRef={dialogWrapper}
				stop={stopStatus ? true : false}
			/>
		</>
	);
};

UploadOrEditQuiz.propTypes = {
	heading1: PropTypes.string,
	open: PropTypes.bool.isRequired,
	buttonText: PropTypes.string.isRequired,
	editQuiz: PropTypes.bool,

	setPreviewFile: PropTypes.func.isRequired,
	previewRef: PropTypes.oneOfType([
		PropTypes.func,
		PropTypes.shape({ current: PropTypes.elementType })
	]).isRequired,
	dialogWrapper: PropTypes.oneOfType([
		PropTypes.func,
		PropTypes.shape({ current: PropTypes.elementType })
	]).isRequired,
	setDisableDropdown: PropTypes.func,
	quiz: PropTypes.bool,
	editPoll: PropTypes.bool,
	handleClose: PropTypes.func.isRequired,
	page: PropTypes.string,
	status: PropTypes.string,
	type: PropTypes.string, //poll or quiz,
	//new
	// open: PropTypes.bool.isRequired,
	// handleClose: PropTypes.func.isRequired,
	title: PropTypes.string.isRequired
	// heading1: PropTypes.string.isRequired,
	// buttonText: PropTypes.string.isRequired,
	// type: PropTypes.string.isRequired
};

export default UploadOrEditQuiz;
