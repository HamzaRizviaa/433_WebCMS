/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */

import React, { forwardRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '../../button';
import axios from 'axios';
import Slider from '../../slider';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../../../pages/PostLibrary/_calender.scss';
import Close from '@material-ui/icons/Close';
import DeleteModal from '../../DeleteModal';
import { toast } from 'react-toastify';
import { formatDate, getCalendarText2 } from '../../../utils';
import uploadFileToServer from '../../../utils/uploadFileToServer';
import { useDispatch, useSelector } from 'react-redux';
import { getQuestions } from '../../../pages/QuestionLibrary/questionLibrarySlice';
import { getLocalStorageDetails } from '../../../utils';
import QuestionTabPanes from '../UploadQuestionHeader/QuestionTabPanes';
import { ReactComponent as CalenderYellow } from '../../../assets/Calender_Yellow.svg';
import { useRef } from 'react';
import { useStyles as globalUseStyles } from '../../../styles/global.style';
import { useStyles } from './UploadOrEditQuiz.style';
import validateForm from '../../../utils/validateForm';
import validateDraft from '../../../utils/validateDraft';
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
import DraggableContainers from '../DraggableContainers';
import {
	checkEmptyQuestion, //empty data
	checkNewElementQuestion, // api data and question form data
	comparingFormFields, // api end date and form end date
	checkSortOrderOnEdit,
	checkEmptyQuestionDraft,
	checkNewElementQuestionDraft
} from '../../../utils/questionUtils';

import { compact } from 'lodash';

const UploadOrEditQuiz = ({
	open,
	previewRef,
	dialogWrapper,
	quiz,
	handleClose,
	page,
	status,
	type,
	location,
	isEdit,
	notifID,
	rowType
}) => {
	const [convertedDate, setConvertedDate] = useState(null);
	const [calenderOpen, setCalenderOpen] = useState(false);
	const [deleteBtnStatus, setDeleteBtnStatus] = useState(false);
	const [postButtonStatus, setPostButtonStatus] = useState(false);
	const [editQuizBtnDisabled, setEditQuizBtnDisabled] = useState(false);
	const [draftBtnDisabled, setDraftBtnDisabled] = useState(false);
	const [isError, setIsError] = useState({});
	const [openDeletePopup, setOpenDeletePopup] = useState(false);
	const [openStopPopup, setOpenStopPopup] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [previewBool, setPreviewBool] = useState(false);
	const [previewFile, setPreviewFile] = useState(null);
	const [disableDropdown, setDisableDropdown] = useState(true);
	const [questionType, setQuestionType] = useState('poll');
	const [questionSlides, setQuestionSlides] = useState([]); // data in slides
	const [questionIds, setQuestionIds] = useState([]);

	const [form, setForm] = useState({
		end_date: null
	});

	const loadingRef = useRef(null);
	const dispatch = useDispatch();
	const classes = useStyles();
	const globalClasses = globalUseStyles();

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
			return [
				...prev,
				{
					sortOrder: questionSlides?.length + 1
				}
			];
		});
	};

	useEffect(() => {
		handleNewSlide();
	}, [open]);

	const setNewData = (childData, index) => {
		let dataCopy = [...questionSlides];

		dataCopy[index].data = [
			{
				...(dataCopy[index]?.data ? dataCopy[index]?.data[0] : {}),
				...childData
			}
		];

		setQuestionSlides(dataCopy);
	};

	const handleElementDelete = (sortOrder) => {
		const slides = [...questionSlides];
		const updatedSlides = slides.filter((file) => file.sortOrder !== sortOrder);

		if (sortOrder || sortOrder === 0) {
			setQuestionSlides(updatedSlides);
		}
	};

	const handleMediaDataDelete = (elementData, index) => {
		let dataCopy = [...questionSlides];
		if (elementData) {
			setQuestionSlides(
				dataCopy.map((item, i) => {
					if (index === i) {
						const newItem = {
							...item,
							data: [
								{
									...item.data[0],
									uploadedFiles: [],
									file_name: '',
									image: ''
								}
							]
						};
						return newItem;
					} else {
						return item;
					}
				})
			);
		}
	};

	useEffect(() => {
		if (
			isEdit &&
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

	const toggleDeleteModal = () => {
		setOpenDeletePopup(!openDeletePopup);
	};

	const toggleStopModal = () => {
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
			let allQuestionIds = [];
			allQuestionIds =
				editQuestionData?.questions?.length > 0 &&
				editQuestionData?.questions?.map((data) => data?.id);
			setQuestionIds(allQuestionIds); //to pass to delete data
			setQuestionType(editQuestionData?.question_type);

			setForm((prev) => {
				return {
					...prev,
					end_date: editQuestionData?.end_date
						? editQuestionData?.end_date
						: null
				};
			});
			setQuestionSlides(
				updateDataFromAPI(
					editQuestionData.questions,
					editQuestionData?.question_type,
					editQuestionData?.end_date
				)
			);
		}
	}, [editQuestionData]);

	const updateLabelsFromAPI = (labels) => {
		let newLabels = [];
		if (labels) {
			labels.map((label) => newLabels.push({ id: -1, name: label }));
			return newLabels;
		} else {
			return undefined;
		}
	};

	console.log(questionSlides, 'QSS');

	const updateDataFromAPI = (apiData, question_type, end_date) => {
		let modifiedData = apiData?.map(({ id, position, ...rest }) => {
			return {
				question_type: question_type,
				end_date: end_date,
				sortOrder: position,
				id: id,
				data: [
					{
						...rest,
						id: id,
						labels: updateLabelsFromAPI(rest?.labels),
						uploadedFiles: rest?.image
							? [
									{
										media_url:
											`${process.env.REACT_APP_MEDIA_ENDPOINT}/${rest?.image}` ||
											undefined,
										file_name: rest?.file_name,
										width: rest?.width,
										height: rest?.height
									}
							  ]
							: undefined
					}
				]
			};
		});

		return modifiedData;
	};

	useEffect(() => {
		if (!open) {
			resetState();
		}
		!isEdit ? resetState() : '';
	}, [open]);

	const createQuestion = async (id, mediaFiles, draft) => {
		setPostButtonStatus(true);

		let slidesData =
			questionSlides?.length > 0
				? questionSlides.map((item, index) => {
						const answersToSend =
							item.data[0]?.answers?.length > 0
								? item.data[0]?.answers.map((item, index) => {
										return {
											...item,
											position: index,
											type:
												questionType === 'quiz' && index === 0
													? 'right_answer'
													: questionType === 'quiz' && index > 0
													? 'wrong_answer_' + index
													: 'poll'
										};
								  })
								: [];

						if (!item.data)
							return { ...item, position: index + 1, sortOrder: index + 1 };
						return {
							height: item?.data[0] ? item?.data[0]?.height : 0,
							width: item?.data[0] ? item?.data[0]?.width : 0,
							file_name: mediaFiles[index]?.file_name
								? mediaFiles[index]?.file_name
								: '',
							image: mediaFiles[index]?.media_url
								? mediaFiles[index]?.media_url?.split('cloudfront.net/')[1] ||
								  mediaFiles[index]?.media_url
								: '',
							labels: item.data[0]?.labels || [],
							answers: answersToSend || [],
							question: item.data[0]?.question || '',
							dropbox_url: item.data[0]?.dropbox_url || '',
							sortOrder: index + 1,
							position: index + 1,
							...(item.id ? { id: item?.id } : {})
						};
				  })
				: [];

		slidesData = compact(slidesData);

		try {
			const result = await axios.post(
				`${process.env.REACT_APP_API_ENDPOINT}/question/add-question`,
				{
					general_info: {
						save_draft: draft,
						question_type: questionType,
						...(isEdit && status === 'CLOSED'
							? {}
							: { end_date: convertedDate.split('T')[0] })
					},
					questions: slidesData,
					user_data: {
						id: `${getLocalStorageDetails()?.id}`,
						first_name: `${getLocalStorageDetails()?.first_name}`,
						last_name: `${getLocalStorageDetails()?.last_name}`
					},
					...(isEdit && id ? { question_id: id } : {})
				},
				{
					headers: {
						Authorization: `Bearer ${getLocalStorageDetails()?.access_token}`
					}
				}
			);

			if (result?.data?.status_code === 200) {
				toast.success(
					isEdit ? 'Question has been edited!' : 'Question has been created!'
				);
				setIsLoading(false);

				handleClose();
				dispatch(getQuestions({ page }));
			}
		} catch (e) {
			toast.error(
				isEdit ? 'Failed to edit Question!' : 'Failed to create Question!'
			);
			setIsLoading(false);

			console.log(e, 'Failed create / edit Question');
		}
	};

	const deleteQuiz = async (draft) => {
		if (!editQuestionData) return;
		const questions_ids = editQuestionData.questions?.map((q) => q.id) || [];

		setDeleteBtnStatus(true);

		try {
			const result = await axios.post(
				`${process.env.REACT_APP_API_ENDPOINT}/question/delete-question`,
				{
					question_meta_id: editQuestionData.id,
					questions_ids,
					is_draft: draft
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
		}
		setOpenDeletePopup(!openDeletePopup);
	};

	const stopQuizPoll = async (id) => {
		setDeleteBtnStatus(true);
		try {
			const result = await axios.post(
				`${process.env.REACT_APP_API_ENDPOINT}/question/stop-question`,
				{
					question_meta_id: id
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
		setOpenStopPopup(!openStopPopup);
	};

	const resetState = () => {
		setQuestionSlides([]);
		setPreviewFile(null);
		setPreviewBool(false);
		setDisableDropdown(true);
		setQuestionType('poll');
		setConvertedDate(null);
		setPostButtonStatus(false);
		setIsError({});
		setEditQuizBtnDisabled(false);
		setDraftBtnDisabled(false);
		setTimeout(() => {
			setDeleteBtnStatus(false);
		}, 1000);

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
		if (isEdit) {
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

	const handlePreviewEscape = () => {
		setPreviewBool(false);
		setPreviewFile(null);
	};

	useEffect(() => {
		if (editQuestionData) {
			setDraftBtnDisabled(
				!validateDraft(form, null, null, questionSlides) ||
					comparingFormFields(editQuestionData, convertedDate)
			);
		}
	}, [editQuestionData, form, convertedDate]);

	useEffect(() => {
		const validateEmptyQuestionArray = [
			checkEmptyQuestionDraft(questionSlides)
		];

		const validateEmptyQuestionAndEditComparisonArray = [
			checkNewElementQuestionDraft(editQuestionData, questionSlides)
		];

		if (
			!validateDraft(form, null, null, questionSlides) ||
			!comparingFormFields(editQuestionData, convertedDate)
		) {
			setDraftBtnDisabled(
				!validateEmptyQuestionArray.every((item) => item === true) ||
					!validateDraft(form, null, null, questionSlides)
			);
		} else {
			if (editQuestionData?.questions?.length !== questionSlides?.length) {
				setDraftBtnDisabled(
					!validateEmptyQuestionArray.every((item) => item === true)
				);
			} else {
				if (
					validateEmptyQuestionAndEditComparisonArray.every(
						(item) => item === true
					) ||
					!validateEmptyQuestionArray.every((item) => item === true)
				) {
					setDraftBtnDisabled(
						!checkSortOrderOnEdit(editQuestionData, questionSlides)
					);
				} else {
					setDraftBtnDisabled(
						validateEmptyQuestionAndEditComparisonArray.every(
							(item) => item === true
						) || !validateEmptyQuestionArray.every((item) => item === true)
					);
				}
			}
		}
	}, [questionSlides]);

	useEffect(() => {
		if (editQuestionData) {
			const validateEmptyQuestionArray = [
				checkEmptyQuestion(questionSlides),
				questionSlides?.length !== 0
			];

			setEditQuizBtnDisabled(
				!validateForm(form, null, null, questionSlides) ||
					!validateEmptyQuestionArray.every((item) => item === true) ||
					comparingFormFields(editQuestionData, convertedDate)
			);
		}
	}, [editQuestionData, form, convertedDate]);

	useEffect(() => {
		//empty questionSlides
		const validateEmptyQuestionArray = [
			checkEmptyQuestion(questionSlides),
			questionSlides?.length !== 0
		];

		//check question slides is zero , and edit data from api
		const validateEmptyQuestionSlidesAndEditComparisonArray = [
			checkNewElementQuestion(editQuestionData, questionSlides),
			questionSlides?.length !== 0
		];

		//validate form OR compare generalInformation form
		if (
			!validateForm(form, null, null, questionSlides) ||
			!comparingFormFields(editQuestionData, convertedDate)
		) {
			setEditQuizBtnDisabled(
				!validateEmptyQuestionArray.every((item) => item === true) ||
					!validateForm(form, null, null, questionSlides)
			);
		} else {
			if (editQuestionData?.questions?.length !== questionSlides?.length) {
				setEditQuizBtnDisabled(
					!validateEmptyQuestionArray.every((item) => item === true)
				);
			} else {
				setEditQuizBtnDisabled(
					validateEmptyQuestionSlidesAndEditComparisonArray.every(
						(item) => item === true
					) || !validateEmptyQuestionArray.every((item) => item === true)
				);
			}
		}
	}, [questionSlides]);

	const handlePostQuizPollBtn = () => {
		if (
			!validateForm(form, null, null, questionSlides) ||
			(editQuizBtnDisabled && status === 'ACTIVE')
		) {
			validatePostBtn();
		} else {
			setIsLoading(true);
			setPostButtonStatus(true);
			loadingRef.current.scrollIntoView({ behavior: 'smooth' });

			if (isEdit) {
				let images = questionSlides?.map(async (item, index) => {
					let quesData;
					if (item?.data[0]?.uploadedFiles[0]?.file) {
						quesData = await uploadFileToServer(
							item?.data[0]?.uploadedFiles[0],
							'questionlibrary'
						);

						return quesData;
					} else {
						quesData = item?.data[0]?.uploadedFiles[0];
						return quesData;
					}
				});

				Promise.all([...images])
					.then((mediaFiles) => {
						createQuestion(editQuestionData?.id, mediaFiles, false);
					})
					.catch(() => {
						setIsLoading(false);
					});
			} else {
				let images = questionSlides?.map(async (item) => {
					let quesData = await uploadFileToServer(
						item?.data[0]?.uploadedFiles[0],
						'questionlibrary'
					);
					return quesData;
				});

				Promise.all([...images])
					.then((mediaFiles) => {
						createQuestion(null, mediaFiles, false);
					})
					.catch(() => {
						setIsLoading(false);
					});
			}
		}
	};

	const handleDraftSave = async () => {
		if (!validateDraft(form, null, null, questionSlides) || draftBtnDisabled) {
			validateDraftBtn();
		} else {
			setIsLoading(true);
			setPostButtonStatus(true);
			loadingRef.current.scrollIntoView({ behavior: 'smooth' });

			if (isEdit) {
				let images = questionSlides?.map(async (item, index) => {
					let quesData = {};
					if (item?.data[0]?.uploadedFiles?.length) {
						if (item?.data[0]?.uploadedFiles[0]?.file) {
							quesData = await uploadFileToServer(
								item?.data[0]?.uploadedFiles[0],
								'questionlibrary'
							);

							return quesData;
						} else {
							quesData = item?.data[0]?.uploadedFiles[0];

							return quesData;
						}
					}

					return quesData;
				});

				Promise.all([...images])
					.then((mediaFiles) => {
						createQuestion(editQuestionData?.id, mediaFiles, true);
					})
					.catch(() => {
						setIsLoading(false);
					});
			} else {
				let images = questionSlides?.map(async (item) => {
					let quesData;
					if (item?.data[0]?.uploadedFiles?.length) {
						quesData = await uploadFileToServer(
							item?.data[0]?.uploadedFiles[0],
							'questionlibrary'
						);
					}

					return quesData;
				});

				Promise.all([...images])
					.then((mediaFiles) => {
						createQuestion(null, mediaFiles, true);
					})
					.catch(() => {
						setIsLoading(false);
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

	const setQuesType = (type) => {
		setQuestionType(type);
	};

	return (
		<>
			<Slider
				open={open}
				handleClose={() => {
					handleClose();
				}}
				title={
					!isEdit
						? 'Upload Question'
						: isEdit && location === 'article'
						? rowType === 'poll'
							? 'Edit Poll'
							: 'Edit Quiz'
						: status === 'draft'
						? 'Drafted Question'
						: 'Edit Question'
				}
				disableDropdown={disableDropdown}
				preview={previewBool}
				handlePreview={() => {
					handlePreviewEscape();
				}}
				notifID={status === 'CLOSED' ? '' : notifID}
			>
				<LoadingOverlay
					active={isLoading}
					className={classes.loadingOverlay}
					spinner={<PrimaryLoader />}
				>
					<div
						ref={loadingRef}
						className={`${
							previewFile != null
								? globalClasses.previewContentWrapper
								: globalClasses.contentWrapper
						}`}
					>
						{questionEditStatus === 'loading' ? (
							<PrimaryLoader />
						) : (
							<>
								{location === 'article' ? (
									<QuestionDraggable>
										{questionSlides.map((item, index) => {
											return (
												<>
													<QuestionForm
														isEdit={isEdit}
														location={location}
														type={questionType}
														key={item.sortOrder}
														setPreviewBool={setPreviewBool}
														setPreviewFile={setPreviewFile}
														setDisableDropdown={setDisableDropdown}
														initialData={isEdit && item?.data && item?.data[0]}
													/>
												</>
											);
										})}
									</QuestionDraggable>
								) : (
									<>
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
															{/* tab panes on first upload*/}
															{((isEdit && status === 'draft') || !isEdit) && (
																<>
																	<QuestionTabPanes
																		edit={
																			editQuestionData?.question_type && isEdit
																		}
																		status={status}
																		type={questionType}
																		resetSlides={(type) => resetSlides(type)}
																		setQuesType={(type) => setQuesType(type)}
																	/>
																</>
															)}
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
																			isEdit && status === 'CLOSED'
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
																			isEdit && status === 'CLOSED'
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
													{/* isEdit ? {//tab panes // question form // quiz results } : question form */}

													{questionSlides.map((item, index) => {
														return (
															<DraggableContainers
																location={location}
																isEdit={isEdit}
																item={item}
																index={index}
																// sortingPosition={item?.position}
																type={questionType}
																key={item.position + 1}
																status={status}
																endDate={form.end_date}
																sendDataToParent={(data) =>
																	setNewData(data, index)
																}
																handleDeleteMedia={(data) =>
																	handleMediaDataDelete(data, index)
																}
																handleDeleteQuestionSlide={(sortOrder) =>
																	handleElementDelete(sortOrder)
																}
																initialData={item?.data && item?.data[0]} // passing data to child
																setPreviewFile={setPreviewFile}
																setPreviewBool={setPreviewBool}
																setDisableDropdown={setDisableDropdown}
																//tab panes
																resetSlides={(type) => resetSlides(type)}
																setQuesType={(type) => setQuesType(type)}
															/>
														);
													})}
												</QuestionDraggable>

												{!isEdit && questionSlides?.length < 10 ? (
													<Button
														style={{
															marginTop: '2rem'
														}}
														buttonNews={true}
														disabled={false}
														onClick={() => handleNewSlide()}
														text={'ADD QUESTION'}
													/>
												) : isEdit &&
												  status === 'draft' &&
												  questionSlides?.length < 10 ? (
													<Button
														style={{
															marginTop: '2rem'
														}}
														buttonNews={true}
														disabled={false}
														onClick={() => handleNewSlide()}
														text={'ADD QUESTION'}
													/>
												) : (
													''
												)}
											</>
											<br />
											<p className={globalClasses.mediaError}></p>
											<br />
											<div className={classes.buttonDiv}>
												<div className={classes.leftButtonDiv}>
													{isEdit ? (
														<div className={classes.editDeleteBtn}>
															<Button
																disabled={deleteBtnStatus}
																button2={isEdit ? true : false}
																onClick={() => {
																	if (!deleteBtnStatus) {
																		toggleDeleteModal();
																	}
																}}
																text={
																	questionType === 'quiz'
																		? 'DELETE QUIZ'
																		: 'DELETE POLL'
																}
															/>
														</div>
													) : (
														<></>
													)}

													{isEdit && status === 'ACTIVE' ? (
														<>
															<div className={classes.stopBtn}>
																<Button
																	buttonStop={true}
																	onClick={() => {
																		if (!deleteBtnStatus) {
																			toggleStopModal();
																		}
																	}}
																	text={
																		questionType === 'quiz'
																			? 'STOP QUIZ'
																			: 'STOP POLL'
																	}
																/>
															</div>
														</>
													) : (
														<></>
													)}
												</div>
												<div className={classes.publishDraftDiv}>
													{status === 'draft' || !isEdit ? (
														<div
															className={
																isEdit ? classes.draftBtnEdit : classes.draftBtn
															}
														>
															<Button
																disabledDraft={
																	isEdit
																		? draftBtnDisabled
																		: !validateDraft(
																				form,
																				null,
																				null,
																				questionSlides
																		  )
																}
																onClick={() => handleDraftSave()}
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
														className={[
															isEdit && validateForm(form)
																? classes.addMediaBtn
																: isEdit
																? classes.addMediaBtnEdit
																: classes.addMediaBtn,
															classes.saveChangesbtn
														].join(' ')}
													>
														<Button
															text={
																!isEdit && questionType === 'quiz'
																	? 'ADD QUIZ'
																	: !isEdit && questionType === 'poll'
																	? 'ADD POLL'
																	: status === 'draft'
																	? 'PUBLISH'
																	: 'SAVE CHANGES'
															}
															disabled={
																isEdit &&
																validateForm(
																	form,
																	null,
																	null,
																	questionSlides
																) &&
																status === 'draft'
																	? false
																	: !isEdit
																	? !validateForm(
																			form,
																			null,
																			null,
																			questionSlides
																	  )
																	: editQuizBtnDisabled
															}
															onClick={() => {
																handlePostQuizPollBtn();
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
									</>
								)}
							</>
						)}
					</div>
				</LoadingOverlay>
			</Slider>

			<DeleteModal
				open={openStopPopup ? openStopPopup : openDeletePopup}
				toggle={openStopPopup ? toggleStopModal : toggleDeleteModal}
				deleteBtn={() => {
					openStopPopup
						? stopQuizPoll(editQuestionData?.id)
						: deleteQuiz(status.toLowerCase());
				}}
				text={questionType}
				wrapperRef={dialogWrapper}
				stop={openStopPopup ? true : false}
			/>
		</>
	);
};

UploadOrEditQuiz.propTypes = {
	heading1: PropTypes.string,
	rowType: PropTypes.string,
	open: PropTypes.bool.isRequired,
	buttonText: PropTypes.string.isRequired,
	notifID: PropTypes.string,
	setPreviewFile: PropTypes.func.isRequired,
	setDisableDropdown: PropTypes.func,
	quiz: PropTypes.bool,
	handleClose: PropTypes.func.isRequired,
	page: PropTypes.string,
	status: PropTypes.string,
	type: PropTypes.string,
	previewRef: PropTypes.oneOfType([
		PropTypes.func,
		PropTypes.shape({ current: PropTypes.elementType })
	]).isRequired,
	dialogWrapper: PropTypes.oneOfType([
		PropTypes.func,
		PropTypes.shape({ current: PropTypes.elementType })
	]).isRequired
};

export default UploadOrEditQuiz;
