/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// import classes from './_ArticleQuestionUpload.module.scss';
import { useDropzone } from 'react-dropzone';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { makeid } from '../../../utils/helper';
import { TextField } from '@material-ui/core';
import DragAndDropField from '../../DragAndDropField';
import Labels from '../../Labels';

import checkFileSize from '../../../utils/validateFileSize';
import { useSelector } from 'react-redux';

// import { getLocalStorageDetails } from '../../../utils';
// import axios from 'axios';
import { useRef } from 'react';
import Slide from '@mui/material/Slide';
import validateForm from '../../../utils/validateForm';
import { useStyles as globalUseStyles } from '../../../styles/global.style';
import { useStyles } from './ArticleQuestionUpload.style';
import uploadFileToServer from '../../../utils/uploadFileToServer';
import SecondaryLoader from '../../SecondaryLoader';

const ArticleQuestionUpload = ({
	heading1,
	open,
	// editQuiz,
	// editPoll,
	setDisableDropdown,
	page,
	status,
	type,
	item,
	key,
	index,
	sendDataToParent,
	handleDeleteData,
	setIsOpen,
	initialData,
	isEdit
	// WidthHeightCallback,
}) => {
	const [fileRejectionError, setFileRejectionError] = useState('');
	const [extraLabel, setExtraLabel] = useState('');
	const [fileWidth, setFileWidth] = useState(0);
	const [fileHeight, setFileHeight] = useState(0);
	const [isError, setIsError] = useState({});
	const [loading, setLoading] = useState(false);
	const [ans1Id, setAns1Id] = useState('');
	const [ans2Id, setAns2Id] = useState('');

	const [form, setForm] = useState(
		initialData
			? {
					...initialData,
					uploadedFiles: initialData?.uploadedFiles
						? initialData?.uploadedFiles
						: [],
					answers: [
						{
							...(initialData?.answers?.length > 0 &&
							initialData?.answers[0]?.answer !== ''
								? initialData.answers[0]
								: {})
						},
						{
							...(initialData?.answers?.length > 0 &&
							initialData?.answers[1]?.answer !== ''
								? initialData.answers[1]
								: {})
						}
					]
			  }
			: {
					uploadedFiles: [],
					dropbox_url: '',
					question: '',
					answers: [],
					labels: [],
					question_type: type
			  }
	);
	const imgRef = useRef(null);

	// const dispatch = useDispatch();
	const globalClasses = globalUseStyles();
	const classes = useStyles();

	useEffect(() => {
		validateForm(form);
	}, [form]);

	useEffect(() => {
		if (isEdit && status === 'draft' && item?.data?.answers) {
			setAns1Id(item?.data?.answers[0]?.id || undefined);
			setAns2Id(item?.data?.answers[1]?.id || undefined);
		}
	}, [isEdit]);

	useEffect(() => {
		if (!initialData?.question_id) {
			sendDataToParent({
				question_type: type === 'quiz' ? 'quiz' : 'poll'
			});
		}
	}, []);
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

	const uploadedFile = async (newFiles) => {
		return await uploadFileToServer(newFiles, 'articleLibrary');
	};

	useEffect(() => {
		if (acceptedFiles?.length) {
			setLoading(true);
			let newFiles = acceptedFiles.map((file) => {
				let id = makeid(10);
				return {
					id: id,
					file_name: file.name,
					media_url: URL.createObjectURL(file),
					fileExtension: `.${getFileType(file.type)}`,
					mime_type: file.type,
					file: file,
					type: 'image',
					width: fileWidth,
					height: fileHeight
				};
			});
			uploadedFile(newFiles[0], 'articleLibrary').then((res) => {
				setForm((prev) => {
					return {
						...prev,
						uploadedFiles: [
							{ image: res.media_url, file_name: res.file_name, ...newFiles[0] }
						]
					};
				});
				sendDataToParent({
					uploadedFiles: [
						{ image: res.media_url, file_name: res.file_name, ...newFiles[0] }
					]
				});
				setLoading(false);
			});

			// sendDataToParent({ uploadedFiles: [...newFiles] });
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
		!isEdit ? resetState() : '';
	}, [open]);

	const resetState = () => {
		setFileRejectionError('');
		setExtraLabel('');
		setDisableDropdown(true);
		setIsError({});
	};

	console.log(form, 'ID');

	const handleAnswerChange = (event, index) => {
		if (initialData?.question_id) {
			const formCopy = { ...form };

			formCopy.answers[index] = {
				...formCopy.answers[index],
				answer: event.target.value,
				position: index,
				type:
					type === 'quiz' && index === 0
						? 'right_answer'
						: type === 'quiz' && index === 1
						? 'wrong_answer'
						: 'poll'
				// id:
				// 	status === 'draft' && index === 0
				// 		? ans1Id
				// 		: status === 'draft' && index === 1
				// 		? ans2Id
				// 		: undefined
			};
			setForm(formCopy);
			let answers = { answers: formCopy.answers };
			sendDataToParent(answers);
		} else {
			console.log('oooo');
			const formCopy = { ...form };
			formCopy.answers[index] = {
				answer: event.target.value,
				position: index,
				type:
					type === 'quiz' && index === 0
						? 'right_answer'
						: type === 'quiz' && index === 1
						? 'wrong_answer'
						: 'poll'
			};
			setForm(formCopy);
			let answers = { answers: formCopy.answers };
			sendDataToParent(answers);
		}
	};

	return (
		<>
			<Slide in={true} direction='up' {...{ timeout: 400 }}>
				<div
					className={classes.contentWrapper}
					// style={{ width: previewFile != null ? '60%' : 'auto' }}
				>
					<div>
						<h5 className={classes.QuizQuestion}>{heading1}</h5>
						<DragAndDropField
							uploadedFiles={
								initialData ? initialData?.uploadedFiles : form?.uploadedFiles
							}
							quizPollStatus={status}
							handleDeleteFile={(id) => {
								setForm((prev) => {
									return {
										...prev,
										uploadedFiles: form.uploadedFiles.filter(
											(file) => file.id !== id
										)
									};
								});
								handleDeleteData(item.data?.uploadedFiles);
							}}
							isArticle
							isArticleNew
							isEdit={isEdit}
							imgEl={imgRef}
							imageOnload={() => {
								setFileWidth(imgRef.current.naturalWidth);
								setFileHeight(imgRef.current.naturalHeight);
							}}
						/>

						{initialData?.uploadedFiles ? (
							''
						) : form.uploadedFiles.length === 0 ? (
							<section
								className={globalClasses.dropZoneContainer}
								style={{
									borderColor: isError.uploadedFiles ? '#ff355a' : 'yellow'
								}}
							>
								<div {...getRootProps({ className: globalClasses.dropzone })}>
									<input {...getInputProps()} />
									{loading ? (
										<SecondaryLoader loading={true} />
									) : (
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
									)}

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
								value={
									initialData ? initialData?.dropbox_url : form.dropbox_url
								}
								onChange={(e) => {
									setForm((prev) => {
										return { ...prev, dropbox_url: e.target.value };
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
									className: classes.textFieldInput,
									style: {
										borderRadius: form.dropboxUrl ? '16px' : '40px'
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
											form.question?.length >= 22 && form.question?.length <= 28
												? 'pink'
												: form.question?.length === 29
												? 'red'
												: 'white'
									}}
								>
									{form.question?.length}/29
								</h6>
							</div>

							<TextField
								// disabled={status === 'published' ? true : false}
								disabled={
									initialData?.question_id && status !== 'draft' ? true : false
								}
								value={initialData ? initialData?.question : form.question}
								onChange={(e) => {
									setForm((prev) => {
										return { ...prev, question: e.target.value };
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
										initialData?.question_id &&
										status !== 'draft' &&
										classes.disableTextField
									}`
								}}
								inputProps={{ maxLength: 29 }}
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
							<div className={globalClasses.characterCount}>
								<h6
									className={
										isError.ans1
											? globalClasses.errorState
											: globalClasses.noErrorState
									}
								>
									{type === 'quiz' ? 'RIGHT ANSWER' : 'ANSWER 1'}
								</h6>
								<h6
									style={{
										color:
											form.answers[0]?.answer?.length >= 22 &&
											form.answers[0]?.answer?.length <= 28
												? 'pink'
												: form.answers[0]?.answer?.length === 29
												? 'red'
												: 'white'
									}}
								>
									{!form.answers[0]?.answer
										? 0
										: form.answers[0]?.answer?.length}
									/29
								</h6>
							</div>
							<TextField
								disabled={
									initialData?.question_id && status !== 'draft' ? true : false
								}
								value={
									initialData?.answers
										? initialData?.answers[0]?.answer
										: form.answers[0]?.answer
								}
								onChange={(e) => {
									handleAnswerChange(e, 0);
								}}
								placeholder={'Please write your answer here'}
								className={classes.textField}
								InputProps={{
									disableUnderline: true,
									className: `${classes.textFieldInput}  ${
										initialData?.question_id &&
										status !== 'draft' &&
										classes.disableTextField
									}`
								}}
								multiline
								maxRows={1}
								inputProps={{ maxLength: 29 }}
							/>
						</div>

						<p className={globalClasses.mediaError}>
							{isError.ans1
								? type === 'quiz'
									? 'You need to provide right answer in order to post'
									: 'You need to provide first answer in order to post'
								: ''}
						</p>

						<div className={classes.titleContainer}>
							<div className={globalClasses.characterCount}>
								<h6
									className={
										isError.ans2
											? globalClasses.errorState
											: globalClasses.noErrorState
									}
								>
									{type === 'quiz' ? 'WRONG ANSWER' : 'ANSWER 2'}
								</h6>
								<h6
									style={{
										color:
											form.answers[1]?.answer?.length >= 22 &&
											form.answers[1]?.answer?.length <= 28
												? 'pink'
												: form.answers[1]?.answer?.length === 29
												? 'red'
												: 'white'
									}}
								>
									{!form.answers[1]?.answer
										? 0
										: form.answers[1]?.answer?.length}
									/29
								</h6>
							</div>
							<TextField
								disabled={
									initialData?.question_id && status !== 'draft' ? true : false
								}
								value={
									initialData?.answers
										? initialData?.answers[1]?.answer
										: form.answers[1]?.answer
								}
								onChange={(e) => {
									handleAnswerChange(e, 1);
								}}
								placeholder={'Please write your answer here'}
								className={classes.textField}
								InputProps={{
									disableUnderline: true,
									className: `${classes.textFieldInput}  ${
										initialData?.question_id &&
										status !== 'draft' &&
										classes.disableTextField
									}`
								}}
								multiline
								maxRows={1}
								inputProps={{ maxLength: 29 }}
							/>
						</div>

						<p className={globalClasses.mediaError}>
							{isError.ans2
								? type === 'quiz'
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
								isEdit={initialData?.question_id && status !== 'draft'}
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
								}} //closure
								extraLabel={extraLabel}
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
				</div>
			</Slide>
		</>
	);
};

ArticleQuestionUpload.propTypes = {
	heading1: PropTypes.string.isRequired,
	open: PropTypes.bool.isRequired,
	buttonText: PropTypes.string.isRequired,
	// editQuiz: PropTypes.bool,
	dialogWrapper: PropTypes.oneOfType([
		PropTypes.func,
		PropTypes.shape({ current: PropTypes.elementType })
	]).isRequired,
	setDisableDropdown: PropTypes.func.isRequired,
	quiz: PropTypes.bool,
	// editPoll: PropTypes.bool,
	handleClose: PropTypes.func.isRequired,
	page: PropTypes.string,
	status: PropTypes.string,
	type: PropTypes.string, //poll or quiz
	item: PropTypes.number,
	key: PropTypes.number,
	index: PropTypes.number,
	sendDataToParent: PropTypes.func.isRequired,
	initialData: PropTypes.object,
	setIsOpen: PropTypes.func,
	handleDeleteData: PropTypes.func,
	isEdit: PropTypes.bool
	// WidthHeightCallback: PropTypes.func,
	// initialData: PropTypes.object,
};

export default ArticleQuestionUpload;
