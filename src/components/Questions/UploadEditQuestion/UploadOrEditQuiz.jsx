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
// import moment from 'moment';
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
	const [isLoadingcreateViral, setIsLoadingcreateViral] = useState(false);
	const [editQuizBtnDisabled, setEditQuizBtnDisabled] = useState(false);
	const [draftBtnDisabled, setDraftBtnDisabled] = useState(false);
	const [isError, setIsError] = useState({});
	const [openDeletePopup, setOpenDeletePopup] = useState(false);
	const [openStopPopup, setOpenStopPopup] = useState(false);
	const [stopStatus, setStopStatus] = useState(false);
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
		console.log(childData, index, 'child data , new data');
		// [ 0 : data [ {},{}] ]

		let dataCopy = [...questionSlides];
		dataCopy[index].data = [
			{
				...(dataCopy[index]?.data?.length ? dataCopy[index]?.data[0] : {}),
				...childData
			}
		];
		console.log(dataCopy, 'dataCopy');
		setQuestionSlides(dataCopy);
	};

	const handleElementDelete = (sortOrder) => {
		const slides = [...questionSlides];
		const updatedSlides = slides.filter((file) => file.sortOrder !== sortOrder);
		if (sortOrder) {
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
							uploadedFiles: [],
							data: [
								{
									...item.data[0],
									uploadedFiles: []
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
			)}-${('0' + da?.getDate()).slice(-2)}`;
			setConvertedDate(toSend);
		}
	}, [form.end_date]);

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

	const updateDataFromAPI = (apiData, question_type, end_date) => {
		let modifiedData = apiData?.map((rest) => {
			return {
				question_type: question_type,
				end_date: end_date,
				sortOrder: rest?.position,
				id: rest?.id,
				...rest,
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
					: undefined,
				labels: updateLabelsFromAPI(rest?.labels)
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
		console.log(mediaFiles, 'mediaFiles');
		let slidesData =
			questionSlides?.length > 0
				? questionSlides.map((item, index) => {
						if (!item.data)
							return { ...item, position: index, sortOrder: index + 1 };

						// const uploadedFiles = item.data[0]?.uploadedFiles
						// 	? item.data[0]?.uploadedFiles
						// 	: item.uploadedFiles;

						return {
							height: item?.data[0] ? item?.data[0]?.height : 0,
							width: item?.data[0] ? item?.data[0]?.width : 0,
							file_name: mediaFiles ? mediaFiles[0]?.file_name : '',
							image: mediaFiles
								? mediaFiles[0]?.media_url?.split('cloudfront.net/')[1] ||
								  mediaFiles[0]?.media_url
								: '',
							labels: item.data[0]?.labels || item.labels || [],
							answers: item.data[0]?.answers || item.answers,
							question: item.data[0]?.question || item.question,
							dropbox_url: item.data[0]?.dropbox_url || item.dropbox_url,
							sortOrder: index + 1,
							position: index,
							...(item.id ? { id: item.id } : {})
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
						end_date: convertedDate.split('T')[0],
						question_type: questionType
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
				// setPostButtonStatus(false);
				handleClose();
				dispatch(getQuestions({ page }));
			}
		} catch (e) {
			toast.error(
				isEdit ? 'Failed to edit Question!' : 'Failed to create Question!'
			);
			setIsLoading(false);
			// setPostButtonStatus(false);
			console.log(e, 'Failed create / edit Question');
		}
	};

	const deleteQuiz = async (draft) => {
		if (!editQuestionData) return;
		const question_ids = editQuestionData.questions?.map((q) => q.id) || [];

		setDeleteBtnStatus(true);

		try {
			const result = await axios.post(
				`${process.env.REACT_APP_API_ENDPOINT}/question/delete-question`,
				{
					question_meta_id: editQuestionData.id,
					question_ids,
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
		setQuestionType('poll');
		setPreviewBool(false);
		setDisableDropdown(true);
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

	// useEffect(() => {
	// 	if (editQuestionData) {
	// 		setDraftBtnDisabled(
	// 			!validateDraft(form) ||
	// 				postButtonStatus ||
	// 				(type === 'quiz'
	// 					? editQuestionData?.quiz_end_date === convertedDate
	// 					: editQuestionData?.poll_end_date === convertedDate)
	// 		);
	// 	}
	// }, [editQuestionData, form, convertedDate]);
	useEffect(() => {
		if (editQuestionData) {
			setDraftBtnDisabled(
				!validateDraft(form, null, null, questionSlides) ||
					comparingFormFields(editQuestionData, form)
				// &&
				// editQuestionData?.labels?.length === questionSlides?.labels.length &&
				// 	!checkDuplicateLabel(form, editQuestionData)
			);
		}
	}, [editQuestionData, form]);

	useEffect(() => {
		const validateEmptyQuestionArray = [
			checkEmptyQuestionDraft(questionSlides)
		];
		console.log(validateEmptyQuestionArray, 'DRAFT 1');

		const validateEmptyQuestionAndEditComparisonArray = [
			checkNewElementQuestionDraft(editQuestionData, questionSlides)
		];
		console.log(validateEmptyQuestionAndEditComparisonArray, 'DRAFT 2');
		if (
			!validateDraft(form, null, null, questionSlides) ||
			!comparingFormFields(editQuestionData, form)
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
					console.log('3rd');
					setDraftBtnDisabled(
						!checkSortOrderOnEdit(editQuestionData, questionSlides)
					);
				} else {
					console.log('4th');
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
					comparingFormFields(editQuestionData, form)
			);
		}
	}, [editQuestionData, form, convertedDate]);
	console.log(
		editQuizBtnDisabled,
		draftBtnDisabled,
		'======= edit Disabled , draft ======='
	);
	console.log(questionSlides, '======= questionSlides =======');
	useEffect(() => {
		//empty questionSlides
		const validateEmptyQuestionArray = [
			checkEmptyQuestion(questionSlides),
			questionSlides?.length !== 0
		];
		console.log(validateEmptyQuestionArray, 'empty 1st');

		//check question slides is zero , and edit data from api
		const validateEmptyQuestionSlidesAndEditComparisonArray = [
			checkNewElementQuestion(editQuestionData, questionSlides),
			questionSlides?.length !== 0
		];
		console.log(
			validateEmptyQuestionSlidesAndEditComparisonArray,
			'compare 2nd'
		);
		console.log(
			!validateForm(form, null, null, questionSlides),
			!comparingFormFields(editQuestionData, form)
		);

		//validate form OR compare generalInformation form
		if (
			!validateForm(form, null, null, questionSlides) &&
			!comparingFormFields(editQuestionData, form)
		) {
			console.log('if');
			setEditQuizBtnDisabled(
				!validateEmptyQuestionArray.every((item) => item === true) ||
					!validateForm(form, null, null, questionSlides)
			);
		} else {
			console.log('else');
			if (editQuestionData?.questions?.length !== questionSlides?.length) {
				setEditQuizBtnDisabled(
					!validateEmptyQuestionSlidesAndEditComparisonArray.every(
						(item) => item === true
					) || !validateEmptyQuestionArray.every((item) => item === true)
				);
			} else {
				setEditQuizBtnDisabled(
					validateEmptyQuestionSlidesAndEditComparisonArray.every(
						(item) => item === true
					) || !validateEmptyQuestionArray.every((item) => item === true)
				);

				// setEditBtnDisabled(checkMediaUrlPublish(news));
			}
		}
	}, [questionSlides]);

	//editQuizBtnDisabled button - whether you can click or not
	//!validateForm(form) || (editQuizBtnDisabled && status === 'ACTIVE')
	const handlePostQuizPollBtn = () => {
		if (
			!validateForm(form, null, null, questionSlides) ||
			(editQuizBtnDisabled && status === 'ACTIVE')
		) {
			validatePostBtn();
		} else {
			setPostButtonStatus(true);
			loadingRef.current.scrollIntoView({ behavior: 'smooth' });
			setIsLoadingcreateViral(true);
			if (isEdit) {
				let images = questionSlides?.map(async (item) => {
					let quesData;
					if (item?.data[0]?.file) {
						quesData = await uploadFileToServer(
							item?.data[0],
							'questionlibrary'
						);

						return quesData;
					} else {
						quesData = item?.data[0];
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
						item?.data[0],
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

				// try {
				// 	createQuestion(null, false);
				// } catch (err) {
				// 	setIsLoadingcreateViral(false);
				// 	console.log(err);
				// }
			}
		}
	};

	console.log(draftBtnDisabled, 'dft');
	//draftBtnDisabled button - whether you can click or not
	//validateDraft - color grey or yellow
	const handleDraftSave = async () => {
		if (!validateDraft(form) || draftBtnDisabled) {
			console.log('alaba');
			validateDraftBtn();
		} else {
			setPostButtonStatus(true);
			loadingRef.current.scrollIntoView({ behavior: 'smooth' });
			setIsLoadingcreateViral(true);
			if (isEdit) {
				let images = questionSlides?.map(async (item) => {
					let quesData;
					if (item?.data[0]?.file) {
						quesData = await uploadFileToServer(
							item?.data[0],
							'questionlibrary'
						);

						return quesData;
					} else {
						quesData = item?.data[0];
						return quesData;
					}
				});

				Promise.all([...images])
					.then((mediaFiles) => {
						createQuestion(editQuestionData?.id, mediaFiles, true);
					})
					.catch(() => {
						setIsLoading(false);
					});
				// try {
				// 	createQuestion(editQuestionData?.id, true);
				// } catch (err) {
				// 	setIsLoadingcreateViral(false);
				// 	console.log(err);
				// }
			} else {
				let images = questionSlides?.map(async (item) => {
					let quesData = await uploadFileToServer(
						item?.data[0],
						'questionlibrary'
					);
					return quesData;
				});

				Promise.all([...images])
					.then((mediaFiles) => {
						createQuestion(null, mediaFiles, true);
					})
					.catch(() => {
						setIsLoading(false);
					});
				// try {
				// 	createQuestion(null, true);
				// } catch (err) {
				// 	setIsLoadingcreateViral(false);
				// 	console.log(err);
				// }
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
				notifID={
					location === 'article' || status === 'CLOSED' || status === 'draft'
						? ''
						: notifID
				}
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
													initialData={item}
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
																	edit={isEdit}
																	status={status}
																	location={location}
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
																		isEdit && status === 'CLOSED' ? true : false
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
																		isEdit && status === 'CLOSED' ? false : true
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
															type={questionType}
															key={item.sortOrder}
															status={status}
															endDate={form.end_date}
															sendDataToParent={
																(data) => setNewData(data, index) //getting data from child
															}
															handleDeleteMedia={(data) =>
																handleMediaDataDelete(data, index)
															}
															handleDeleteQuestionSlide={(sortOrder) =>
																handleElementDelete(sortOrder)
															}
															initialData={isEdit && item} // passing data to child
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

											{/* {isEdit &&
												editQuestionData?.questions?.length === 0 &&
												(questionSlides?.length < 10 ? (
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
												))} */}
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
											) : isEdit && status === 'draft' ? (
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
																// disabled={deleteBtnStatus}
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
															isEdit && status === 'ACTIVE'
																? editQuizBtnDisabled
																: !validateForm(
																		form,
																		null,
																		null,
																		questionSlides
																  )
															// (isEdit) &&
															// validateForm(form) &&
															// status === 'draft'
															// 	? false
															// 	: !(isEdit)
															// 	? !validateForm(form)
															// 	: editQuizBtnDisabled
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
						: deleteQuiz(status.toLowerCase());
				}}
				text={questionType === 'quiz' ? 'Quiz' : 'Poll'}
				wrapperRef={dialogWrapper}
				stop={stopStatus ? true : false}
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
