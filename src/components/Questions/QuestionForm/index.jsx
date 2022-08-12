/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import LoadingOverlay from 'react-loading-overlay';
import Close from '@material-ui/icons/Close';
import { useDropzone } from 'react-dropzone';
import Slide from '@mui/material/Slide';
import PrimaryLoader from '../../PrimaryLoader';
import { TextField } from '@material-ui/core';
import DragAndDropField from '../../DragAndDropField';
import { makeid } from '../../../utils/helper';
import checkFileSize from '../../../utils/validateFileSize';
import Labels from '../../Labels';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Typography from '@mui/material/Typography';
import { useStyles as globalUseStyles } from '../../../styles/global.style';
import { ReactComponent as Union } from '../../../assets/drag.svg';
import { ReactComponent as Deletes } from '../../../assets/Delete.svg';
import { useStyles } from '../UploadEditQuestion/UploadOrEditQuiz.style';
import { Draggable } from 'react-beautiful-dnd';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { ReactComponent as NewsAddIcon } from '../../../assets/newsAddIcon.svg';
import { ReactComponent as DeleteBin } from '../../../assets/DeleteBin.svg';
import {
	Accordion,
	Box,
	AccordionSummary,
	AccordionDetails,
	InputAdornment
} from '@mui/material';

const QuestionForm = ({
	item,
	key,
	index,
	type,
	initialData,
	sendDataToParent,
	handleDeleteMedia,
	handleDeleteQuestionSlide,
	setPreviewBool = false, //to be set
	setPreviewFile = false, //to be set
	isEdit
}) => {
	//dummy
	var editPoll = false; // need to remove
	var editQuiz = false; //need to remove
	console.log(type, 'type');
	const [fileRejectionError, setFileRejectionError] = useState('');
	const [expanded, setExpanded] = useState(true);
	const [quizLabels, setQuizLabels] = useState([]);
	const [extraLabel, setExtraLabel] = useState('');
	const [fileWidth, setFileWidth] = useState(0);
	const [fileHeight, setFileHeight] = useState(0);
	const [isError, setIsError] = useState({});
	const [form, setForm] = useState({
		uploadedFiles: [],
		dropbox_url: '',
		question: '',
		answers: [
			{ answer: '', type: 'right_answer', position: 0 },
			{ answer: '', type: 'wrong_answer', position: 1 }
		],
		labels: [],
		end_date: null
	});
	console.log('FORM', form);
	const classes = useStyles();
	const globalClasses = globalUseStyles();
	const imgRef = useRef(null);
	const loadingRef = useRef(null);

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
					type: file.type === 'image'
				};
			});
			//setUploadedFiles([...uploadedFiles, ...newFiles]);
			setForm((prev) => {
				return { ...prev, uploadedFiles: [...form.uploadedFiles, ...newFiles] };
			});
		}
	}, [acceptedFiles]);

	const getFileType = (type) => {
		if (type) {
			let _type = type.split('/');
			return _type && _type[1];
		}
	};

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
	// useEffect(() => {
	// 	if (labels.length) {
	// 		setQuizLabels([...labels]);
	// 	}
	// }, [labels]);

	const handleNewAnswer = () => {
		setForm((prev) => {
			return {
				...prev,
				answers: [...form.answers, { answer: '' }]
			};
		});
	};

	const handleAnswerDelete = (index) => {
		let dataCopy = [...form.answers];
		if (index > 1) {
			setForm((prev) => {
				return {
					...prev,
					answers: dataCopy.filter((val) => {
						return val.position !== index;
					})
				};
			});
		}
	};

	const handleAnswerChange = (event, index) => {
		const formCopy = { ...form };
		formCopy.answers[index] = {
			answer: event.target.value,
			position: index,
			type:
				type === 'quiz' && index === 0
					? 'right_answer'
					: type === 'quiz' && index > 0
					? 'wrong_answer'
					: 'poll'
		};
		setForm(formCopy);
		let answers = { answers: formCopy.answers };
		// sendDataToParent(answers);
	};
	return (
		<div>
			<Draggable draggableId={`draggable-${index}`} index={index} key={key}>
				{(provided) => (
					<div
						ref={provided.innerRef}
						{...provided.draggableProps}
						style={{
							...provided.draggableProps.style
						}}
					>
						<div className={globalClasses.accordionRoot}>
							<Accordion expanded={expanded} style={{ marginTop: '20px' }}>
								<AccordionSummary className={classes.accordionSummary}>
									<div className={classes.leftDiv}>
										<div className={classes.grabIconDiv}>
											<span {...provided.dragHandleProps}>
												<Union
													style={{ cursor: 'grab' }}
													className={classes.grabIcon}
												/>
											</span>
										</div>
										<Typography
											className={classes.heading}
											style={{ textTransform: 'capitalize' }}
										>
											{type} {index + 1}
										</Typography>
									</div>

									<Box className={classes.rightDiv}>
										<div className={classes.deleteIconDiv}>
											<Deletes
												className={classes.deleteIcon}
												onClick={() => {
													handleDeleteQuestionSlide(item.sort_order);
												}}
											/>
										</div>
										<div className={classes.deleteIconDiv}>
											{expanded ? (
												<ExpandLessIcon onClick={() => setExpanded(false)} />
											) : (
												<ExpandMoreIcon onClick={() => setExpanded(true)} />
											)}
										</div>
									</Box>
								</AccordionSummary>

								<AccordionDetails>
									<LoadingOverlay active={false} spinner={<PrimaryLoader />}>
										<Slide in={true} direction='up' {...{ timeout: 400 }}>
											<div
												ref={loadingRef}
												className={`${
													// previewFile != null
													// 	? classes.previewContentWrapper
													// 	:
													classes.contentWrapper
												}`}
											>
												{/* {questionEditStatus === 'loading' ? <PrimaryLoader /> : <></>} */}
												<div
													className={globalClasses.contentWrapperNoPreview}
													//style={{ width: previewFile != null ? '60%' : 'auto' }}
												>
													<div>
														<DragAndDropField
															uploadedFiles={form?.uploadedFiles}
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

														{/* {!form?.uploadedFiles.length ? ( */}
														<section
															className={globalClasses.dropZoneContainer}
															style={{
																borderColor: isError.uploadedFiles
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
														{/* ) : (
															''
														)} */}

														<p className={globalClasses.fileRejectionError}>
															{fileRejectionError}
														</p>

														<div className={globalClasses.dropBoxUrlContainer}>
															<h6>DROPBOX URL</h6>
															<TextField
																value={form.dropbox_url}
																onChange={(e) =>
																	setForm((prev) => {
																		return {
																			...prev,
																			dropbox_url: e.target.value
																		};
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
																		borderRadius: form.dropbox_url
																			? '16px'
																			: '40px'
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
																			form.question?.length >= 46 &&
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
																disabled={isEdit && status !== 'draft'}
																value={form.question}
																onChange={(e) => {
																	setForm((prev) => {
																		return {
																			...prev,
																			question: e.target.value
																		};
																	});
																}}
																placeholder={'Please write your question here'}
																className={classes.textField}
																InputProps={{
																	disableUnderline: true,
																	className: `${classes.textFieldInput}  ${
																		isEdit &&
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

														{/* <div className={classes.titleContainer}>
															<div className={globalClasses.characterCount}>
																<h6
																	className={
																		isError.ans1
																			? globalClasses.errorState
																			: globalClasses.noErrorState
																	}
																>
																	{type === 'quiz'
																		? 'RIGHT ANSWER'
																		: 'ANSWER 1'}
																</h6>
																<h6
																	style={{
																		color:
																			form.answer1?.length >= 22 &&
																			form.answer1?.length <= 28
																				? 'pink'
																				: form.answer1?.length === 29
																				? 'red'
																				: 'white'
																	}}
																>
																	{form.answer1?.length}/29
																</h6>
															</div>
															<TextField
																disabled={isEdit && status !== 'draft'}
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
																		isEdit &&
																		status !== 'draft' &&
																		classes.disableTextField
																	}`
																}}
																multiline
																maxRows={1}
																inputProps={{ maxLength: 29 }}
															/>
														</div> */}

														{/* <p className={globalClasses.mediaError}>
															{isError.ans1
																? type === 'quiz'
																	? 'You need to provide right answer in order to post'
																	: 'You need to provide first answer in order to post'
																: ''}
														</p> */}
														{form?.answers.length > 0 &&
															form?.answers.map((item, index) => {
																console.log('ITEM ANSWER', item);
																return (
																	<div
																		className={classes.titleContainer}
																		item={item}
																		index={index}
																		key={item.sort_order}
																	>
																		<div
																			className={globalClasses.characterCount}
																		>
																			<h6
																				className={
																					isError.ans2
																						? globalClasses.errorState
																						: globalClasses.noErrorState
																				}
																			>
																				{type === 'quiz' && index === 0
																					? 'RIGHT ANSWER'
																					: index > 0
																					? 'WRONG ANSWER ' + index
																					: 'ANSWER 2'}
																			</h6>
																			<h6
																				style={{
																					color:
																						form.answers[index]?.answer
																							.length >= 22 &&
																						form.answers[index]?.answer
																							.length <= 28
																							? 'pink'
																							: form.answers[index]?.answer
																									.length === 29
																							? 'red'
																							: 'white'
																				}}
																			>
																				{form.answers[index]?.answer.length}/29
																			</h6>
																		</div>
																		<TextField
																			disabled={isEdit && status !== 'draft'}
																			value={form.answers[index]?.answer}
																			onChange={(e) => {
																				handleAnswerChange(e, index);
																			}}
																			placeholder={
																				'Please write your answer here'
																			}
																			className={classes.textField}
																			InputProps={{
																				disableUnderline: true,
																				className: `${
																					classes.textFieldInput
																				}  ${
																					isEdit &&
																					status !== 'draft' &&
																					classes.disableTextField
																				}`,
																				startAdornment: (
																					<InputAdornment position='end'>
																						{index < 2 ? (
																							<> </>
																						) : (
																							<DeleteBin
																								style={{ marginTop: '20px' }}
																								onClick={() => {
																									handleAnswerDelete(index);
																								}}
																							/>
																						)}
																					</InputAdornment>
																				)
																			}}
																			multiline
																			maxRows={1}
																			inputProps={{ maxLength: 29 }}
																		/>
																	</div>
																);
															})}

														<div
															className={classes.addNewAnswer}
															onClick={() => handleNewAnswer()}
															style={{
																pointerEvents:
																	form?.answers.length < 5 ? 'auto' : 'none',
																cursor: 'pointer'
															}}
														>
															<NewsAddIcon />
															<h6>ADD ANSWER</h6>
														</div>

														{/* <p className={globalClasses.mediaError}>
															{isError.ans2
																? type === 'quiz'
																	? 'You need to provide wrong answer in order to post'
																	: 'You need to provide second answer in order to post'
																: ''}
														</p> */}

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
																isEdit={isEdit}
																//	setDisableDropdown={setDisableDropdown}
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
																setExtraLabel={setExtraLabel}
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

														<p className={globalClasses.mediaError}>
															{isError.endDate
																? 'You need to select a date in order to post'
																: ''}
														</p>
													</div>

													<p className={globalClasses.mediaError}>
														{isError.draftError
															? 'Something needs to be changed to save a draft'
															: ''}
													</p>
												</div>
												{/* {previewFile != null && (
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
		)} */}
											</div>
										</Slide>
									</LoadingOverlay>
								</AccordionDetails>
							</Accordion>
						</div>
					</div>
				)}
			</Draggable>
		</div>
	);
};

QuestionForm.propTypes = {
	item: PropTypes.number,
	key: PropTypes.number,
	index: PropTypes.number,
	type: PropTypes.string,
	initialData: PropTypes.object,
	sendDataToParent: PropTypes.func.isRequired,
	handleDeleteMedia: PropTypes.func,
	handleDeleteQuestionSlide: PropTypes.func,
	setPreviewBool: PropTypes.func.isRequired,
	setPreviewFile: PropTypes.func.isRequired
};

export default QuestionForm;
