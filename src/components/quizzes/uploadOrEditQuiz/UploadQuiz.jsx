/* eslint-disable no-unused-vars */
/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import React, { forwardRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classes from './_uploadOrEditQuiz.module.scss';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useDropzone } from 'react-dropzone';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { makeid } from '../../../utils/helper';
import Close from '@material-ui/icons/Close';
import { TextField } from '@material-ui/core';
import { Autocomplete, Paper, Popper } from '@mui/material';
import Button from '../../button';
import ClearIcon from '@material-ui/icons/Clear';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../../../pages/PostLibrary/_calender.scss';
import { formatDate, getCalendarText2 } from '../../../utils';
import { useSelector } from 'react-redux';

import { ReactComponent as EyeIcon } from '../../../assets/Eye.svg';
import { ReactComponent as Deletes } from '../../../assets/Delete.svg';
import { ReactComponent as Calendar } from '../../../assets/Calendar.svg';

const UploadQuiz = ({ heading1, open, buttonText }) => {
	const [uploadedFiles, setUploadedFiles] = useState([]);
	const [fileRejectionError, setFileRejectionError] = useState('');
	const [uploadMediaError, setUploadMediaError] = useState('');
	const [dropZoneBorder, setDropZoneBorder] = useState('#ffff00');
	const [previewFile, setPreviewFile] = useState(null);
	//const [previewBool, setPreviewBool] = useState(false);
	const [question, setQuestion] = useState('');
	const [ans1, setAns1] = useState('');
	const [ans2, setAns2] = useState('');
	const [selectedLabels, setSelectedLabels] = useState([]);
	const [labelColor, setLabelColor] = useState('#ffffff');
	const [labelError, setLabelError] = useState('');
	const [quizLabels, setQuizLabels] = useState([]);
	const [extraLabel, setExtraLabel] = useState('');
	const [endDate, setEndDate] = useState(null);

	const labels = useSelector((state) => state.mediaLibraryOriginal.labels);

	useEffect(() => {
		if (labels.length) {
			setQuizLabels([...labels]);
		}
	}, [labels]);
	console.log(quizLabels);

	const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => {
		const startDate = formatDate(endDate);
		return (
			<div
				className={classes.customDateInput}
				onClick={onClick}
				ref={ref}
				//style={{ borderColor: noResultCalendarBorder }}
			>
				{getCalendarText2(startDate)}
				<span
					style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
				>
					<Calendar
						onClick={(e) => {
							e.preventDefault();
							e.stopPropagation();
						}}
					/>
				</span>
			</div>
		);
	});

	const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
		useDropzone({
			accept: 'image/jpeg, image/png',
			maxFiles: 1
		});

	const getFileType = (type) => {
		if (type) {
			let _type = type.split('/');
			return _type && _type[1];
		}
	};

	//const labels = ['kaka', 'ricardo', 'lala', 'nasri', 'nani'];

	useEffect(() => {
		if (acceptedFiles?.length) {
			setUploadMediaError('');
			setDropZoneBorder('#ffff00');
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
			setFileRejectionError(
				'The uploaded file format is not matching OR max files exceeded'
			);
			setTimeout(() => {
				setFileRejectionError('');
			}, [5000]);
		}
	}, [fileRejections]);

	useEffect(() => {
		if (!open) {
			resetState();
		}
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

	// const handlePreviewEscape = () => {
	// 	//setPreviewBool(false);
	// 	setPreviewFile(null);
	// };

	const handleChangeExtraLabel = (e) => {
		setExtraLabel(e.target.value.toUpperCase());
	};

	const resetState = () => {
		setUploadedFiles([]);
		setFileRejectionError('');
		setUploadMediaError('');
		setDropZoneBorder('#ffff00');
		setPreviewFile(null);
		//setPreviewBool(false);
		setQuestion('');
		setAns1('');
		setAns2('');
		setSelectedLabels([]);
		setExtraLabel('');
	};

	const validatePostBtn = () => {
		if (uploadedFiles.length < 1) {
			setDropZoneBorder('#ff355a');
			setUploadMediaError('You need to upload a media in order to post');
			setTimeout(() => {
				setDropZoneBorder('#ffff00');
				setUploadMediaError('');
			}, [5000]);
		}
		if (selectedLabels.length < 10) {
			setLabelColor('#ff355a');
			setLabelError(
				`You need to add ${
					10 - selectedLabels.length
				} more labels in order to upload media`
			);
			setTimeout(() => {
				setLabelColor('#ffffff');
				setLabelError('');
			}, [5000]);
		}
	};

	const addQuizBtnDisabled =
		!uploadedFiles.length || selectedLabels.length < 10;
	console.log(addQuizBtnDisabled);

	return (
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
					<h5>{heading1}</h5>
					<DragDropContext>
						<Droppable droppableId='droppable-1'>
							{(provided) => (
								<div
									{...provided.droppableProps}
									ref={provided.innerRef}
									className={classes.uploadedFilesContainer}
								>
									{uploadedFiles.map((file, index) => {
										return (
											<div
												key={index}
												className={classes.filePreview}
												ref={provided.innerRef}
											>
												<div className={classes.filePreviewLeft}>
													<img
														src={file.img}
														className={classes.fileThumbnail}
													/>
													<p className={classes.fileName}>{file.fileName}</p>
												</div>

												<div className={classes.filePreviewRight}>
													<EyeIcon
														className={classes.filePreviewIcons}
														onClick={() => {
															//setPreviewBool(true);
															setPreviewFile(file);
														}}
													/>
													<Deletes
														className={classes.filePreviewIcons}
														onClick={() => {
															handleDeleteFile(file.id);
															//setPreviewBool(false);
															setPreviewFile(null);
														}}
													/>
												</div>
											</div>
										);
									})}
									{provided.placeholder}
								</div>
							)}
						</Droppable>
					</DragDropContext>
					{!uploadedFiles.length && (
						<section
							className={classes.dropZoneContainer}
							style={{
								borderColor: dropZoneBorder
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
								<p className={classes.uploadMediaError}>{uploadMediaError}</p>
							</div>
						</section>
					)}
					<p className={classes.fileRejectionError}>{fileRejectionError}</p>

					<div className={classes.titleContainer}>
						<h6>QUESTION</h6>
						<TextField
							value={question}
							onChange={(e) => {
								setQuestion(e.target.value);
							}}
							placeholder={'Please write your question here'}
							className={classes.textField}
							InputProps={{
								disableUnderline: true,
								className: classes.textFieldInput
							}}
							multiline
							maxRows={2}
						/>
					</div>

					<div className={classes.titleContainer}>
						<h6>ANSWER 1</h6>
						<TextField
							value={ans1}
							onChange={(e) => {
								setAns1(e.target.value);
							}}
							placeholder={'Please write your answer here'}
							className={classes.textField}
							InputProps={{
								disableUnderline: true,
								className: classes.textFieldInput
							}}
							multiline
							maxRows={1}
						/>
					</div>

					<div className={classes.titleContainer}>
						<h6>ANSWER 2</h6>
						<TextField
							value={ans2}
							onChange={(e) => {
								setAns2(e.target.value);
							}}
							placeholder={'Please write your answer here'}
							className={classes.textField}
							InputProps={{
								disableUnderline: true,
								className: classes.textFieldInput
							}}
							multiline
							maxRows={1}
						/>
					</div>

					<div className={classes.titleContainer}>
						<h6 style={{ color: labelColor }}>LABELS</h6>
						<Autocomplete
							//disabled={isEdit}
							style={{
								maxWidth: `530px`
							}}
							getOptionLabel={(option) => option.name}
							PaperComponent={(props) => {
								//setDisableDropdown(false);
								return (
									<Paper
										elevation={6}
										className={classes.popperAuto}
										style={{
											marginTop: '12px',
											background: 'black',
											border: '1px solid #404040',
											boxShadow: '0px 16px 40px rgba(255, 255, 255, 0.16)',
											borderRadius: '8px'
										}}
										{...props}
									/>
								);
							}}
							PopperComponent={({ style, ...props }) => (
								<Popper {...props} style={{ ...style, height: 0 }} />
							)}
							ListboxProps={{
								style: { maxHeight: 180 },
								position: 'bottom'
							}}
							// onClose={() => {
							// 	setDisableDropdown(true);
							// }}
							multiple
							filterSelectedOptions
							freeSolo={false}
							value={selectedLabels}
							onChange={(event, newValue) => {
								//setDisableDropdown(true);
								event.preventDefault();
								event.stopPropagation();
								let newLabels = newValue.filter(
									(v, i, a) =>
										a.findIndex(
											(t) => t.name.toLowerCase() === v.name.toLowerCase()
										) === i
								);
								setSelectedLabels([...newLabels]);
							}}
							popupIcon={''}
							noOptionsText={
								<div
									className={classes.liAutocompleteWithButton}
									style={{
										display: 'flex',
										justifyContent: 'space-between',
										alignItems: 'center',
										color: 'white',
										fontSize: 14
									}}
								>
									<p>{extraLabel.toUpperCase()}</p>
									<Button
										text='CREATE NEW LABEL'
										style={{
											padding: '3px 12px',
											fontWeight: 700
										}}
										onClick={() => {
											// setSelectedLabels((labels) => [
											// 	...labels,
											// 	extraLabel.toUpperCase()
											// ]);
										}}
									/>
								</div>
							}
							className={`${classes.autoComplete} `}
							id='free-solo-2-demo'
							disableClearable
							options={quizLabels}
							renderInput={(params) => (
								<TextField
									{...params}
									placeholder={selectedLabels.length ? ' ' : 'Select Labels'}
									className={classes.textFieldAuto}
									value={extraLabel}
									onChange={handleChangeExtraLabel}
									InputProps={{
										disableUnderline: true,
										className: classes.textFieldInput,
										...params.InputProps
									}}
								/>
							)}
							renderOption={(props, option) => {
								if (option.id == null) {
									return (
										<li
											{...props}
											style={{
												display: 'flex',
												alignItems: 'center',
												justifyContent: 'space-between'
											}}
											className={classes.liAutocomplete}
										>
											{option.name}
											<Button
												text='CREATE NEW LABEL'
												style={{
													padding: '3px 12px',
													fontWeight: 700
												}}
												onClick={() => {
													// setSelectedLabels((labels) => [
													// 	...labels,
													// 	extraLabel.toUpperCase()
													// ]);
												}}
											/>
										</li>
									);
								} else {
									return (
										<li {...props} className={classes.liAutocomplete}>
											{option.name}
										</li>
									);
								}
							}}
							ChipProps={{
								className: classes.tagYellow,
								size: 'small',
								deleteIcon: <ClearIcon />
							}}
							clearIcon={''}
						/>
					</div>

					<p className={classes.mediaError}>{labelError}</p>

					<div>
						<DatePicker
							customInput={<ExampleCustomInput />}
							startDate={endDate}
							minDate={new Date()}
							onChange={(update) => {
								setEndDate(update);
							}}
							placement='center'
							isClearable={true}
						/>
						{/* <p className={classes.noResultError}>{noResultCalendarError}</p> */}
					</div>
				</div>

				<div className={classes.buttonDiv}>
					<div className={classes.addQuizBtn}>
						<Button
							disabled={addQuizBtnDisabled}
							onClick={async () => {
								if (addQuizBtnDisabled) {
									validatePostBtn();
								} else {
									console.log('click');
								}
							}}
							text={buttonText}
						/>
					</div>
				</div>
			</div>
			{previewFile != null && (
				<div className={classes.previewComponent}>
					<div className={classes.previewHeader}>
						<Close
							onClick={() => {
								//setPreviewBool(false);
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
								width: `${8 * 4}rem`,
								height: `${8 * 4}rem`,
								objectFit: 'cover',
								objectPosition: 'center'
							}}
						/>
					</div>
				</div>
			)}
		</div>
	);
};

UploadQuiz.propTypes = {
	heading1: PropTypes.string.isRequired,
	open: PropTypes.bool.isRequired,
	buttonText: PropTypes.string.isRequired
};

export default UploadQuiz;
