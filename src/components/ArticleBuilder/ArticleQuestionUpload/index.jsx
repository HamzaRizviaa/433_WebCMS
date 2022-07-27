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
// import uploadFileToServer from '../../../utils/uploadFileToServer';
import { useRef } from 'react';
import Slide from '@mui/material/Slide';
import validateForm from '../../../utils/validateForm';
import { useStyles as globalUseStyles } from '../../../styles/global.style';
import { useStyles } from './ArticleQuestionUpload.style';

const ArticleQuestionUpload = ({
	heading1,
	open,
	editQuiz,
	editPoll,
	setDisableDropdown,
	quiz,
	page,
	status,
	type,
	item,
	key,
	index,
	sendDataToParent,
	setIsOpen,
	initialData
	// WidthHeightCallback,
}) => {
	console.log(page, '==== page ====');
	const [fileRejectionError, setFileRejectionError] = useState('');
	const [quizLabels, setQuizLabels] = useState([]);
	const [extraLabel, setExtraLabel] = useState('');
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

	// const dispatch = useDispatch();
	const globalClasses = globalUseStyles();
	const classes = useStyles();

	const { labels } = useSelector((state) => state.questionLibrary);

	useEffect(() => {
		if (labels.length) {
			setQuizLabels([...labels]);
		}
	}, [labels]);

	useEffect(() => {
		validateForm(form);
	}, [form]);

	// useEffect(() => {
	// 	dispatch(getQuestionLabels());
	// }, []);

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
	};

	const handleChangeExtraLabel = (e) => {
		setExtraLabel(e.target.value.toUpperCase());
	};

	const resetState = () => {
		setFileRejectionError('');
		setExtraLabel('');
		setDisableDropdown(true);
		setIsError({});
	};

	// console.log(form, 'form');
	// console.log(form.end_date, 'dft');
	// console.log(editQuestionData?.poll_end_date, 'poll');
	// console.log(convertedDate, 'cd');

	// console.log('validation  ', status, !validateForm(form), editQuizBtnDisabled);

	return (
		<>
			<Slide in={true} direction='up' {...{ timeout: 400 }}>
				<div
					className={globalClasses.contentWrapperNoPreview}
					// style={{ width: previewFile != null ? '60%' : 'auto' }}
				>
					<div>
						<h5 className={classes.QuizQuestion}>{heading1}</h5>
						<DragAndDropField
							uploadedFiles={form.uploadedFiles}
							quizPollStatus={status}
							handleDeleteFile={handleDeleteFile}
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
									{quiz || editQuiz ? 'RIGHT ANSWER' : 'ANSWER 1'}
								</h6>
								<h6
									style={{
										color:
											form.answer1?.length >= 22 && form.answer1?.length <= 28
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
								inputProps={{ maxLength: 29 }}
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
							<div className={globalClasses.characterCount}>
								<h6
									className={
										isError.ans2
											? globalClasses.errorState
											: globalClasses.noErrorState
									}
								>
									{quiz || editQuiz ? 'WRONG ANSWER' : 'ANSWER 2'}
								</h6>
								<h6
									style={{
										color:
											form.answer2?.length >= 22 && form.answer2?.length <= 28
												? 'pink'
												: form.answer2?.length === 29
												? 'red'
												: 'white'
									}}
								>
									{form.answer2?.length}/29
								</h6>
							</div>
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
								inputProps={{ maxLength: 29 }}
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
	editQuiz: PropTypes.bool,
	dialogWrapper: PropTypes.oneOfType([
		PropTypes.func,
		PropTypes.shape({ current: PropTypes.elementType })
	]).isRequired,
	setDisableDropdown: PropTypes.func.isRequired,
	quiz: PropTypes.bool,
	editPoll: PropTypes.bool,
	handleClose: PropTypes.func.isRequired,
	page: PropTypes.string,
	status: PropTypes.string,
	type: PropTypes.string, //poll or quiz
	item: PropTypes.number,
	key: PropTypes.number,
	index: PropTypes.number,
	sendDataToParent: PropTypes.func.isRequired,
	initialData: PropTypes.object,
	setIsOpen: PropTypes.func
	// WidthHeightCallback: PropTypes.func,
	// initialData: PropTypes.object,
};

export default ArticleQuestionUpload;
