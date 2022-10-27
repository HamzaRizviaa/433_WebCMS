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
import StopModal from '../../StopModal';
import { toast } from 'react-toastify';
import { formatDate, getCalendarText2 } from '../../../data/utils';
import uploadFileToServer from '../../../data/utils/uploadFileToServer';
import { useDispatch, useSelector } from 'react-redux';
import { getQuestions } from '../../../data/features/questionsLibrary/questionsLibrarySlice';
import { getLocalStorageDetails } from '../../../data/utils';
import QuestionTabPanes from '../UploadQuestionHeader/QuestionTabPanes';
import { ReactComponent as CalenderYellow } from '../../../assets/Calender_Yellow.svg';
import { useRef } from 'react';
import { useStyles as globalUseStyles } from '../../../styles/global.style';
import { useStyles } from './UploadOrEditQuiz.style';
import validateForm from '../../../data/utils/validateForm';
import validateDraft from '../../../data/utils/validateDraft';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import QuestionDraggable from '../QuestionDraggableWrapper';
import QuestionForm from '../QuestionForm';
import LoadingOverlay from 'react-loading-overlay';
import PrimaryLoader from '../../PrimaryLoader';
import DraggableContainers from '../DraggableContainers';
import {
	checkEmptyQuestion, //empty data
	checkNewElementQuestion, // api data and question form data
	comparingFormFields, // api end date and form end date
	checkSortOrderOnEdit,
	checkEmptyQuestionDraft,
	checkNewElementQuestionDraft
} from '../../../data/utils/questionUtils';

import { compact, isEmpty } from 'lodash';
import { TextField } from '@material-ui/core';
import { useDropzone } from 'react-dropzone';
import DragAndDropField from '../../DragAndDropField';
import { makeid } from '../../../data/utils/helper';
import checkFileSize from '../../../data/utils/validateFileSize';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import FeatureWrapper from '../../FeatureWrapper';
import { useNavigate } from 'react-router-dom';
import useCommonParams from '../../../hooks/useCommonParams';

const UploadOrEditQuiz = ({
	open,
	previewRef,
	quiz,
	handleClose,
	page,
	rowStatus,
	type,
	location,
	isEdit,
	notifID,
	rowType
}) => {
	const navigate = useNavigate();
	const queryParams = useCommonParams();

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
	const [stopDeleteQuestionType, setStopDeleteQuestionType] = useState('poll');

	//summary component
	const [fileWidth, setFileWidth] = useState(0);
	const [fileHeight, setFileHeight] = useState(0);
	const [fileRejectionError, setFileRejectionError] = useState('');
	const [fileWidth2, setFileWidth2] = useState(0);
	const [fileHeight2, setFileHeight2] = useState(0);
	const [fileRejectionError2, setFileRejectionError2] = useState('');

	const [tabClickCount, setTabClickCount] = useState(0);

	const {
		features: { summaryComponentOnQuestions }
	} = useSelector((state) => state.rootReducer.remoteConfig);

	const isSummaryEnabled = summaryComponentOnQuestions?._value === 'true';

	const [form, setForm] = useState({
		end_date: null,
		...(isSummaryEnabled
			? {
					results: '', // poll = results AND quiz = positive results
					results_image: [],
					results_dropbox_url: ''
			  }
			: {})
	});
	const [status, setStatus] = useState(rowStatus);
	const dialogWrapper = useRef(null);
	const loadingRef = useRef(null);
	const imgRef = useRef(null);
	const imgRef2 = useRef(null);
	const dispatch = useDispatch();
	const classes = useStyles();
	const globalClasses = globalUseStyles();

	const { questionEditStatus, questionEdit: editQuestionData } = useSelector(
		(state) => state.rootReducer.questionsLibrary
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

	//BACKUP CODE IF RESET SLIDES FAILS

	// useEffect(() => {
	// 	if (isEdit && status !== 'draft') return;
	// 	if (
	// 		(isEdit && questionType === 'quiz' && tabClickCount !== 0) ||
	// 		(questionType === 'quiz' && !isEdit)
	// 	) {
	// 		setForm((prev) => {
	// 			return {
	// 				...prev,
	// 				...{
	// 					negative_results: '',
	// 					negative_results_image: [],
	// 					negative_results_dropbox_url: ''
	// 				}
	// 			};
	// 		});
	// 	} else if (
	// 		(isEdit && questionType === 'poll' && tabClickCount !== 0) ||
	// 		(questionType === 'poll' && !isEdit)
	// 	) {
	// 		setForm({
	// 			end_date: null,
	// 			results: '', // poll = results AND quiz = positive results
	// 			results_image: [],
	// 			results_dropbox_url: ''
	// 		});
	// 	}
	// }, [questionType]);

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

	const getFileType = (type) => {
		if (type) {
			let _type = type.split('/');
			return _type && _type[1];
		}
	};

	const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
		useDropzone({
			accept: 'image/jpeg, image/png',
			maxFiles: 1,
			validator: checkFileSize
		});

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
					type: file.type === 'image',
					width: fileWidth,
					height: fileHeight
				};
			});

			setForm((prev) => {
				return {
					...prev,
					results_image: [...newFiles]
				};
			});
		}
	}, [acceptedFiles, fileHeight, fileWidth]);

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

	const handleDeleteFile = (id) => {
		setForm((prev) => {
			return {
				...prev,
				results_image: form.results_image?.filter((file) => file.id !== id)
			};
		});
	};

	const {
		acceptedFiles: acceptedFiles2,
		fileRejections: fileRejections2,
		getRootProps: getRootProps2,
		getInputProps: getInputProps2
	} = useDropzone({
		accept: 'image/jpeg, image/png',
		maxFiles: 1,
		validator: checkFileSize
	});

	useEffect(() => {
		if (acceptedFiles2?.length) {
			setIsError({});

			let newFiles = acceptedFiles2.map((file) => {
				let id = makeid(10);
				return {
					id: id,
					file_name: file.name,
					media_url: URL.createObjectURL(file),
					fileExtension: `.${getFileType(file.type)}`,
					mime_type: file.type,
					file: file,
					type: file.type === 'image',
					width: fileWidth,
					height: fileHeight
				};
			});

			setForm((prev) => {
				return {
					...prev,
					negative_results_image: [...newFiles]
				};
			});
		}
	}, [acceptedFiles2, fileHeight2, fileWidth2]);

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

	const handleDeleteFile2 = (id) => {
		setForm((prev) => {
			return {
				...prev,
				negative_results_image: form.negative_results_image?.filter(
					(file) => file.id !== id
				)
			};
		});
	};

	useEffect(() => {
		setStatus(rowStatus);
	}, [rowStatus]);

	useEffect(() => {
		if (editQuestionData) {
			let allQuestionIds = [];
			allQuestionIds =
				editQuestionData?.questions?.length > 0 &&
				editQuestionData?.questions?.map((data) => data?.id);
			setQuestionIds(allQuestionIds); //to pass to delete data
			setQuestionType(editQuestionData?.question_type);
			setStopDeleteQuestionType(editQuestionData?.question_type); //to pass in delete stop modal .
			console.log('editQuestionData', editQuestionData);
			setStatus(editQuestionData.status);
			setForm((prev) => {
				return {
					...prev,
					...(editQuestionData?.question_type === 'poll' &&
						isSummaryEnabled && {
							results_image: editQuestionData?.summary?.results_image
								? [
										{
											id: makeid(10),
											file_name: editQuestionData?.summary?.results_filename,
											media_url: `${process.env.REACT_APP_MEDIA_ENDPOINT}/${editQuestionData?.summary?.results_image}`,
											type: 'image'
										}
								  ]
								: [],
							results: editQuestionData?.summary?.results,
							results_dropbox_url:
								editQuestionData?.summary?.results_dropbox_url
						}),
					...(editQuestionData?.question_type === 'quiz' &&
						isSummaryEnabled && {
							results_image: editQuestionData?.summary?.positive_results_image
								? [
										{
											id: makeid(10),
											file_name:
												editQuestionData?.summary?.positive_results_filename,
											media_url: `${process.env.REACT_APP_MEDIA_ENDPOINT}/${editQuestionData?.summary?.positive_results_image}`,
											type: 'image'
										}
								  ]
								: [],
							results: editQuestionData?.summary?.positive_results,
							results_dropbox_url:
								editQuestionData?.summary?.positive_results_dropbox_url,
							negative_results_image: editQuestionData?.summary
								?.negative_results_image
								? [
										{
											id: makeid(10),
											file_name:
												editQuestionData?.summary?.negative_results_filename,
											media_url: `${process.env.REACT_APP_MEDIA_ENDPOINT}/${editQuestionData?.summary?.negative_results_image}`,
											type: 'image'
										}
								  ]
								: [],
							negative_results: editQuestionData?.summary?.negative_results,
							negative_results_dropbox_url:
								editQuestionData?.summary?.negative_results_dropbox_url
						}),
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
	console.log(form, 'FORM');

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
							file_name: item?.data[0]?.uploadedFiles?.length
								? item?.data[0]?.uploadedFiles[0]?.file_name
								: '',
							image: item?.data[0]?.uploadedFiles?.length
								? item?.data[0]?.uploadedFiles[0]?.media_url?.split(
										'cloudfront.net/'
								  )[1] || item?.data[0]?.uploadedFiles[0]?.media_url
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
							: { end_date: convertedDate.split('T')[0] }),
						...(questionType === 'poll' &&
							isSummaryEnabled && {
								results: form?.results,
								results_image: form?.results_image?.length
									? mediaFiles[0]?.media_url?.split('cloudfront.net/')[1] ||
									  mediaFiles[0]?.media_url
									: '',
								results_filename: form?.results_image?.length
									? mediaFiles[0]?.file_name
									: '',
								results_dropbox_url: form?.results_dropbox_url
							}),
						...(questionType === 'quiz' &&
							isSummaryEnabled && {
								positive_results: form?.results,
								positive_results_image: form?.results_image?.length
									? mediaFiles[0]?.media_url?.split('cloudfront.net/')[1] ||
									  mediaFiles[0]?.media_url
									: '',
								positive_results_filename: form?.results_image?.length
									? mediaFiles[0]?.file_name
									: '',
								positive_results_dropbox_url: form?.results_dropbox_url,
								negative_results: form?.negative_results,
								negative_results_image: form?.negative_results_image?.length
									? mediaFiles[1]?.media_url?.split('cloudfront.net/')[1] ||
									  mediaFiles[1]?.media_url
									: '',
								negative_results_filename: form?.negative_results_image?.length
									? mediaFiles[1]?.file_name
									: '',
								negative_results_dropbox_url: form?.negative_results_dropbox_url
							})
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
					},
					params: {
						api_version: isSummaryEnabled ? 1 : 2
					}
				}
			);

			if (result?.data?.status_code === 200) {
				toast.success(
					isEdit ? 'Question has been edited!' : 'Question has been created!'
				);
				setIsLoading(false);

				handleClose();

				if (isEdit && !(status === 'draft' && draft === false)) {
					dispatch(getQuestions(queryParams));
				} else if (isEmpty(queryParams)) {
					dispatch(getQuestions());
				} else {
					navigate('/question-library');
				}
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
				dispatch(getQuestions(queryParams));
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
				dispatch(getQuestions(queryParams));
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
			end_date: null,
			...(isSummaryEnabled
				? {
						results: '', // poll = results AND quiz = positive results
						results_image: [],
						results_dropbox_url: '',
						...(questionType === 'quiz' && { negative_results: '' }),
						...(questionType === 'quiz' && { negative_results_image: [] }),
						...(questionType === 'quiz' && { negative_results_dropbox_url: '' })
				  }
				: {})
		});
		setTabClickCount(0);
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
					comparingFormFields(
						editQuestionData,
						convertedDate,
						form,
						isSummaryEnabled
					)
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
			!comparingFormFields(
				editQuestionData,
				convertedDate,
				form,
				isSummaryEnabled
			)
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
					comparingFormFields(
						editQuestionData,
						convertedDate,
						form,
						isSummaryEnabled
					)
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
			!comparingFormFields(
				editQuestionData,
				convertedDate,
				form,
				isSummaryEnabled
			)
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

	const handlePostQuizPollBtn = async () => {
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
				let resultsImage;
				let negativeResultsImage;
				if (isSummaryEnabled) {
					resultsImage = form?.results_image?.map(async (file) => {
						if (file.file) {
							return await uploadFileToServer(file, 'questionLibrary');
						} else {
							return file;
						}
					});

					if (questionType === 'quiz' && form?.negative_results_image) {
						negativeResultsImage = form?.negative_results_image.map(
							async (file) => {
								if (file.file) {
									return await uploadFileToServer(file, 'questionLibrary');
								} else {
									return file;
								}
							}
						);
					}
				}

				let images = questionSlides?.map(async (item, index) => {
					let quesData;
					if (item?.data[0]?.uploadedFiles[0]?.file) {
						quesData = await uploadFileToServer(
							item?.data[0]?.uploadedFiles[0],
							'questionlibrary'
						);

						const questionCopy = [...questionSlides];
						questionCopy[index].data[0].uploadedFiles[0].media_url =
							quesData.media_url;
						setQuestionSlides(questionCopy);
						return quesData;
					} else {
						quesData = item?.data[0]?.uploadedFiles[0];
						return quesData;
					}
				});

				Promise.all([
					...(resultsImage || []),
					...(negativeResultsImage || []),
					...images
				])
					.then((mediaFiles) => {
						createQuestion(editQuestionData?.id, mediaFiles, false);
					})
					.catch(() => {
						setIsLoading(false);
					});
			} else {
				//results and positive

				let resultsImage;
				let negativeResultsImage;
				if (isSummaryEnabled) {
					resultsImage = form.results_image.map(async (file) =>
						uploadFileToServer(file, 'questionLibrary')
					);

					if (questionType === 'quiz' && form.negative_results_image) {
						negativeResultsImage = form?.negative_results_image.map(
							async (file) => uploadFileToServer(file, 'questionLibrary')
						);
					}
				}

				let images = questionSlides?.map(async (item, index) => {
					let quesData = await uploadFileToServer(
						item?.data[0]?.uploadedFiles[0],
						'questionlibrary'
					);

					const questionCopy = [...questionSlides];
					questionCopy[index].data[0].uploadedFiles[0].media_url =
						quesData.media_url;
					setQuestionSlides(questionCopy);
					return quesData;
				});

				Promise.all([
					...(resultsImage || []),
					...(negativeResultsImage || []),
					...images
				])
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
				const fileUploader = async (file) => {
					if (file.file) {
						return await uploadFileToServer(file, 'questionlibrary');
					}
					return file;
				};

				let images = await Promise.all(
					questionSlides?.map(async (item, index) => {
						let quesData = {};
						if (item?.data[0]?.uploadedFiles?.length) {
							if (item?.data[0]?.uploadedFiles[0]?.file) {
								quesData = await uploadFileToServer(
									item?.data[0]?.uploadedFiles[0],
									'questionlibrary'
								);

								const questionCopy = [...questionSlides];
								questionCopy[index].data[0].uploadedFiles[0].media_url =
									quesData?.media_url;
								setQuestionSlides(questionCopy);
							} else {
								quesData = item?.data[0]?.uploadedFiles[0];
							}
						}
						return quesData;
					})
				);

				let updatedArray = [
					(form?.results_image?.length &&
						fileUploader(form?.results_image[0])) ||
						[],
					(form?.negative_results_image?.length &&
						fileUploader(form?.negative_results_image[0])) ||
						[],
					images && images[0]
				];

				Promise.all([...updatedArray])
					.then((mediaFiles) => {
						createQuestion(editQuestionData?.id, mediaFiles, true);
					})
					.catch(() => {
						setIsLoading(false);
					});
			} else {
				const fileUploader = async (file) => {
					if (file.file) {
						return await uploadFileToServer(file, 'questionlibrary');
					}
					return file;
				};

				let images = await Promise.all(
					questionSlides?.map(async (item, index) => {
						let quesData;
						if (item?.data[0]?.uploadedFiles?.length) {
							quesData = await uploadFileToServer(
								item?.data[0]?.uploadedFiles[0],
								'questionlibrary'
							);

							const questionCopy = [...questionSlides];
							questionCopy[index].data[0].uploadedFiles[0].media_url =
								quesData?.media_url;
							setQuestionSlides(questionCopy);
						}

						return quesData;
					})
				);

				let updatedArray = [
					// form?.results_image[0] && fileUploader(form?.results_image[0]),
					(form?.results_image?.length &&
						fileUploader(form?.results_image[0])) ||
						[],
					(form?.negative_results_image?.length &&
						fileUploader(form?.negative_results_image[0])) ||
						[],
					images && images[0]
				];

				Promise.all([...updatedArray])
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
				end_date: null,
				...(isSummaryEnabled
					? {
							results: '', // poll = results AND quiz = positive results
							results_image: [],
							results_dropbox_url: '',
							...(type === 'quiz' && { negative_results: '' }),
							...(type === 'quiz' && { negative_results_image: [] }),
							...(type === 'quiz' && { negative_results_dropbox_url: '' })
					  }
					: {})
			});
		}
	};

	const setQuesType = (type) => {
		setQuestionType(type);
	};

	return (
		<>
			<Slider
				dialogRef={dialogWrapper}
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
								{location === 'article' && isEdit ? (
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
																		setTabClickCount={setTabClickCount}
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

															<FeatureWrapper name='summaryComponentOnQuestions'>
																<Typography>Summary Component</Typography>

																<div className={classes.titleContainer}>
																	<div className={globalClasses.characterCount}>
																		<h6
																			className={
																				isError.results
																					? globalClasses.errorState
																					: globalClasses.noErrorState
																			}
																		>
																			{questionType === 'poll'
																				? 'RESULTS'
																				: 'POSITIVE RESULTS'}
																		</h6>
																		<h6
																			style={{
																				color:
																					form.results?.length >= 18 &&
																					form.results?.length <= 23
																						? 'pink'
																						: form.results?.length === 24
																						? 'red'
																						: 'white'
																			}}
																		>
																			{form?.results?.length}/24
																		</h6>
																	</div>
																	<TextField
																		disabled={isEdit && status === 'CLOSED'}
																		value={form?.results}
																		onChange={(e) => {
																			setForm((prev) => {
																				return {
																					...prev,
																					results: e.target.value
																				};
																			});
																		}}
																		placeholder={`Please write your ${
																			questionType === 'poll'
																				? 'result'
																				: 'positive result'
																		} here`}
																		className={classes.textField}
																		InputProps={{
																			disableUnderline: true,
																			className: `${classes.textFieldInput}  ${
																				isEdit &&
																				status === 'CLOSED' &&
																				classes.disableTextField
																			}`
																		}}
																		inputProps={{ maxLength: 24 }}
																		multiline
																		maxRows={2}
																	/>
																</div>
																<p className={globalClasses.mediaError}>
																	{isError.results
																		? 'You need to provide a result in order to post.'
																		: ''}
																</p>

																<DragAndDropField
																	uploadedFiles={form?.results_image}
																	quizPollStatus={status}
																	handleDeleteFile={handleDeleteFile}
																	setPreviewBool={setPreviewBool}
																	setPreviewFile={setPreviewFile}
																	isArticle
																	isEdit={isEdit}
																	imgEl={imgRef}
																	imageOnload={() => {
																		setFileWidth(imgRef.current.naturalWidth);
																		setFileHeight(imgRef.current.naturalHeight);
																	}}
																/>

																{form?.results_image?.length === 0 ? (
																	<section
																		className={globalClasses.dropZoneContainer}
																		style={{
																			borderColor: isError.results_image
																				? '#ff355a'
																				: 'yellow'
																		}}
																	>
																		<div
																			{...getRootProps({
																				className: globalClasses.dropzone
																			})}
																		>
																			<input {...getInputProps()} />

																			<>
																				<AddCircleOutlineIcon
																					className={globalClasses.addFilesIcon}
																				/>
																				<p className={globalClasses.dragMsg}>
																					Click or drag file to this area to
																					upload
																				</p>
																				<p className={globalClasses.formatMsg}>
																					Supported formats are jpeg and png
																				</p>
																			</>

																			<p
																				className={
																					globalClasses.uploadMediaError
																				}
																			>
																				{isError.results_image
																					? 'You need to upload a media in order to post'
																					: ''}
																			</p>
																		</div>
																	</section>
																) : (
																	<></>
																)}

																<p className={globalClasses.fileRejectionError}>
																	{fileRejectionError}
																</p>

																<div
																	className={globalClasses.dropBoxUrlContainer}
																>
																	<h6>DROPBOX URL</h6>
																	<TextField
																		value={form.results_dropbox_url}
																		onChange={(e) => {
																			setForm((prev) => {
																				return {
																					...prev,
																					results_dropbox_url: e.target.value
																				};
																			});
																		}}
																		placeholder={
																			'Please drop the dropbox URL here'
																		}
																		className={classes.textField}
																		multiline
																		maxRows={2}
																		InputProps={{
																			disableUnderline: true,
																			className: `${classes.textFieldInput}  
																		}`,
																			style: {
																				borderRadius: form.results_dropbox_url
																					? '16px'
																					: '40px'
																			}
																		}}
																	/>
																</div>

																{questionType === 'quiz' ? (
																	<>
																		<div className={classes.titleContainer}>
																			<div
																				className={globalClasses.characterCount}
																			>
																				<h6
																					className={
																						isError.negative_results
																							? globalClasses.errorState
																							: globalClasses.noErrorState
																					}
																				>
																					NEGATIVE RESULTS
																				</h6>
																				<h6
																					style={{
																						color:
																							form?.negative_results?.length >=
																								18 &&
																							form?.negative_results?.length <=
																								23
																								? 'pink'
																								: form?.negative_results
																										?.length === 24
																								? 'red'
																								: 'white'
																					}}
																				>
																					{form?.negative_results?.length}/24
																				</h6>
																			</div>
																			<TextField
																				disabled={isEdit && status === 'CLOSED'}
																				value={form?.negative_results}
																				onChange={(e) => {
																					setForm((prev) => {
																						return {
																							...prev,
																							negative_results: e.target.value
																						};
																					});
																				}}
																				placeholder={
																					'Please write your negative result here'
																				}
																				className={classes.textField}
																				InputProps={{
																					disableUnderline: true,
																					className: `${
																						classes.textFieldInput
																					}  ${
																						isEdit &&
																						status === 'CLOSED' &&
																						classes.disableTextField
																					}`
																				}}
																				inputProps={{ maxLength: 24 }}
																				multiline
																				maxRows={2}
																			/>
																		</div>
																		<p className={globalClasses.mediaError}>
																			{isError.negative_results
																				? 'You need to provide a result in order to post.'
																				: ''}
																		</p>

																		<DragAndDropField
																			uploadedFiles={
																				form?.negative_results_image
																			}
																			quizPollStatus={status}
																			handleDeleteFile={handleDeleteFile2}
																			setPreviewBool={setPreviewBool}
																			setPreviewFile={setPreviewFile}
																			isArticle
																			isEdit={isEdit}
																			imgEl={imgRef2}
																			imageOnload={() => {
																				setFileWidth2(
																					imgRef2.current.naturalWidth
																				);
																				setFileHeight2(
																					imgRef2.current.naturalHeight
																				);
																			}}
																		/>

																		{form?.negative_results_image?.length ===
																		0 ? (
																			<section
																				className={
																					globalClasses.dropZoneContainer
																				}
																				style={{
																					borderColor: isError.results_image
																						? '#ff355a'
																						: 'yellow'
																				}}
																			>
																				<div
																					{...getRootProps2({
																						className: globalClasses.dropzone
																					})}
																				>
																					<input {...getInputProps2()} />

																					<>
																						<AddCircleOutlineIcon
																							className={
																								globalClasses.addFilesIcon
																							}
																						/>
																						<p
																							className={globalClasses.dragMsg}
																						>
																							Click or drag file to this area to
																							upload
																						</p>
																						<p
																							className={
																								globalClasses.formatMsg
																							}
																						>
																							Supported formats are jpeg and png
																						</p>
																					</>

																					<p
																						className={
																							globalClasses.uploadMediaError
																						}
																					>
																						{isError.results_image
																							? 'You need to upload a media in order to post'
																							: ''}
																					</p>
																				</div>
																			</section>
																		) : (
																			<></>
																		)}

																		<p
																			className={
																				globalClasses.fileRejectionError
																			}
																		>
																			{fileRejectionError2}
																		</p>

																		<div
																			className={
																				globalClasses.dropBoxUrlContainer
																			}
																		>
																			<h6>DROPBOX URL</h6>
																			<TextField
																				value={
																					form.negative_results_dropbox_url
																				}
																				onChange={(e) => {
																					setForm((prev) => {
																						return {
																							...prev,
																							negative_results_dropbox_url:
																								e.target.value
																						};
																					});
																				}}
																				placeholder={
																					'Please drop the dropbox URL here'
																				}
																				className={classes.textField}
																				multiline
																				maxRows={2}
																				InputProps={{
																					disableUnderline: true,
																					className: `${classes.textFieldInput}  `,
																					style: {
																						borderRadius:
																							form.negative_results_dropbox_url
																								? '16px'
																								: '40px'
																					}
																				}}
																			/>
																		</div>
																	</>
																) : (
																	<> </>
																)}
															</FeatureWrapper>
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
				open={openDeletePopup}
				toggle={toggleDeleteModal}
				deleteBtn={() => {
					deleteQuiz(status.toLowerCase());
				}}
				text={stopDeleteQuestionType}
				wrapperRef={dialogWrapper}
				stop={false}
			/>
			<StopModal
				open={openStopPopup}
				toggle={toggleStopModal}
				stopBtn={() => {
					stopQuizPoll(editQuestionData?.id);
				}}
				text={stopDeleteQuestionType}
				wrapperRef={dialogWrapper}
				stop={true}
			/>
		</>
	);
};

UploadOrEditQuiz.propTypes = {
	heading1: PropTypes.string,
	rowType: PropTypes.string,
	open: PropTypes.bool.isRequired,
	// buttonText: PropTypes.string.isRequired,
	notifID: PropTypes.string,
	setPreviewFile: PropTypes.func.isRequired,
	setDisableDropdown: PropTypes.func,
	quiz: PropTypes.bool,
	handleClose: PropTypes.func.isRequired,
	page: PropTypes.string,
	rowStatus: PropTypes.string,
	type: PropTypes.string,
	previewRef: PropTypes.oneOfType([
		PropTypes.func,
		PropTypes.shape({ current: PropTypes.elementType })
	]).isRequired
};

export default UploadOrEditQuiz;
