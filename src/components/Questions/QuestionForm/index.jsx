/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';
import { TextField } from '@material-ui/core';
import DragAndDropField from '../../DragAndDropField';
import { makeid } from '../../../utils/helper';
import checkFileSize from '../../../utils/validateFileSize';
import Labels from '../../Labels';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { useStyles as globalUseStyles } from '../../../styles/global.style';
import { useStyles } from '../UploadEditQuestion/UploadOrEditQuiz.style';
import { ReactComponent as NewsAddIcon } from '../../../assets/newsAddIcon.svg';
import { ReactComponent as DeleteBin } from '../../../assets/DeleteBin.svg';
import { InputAdornment } from '@mui/material';

const QuestionForm = ({
	item,
	key,
	index,
	status,
	type,
	initialData,
	sendDataToParent,
	handleDeleteMedia,
	setDisableDropdown,
	handleDeleteQuestionSlide,
	setPreviewBool,
	setPreviewFile,
	isEdit,
	location
}) => {
	const [fileRejectionError, setFileRejectionError] = useState('');
	const [quizLabels, setQuizLabels] = useState([]);
	const [extraLabel, setExtraLabel] = useState('');
	const [fileWidth, setFileWidth] = useState(0);
	const [fileHeight, setFileHeight] = useState(0);
	const [isError, setIsError] = useState({});
	const [form, setForm] = useState({
		uploadedFiles: initialData ? initialData?.uploadedFiles : [],
		labels: initialData?.labels?.length > 0 ? initialData?.labels : [],
		dropbox_url: initialData ? initialData?.dropbox_url : '',
		question: initialData ? initialData?.question : '',
		answers:
			initialData?.answers?.length > 0
				? initialData?.answers
				: [
						{
							answer: '',
							type: type === 'poll' ? 'poll' : 'right_answer',
							position: 0
						},
						{
							answer: '',
							type:
								location === 'article'
									? 'wrong_answer'
									: type === 'poll'
									? 'poll'
									: 'wrong_answer_1',
							position: 1
						}
				  ]
	});
	// const [form, setForm] = useState(
	// 	initialData
	// 		? {
	// 				...initialData,
	// 				uploadedFiles: initialData ? initialData?.uploadedFiles : [],
	// 				answers:
	// 					initialData?.answers?.length > 0
	// 						? initialData?.answers
	// 						: [
	// 								{
	// 									answer: '',
	// 									type: type === 'poll' ? 'poll' : 'right_answer',
	// 									position: 0
	// 								},
	// 								{
	// 									answer: '',
	// 									type:
	// 										location === 'article'
	// 											? 'wrong_answer'
	// 											: type === 'poll'
	// 											? 'poll'
	// 											: 'wrong_answer_1',
	// 									position: 1
	// 								}
	// 						  ]
	// 		  }
	// 		: {
	// 				uploadedFiles: [],
	// 				labels: [],
	// 				dropbox_url: '',
	// 				question: '',
	// 				answers: [
	// 					{
	// 						answer: '',
	// 						type: type === 'poll' ? 'poll' : 'right_answer',
	// 						position: 0
	// 					},
	// 					{
	// 						answer: '',
	// 						type:
	// 							location === 'article'
	// 								? 'wrong_answer'
	// 								: type === 'poll'
	// 								? 'poll'
	// 								: 'wrong_answer_1',
	// 						position: 1
	// 					}
	// 				]
	// 		  }
	// );

	const classes = useStyles();
	const globalClasses = globalUseStyles();
	const imgRef = useRef(null);

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
					uploadedFiles: [...newFiles]
				};
			});

			sendDataToParent({ uploadedFiles: [...newFiles] });
		}
	}, [acceptedFiles, fileHeight, fileWidth]);

	useEffect(() => {
		if (initialData?.answers?.length > 0)
			setForm((prev) => {
				return { ...prev, answers: initialData?.answers };
			});
	}, [initialData?.answers]);

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
		setForm((prev) => {
			return {
				...prev,
				uploadedFiles: form.uploadedFiles?.filter((file) => file.id !== id)
			};
		});
		handleDeleteMedia(item?.data);
	};

	const handleChangeExtraLabel = (e) => {
		setExtraLabel(e.target.value.toUpperCase());
	};

	useEffect(() => {
		setQuizLabels((labels) => {
			return labels?.filter((label) => label.id != null);
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

	const handleNewAnswer = () => {
		// if (!isEdit) {
		const length = form.answers?.length;
		setForm((prev) => {
			return {
				...prev,
				answers: [
					...form.answers,
					{ answer: '', position: length === 2 ? 3 : 4 }
				]
			};
		});
		let answers = {
			answers: [...form.answers, { answer: '', position: length === 2 ? 3 : 4 }]
		};
		sendDataToParent(answers);
		// } else {
		// 	//edit (draft)
		// 	const answers = [
		// 		...(initialData?.answers?.length === 0
		// 			? [
		// 					{
		// 						answer: '',
		// 						type: type === 'poll' ? 'poll' : 'right_answer',
		// 						position: 0
		// 					},
		// 					{
		// 						answer: '',
		// 						type:
		// 							location === 'article'
		// 								? 'wrong_answer'
		// 								: type === 'poll'
		// 								? 'poll'
		// 								: 'wrong_answer_1',
		// 						position: 1
		// 					}
		// 			  ]
		// 			: initialData?.answers?.length > 0 && initialData?.answers?.length < 4
		// 			? initialData?.answers
		// 			: form.answers)
		// 	];
		// 	console.log(answers, 'answers');
		// 	setForm((prev) => {
		// 		return {
		// 			...prev,
		// 			answers: [...answers, { answer: '' }]
		// 		};
		// 	});

		// 	sendDataToParent(answers);
		// }
	};

	const handleAnswerDelete = (index) => {
		let dataCopy = { ...form };
		setForm((prev) => {
			return {
				...prev,
				answers: dataCopy?.answers?.filter((val, ind) => {
					return ind !== index;
				})
			};
		});
		const formCopy = { ...form };
		let answers = {
			answers: formCopy?.answers?.filter((val, ind) => {
				return ind !== index;
			})
		};
		sendDataToParent(answers);
	};

	const handleAnswerChange = (event, index) => {
		if (!isEdit) {
			const formCopy = { ...form };
			formCopy.answers[index] = {
				answer: event.target.value,
				position: index,
				type:
					type === 'quiz' && index === 0
						? 'right_answer'
						: type === 'quiz' && index > 0
						? 'wrong_answer_' + index
						: 'poll'
			};
			setForm(formCopy);
			let answers = { answers: formCopy.answers };
			sendDataToParent(answers);
		} else {
			// This block of code will only be executed if the question is in draft
			// Then only the question answers will be editable
			// const isAnswersEdited = initialData && initialData.answers;

			// const answers = [
			// 	...(isAnswersEdited ? initialData?.answers : [...form.answers])
			// ];

			const answers = [
				...(initialData?.answers?.length === 0
					? [
							{
								answer: '',
								type: type === 'poll' ? 'poll' : 'right_answer',
								position: 0
							},
							{
								answer: '',
								type:
									location === 'article'
										? 'wrong_answer'
										: type === 'poll'
										? 'poll'
										: 'wrong_answer_1',
								position: 1
							}
					  ]
					: initialData?.answers?.length > 0
					? initialData?.answers
					: form.answers)
			];

			answers[index] = {
				answer: event.target.value,
				position: index,
				type:
					type === 'quiz' && index === 0
						? 'right_answer'
						: type === 'quiz' && index > 0
						? 'wrong_answer_' + index
						: 'poll'
			};

			setForm({ ...form, answers });
			sendDataToParent({ answers });
		}
	};

	return (
		<>
			<div className={globalClasses.contentWrapperNoPreview}>
				<div>
					<DragAndDropField
						uploadedFiles={
							initialData ? initialData?.uploadedFiles : form?.uploadedFiles
						}
						quizPollStatus={status}
						handleDeleteFile={handleDeleteFile}
						setPreviewBool={setPreviewBool}
						setPreviewFile={setPreviewFile}
						isArticle
						isEdit={isEdit}
						location={location}
						imgEl={imgRef}
						imageOnload={() => {
							setFileWidth(imgRef.current.naturalWidth);
							setFileHeight(imgRef.current.naturalHeight);
						}}
					/>

					{initialData?.uploadedFiles?.length === 0 ||
					initialData?.uploadedFiles === undefined ||
					(!isEdit && form?.uploadedFiles?.length === 0) ? (
						<section
							className={globalClasses.dropZoneContainer}
							style={{
								borderColor: isError.uploadedFiles ? '#ff355a' : 'yellow'
							}}
						>
							<div {...getRootProps({ className: globalClasses.dropzone })}>
								<input {...getInputProps()} />

								<>
									<AddCircleOutlineIcon
										className={globalClasses.addFilesIcon}
									/>
									<p className={globalClasses.dragMsg}>
										Click or drag file to this area to upload
									</p>
									<p className={globalClasses.formatMsg}>
										Supported formats are jpeg and png
									</p>
								</>

								<p className={globalClasses.uploadMediaError}>
									{isError.uploadedFiles
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
					<div className={globalClasses.dropBoxUrlContainer}>
						<h6>DROPBOX URL</h6>
						<TextField
							value={
								initialData
									? initialData?.data
										? initialData?.data?.dropbox_url
										: initialData?.dropbox_url
									: form.dropbox_url
							}
							disabled={location === 'article' ? true : false}
							onChange={(e) => {
								setForm((prev) => {
									return {
										...prev,
										dropbox_url: e.target.value
									};
								});

								sendDataToParent({
									dropbox_url: e.target.value
								});
							}}
							placeholder={'Please drop the dropbox URL here'}
							className={classes.textField}
							multiline
							maxRows={2}
							InputProps={{
								disableUnderline: true,
								className: `${classes.textFieldInput}  ${
									location === 'article' && classes.disableTextField
								}`,
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
										form.question?.length >= 46 && form.question?.length <= 54
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
							value={initialData ? initialData?.question : form?.question}
							onChange={(e) => {
								setForm((prev) => {
									return {
										...prev,
										question: e.target.value
									};
								});
								sendDataToParent({
									question: e.target.value
								});
							}}
							placeholder={'Please write your question here'}
							className={classes.textField}
							InputProps={{
								disableUnderline: true,
								className: `${classes.textFieldInput}  ${
									isEdit && status !== 'draft' && classes.disableTextField
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

					{form?.answers?.length > 0 &&
						form?.answers.map((item, index) => {
							return (
								<div
									className={classes.titleContainer}
									item={item}
									index={index}
									key={`answer-${index}`}
								>
									<div className={globalClasses.characterCount}>
										<h6
											className={
												isError.ans2
													? globalClasses.errorState
													: globalClasses.noErrorState
											}
										>
											{type === 'quiz' && index === 0
												? 'RIGHT ANSWER'
												: type === 'quiz' && index > 0
												? 'WRONG ANSWER ' + index
												: 'ANSWER ' + `${index + 1}`}
										</h6>
										<h6
											style={{
												color:
													form.answers[index]?.answer.length >= 22 &&
													form.answers[index]?.answer.length <= 28
														? 'pink'
														: form.answers[index]?.answer.length === 29
														? 'red'
														: 'white'
											}}
										>
											{form.answers[index]?.answer.length}/29
										</h6>
									</div>

									<TextField
										disabled={isEdit && status !== 'draft'}
										value={
											initialData?.answers?.length > 0
												? initialData?.answers[index]?.answer
												: form.answers[index]?.answer
										}
										onChange={(e) => {
											handleAnswerChange(e, index);
										}}
										placeholder={'Please write your answer here'}
										className={classes.textField}
										InputProps={{
											disableUnderline: true,
											className: `${classes.textFieldInput}  ${
												isEdit && status !== 'draft' && classes.disableTextField
											}`,
											startAdornment: (
												<InputAdornment position='end'>
													{index < 2 ? (
														<> </>
													) : status === 'ACTIVE' || status === 'CLOSED' ? (
														<DeleteBin
															style={{
																marginTop: '20px',
																opacity: 0.5,
																cursor: 'pointer'
															}}
														/>
													) : (
														<DeleteBin
															style={{ marginTop: '20px', cursor: 'pointer' }}
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
					{form?.answers.length < 4 ? (
						isEdit && status !== 'draft' ? (
							<></>
						) : (
							<div
								className={classes.addNewAnswer}
								onClick={() => handleNewAnswer()}
								style={{
									cursor: 'pointer'
								}}
							>
								<NewsAddIcon />
								<h6>ADD ANSWER</h6>
							</div>
						)
					) : (
						''
					)}
					<div className={classes.titleContainer}>
						<Labels
							titleClasses={
								isError.selectedLabels
									? globalClasses.errorState
									: globalClasses.noErrorState
							}
							isEdit={isEdit}
							setDisableDropdown={setDisableDropdown}
							selectedLabels={
								initialData?.labels ? initialData?.labels : form.labels
							}
							setSelectedLabels={(newVal) => {
								setForm((prev) => {
									return { ...prev, labels: [...newVal] };
								});
								sendDataToParent({
									labels: [...newVal]
								});
							}}
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
				</div>

				<p className={globalClasses.mediaError}>
					{isError.draftError
						? 'Something needs to be changed to save a draft'
						: ''}
				</p>
			</div>
		</>
	);
};

QuestionForm.propTypes = {
	item: PropTypes.number,
	key: PropTypes.number,
	index: PropTypes.number,
	type: PropTypes.string,
	status: PropTypes.string,
	location: PropTypes.string,
	isEdit: PropTypes.bool,
	initialData: PropTypes.object,
	sendDataToParent: PropTypes.func,
	handleDeleteMedia: PropTypes.func,
	handleDeleteQuestionSlide: PropTypes.func,
	setPreviewBool: PropTypes.func,
	setPreviewFile: PropTypes.func,
	setDisableDropdown: PropTypes.func
};

export default QuestionForm;
